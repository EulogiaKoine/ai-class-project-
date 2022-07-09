class Game {
    screen;
    loopID = null;
    grid;
    scoreboard;
    record;
    pac = null;
    canPlay = false;
    
    img = new Image();

    constructor(screen, grid, scoreboard, record, controller){
        this.screen = screen;
        this.grid = grid;
        this.scoreboard = scoreboard;
        this.record = record;
        this.img.src = 'img/gameover.png';
        this.controller = controller;
    }

    get isPlaying(){
        return this.loopID !== null;
    }

    get isStarted(){
        return this.pac !== null;
    }

    init(){
        this.pac = new PacMan(9, 15, this.grid, this.screen);
        this.screen.applyEntity(this.pac);

        const {g1, g2} = {
            g1: new Ghost(8, 9, grid, screen, 'red'),
            g2: new Ghost(14, 14, grid, screen, 'blue')
        };

        this.controller.pac = this.pac;
        [g1, g2].forEach(v => screen.applyEntity(v));
    }

    play(){
        if(this.isPlaying){
            throw new Error('이미 플레이 중!');
        }

        if(!this.canPlay){
            alert("AI를 잠에서 깨우는 중입니다...... 잠시 후 다시 시도해주세요!");
            return;
        }
        
        if(!this.isStarted){
            this.clear();
            this.init();
            setTimeout(() => this.screen.draw(), 50);
        }

        const button = document.getElementById('play');
        button.innerText = 'PAUSE';
        button.onclick = () => this.pause();

        this.controller.on();

        this.loopID = setInterval(() => this.step(), getStageDelay(this.scoreboard.stage));
    }

    pause(){
        if(!this.isPlaying){
            throw new Error('이미 정지됨!');
        }

        const button = document.getElementById('play');
        button.innerText = 'PLAY';
        button.onclick = () => this.play();

        this.controller.off();

        clearInterval(this.loopID);
        this.loopID = null;
    }

    nextStage(){
        this.pause();
        this.pac = null;
        this.scoreboard.writeStage(this.scoreboard.stage+1);

        const start = confirm('스테이지 클리어! 다음 스테이지를 바로 시작하시겠습니까?');
        if(start){
            this.clear();
            this.play();
        }
    }

    step(){
        const entity = this.screen.entity;

        const pac = this.pac;
        const ghosts = entity.filter(v => v instanceof Ghost);

        pac.move();
        for(let i in ghosts){
            ghosts[i].move(pac.x, pac.y, pac.direction);
        }

        this.screen.draw();
        setTimeout(() => {
            this.screen.draw();

            if(this.grid.pick(pac.x, pac.y).some(v => v instanceof Ghost)){
                this.over();
            }
        }, 100);

        if(!this.screen.item.some(v => v.type === 'dot')){
            this.nextStage();
        }
    }

    over(){
        if(this.isPlaying){
            this.pause();
        }

        const ctx = this.screen.getCtx();
        ctx.fillStyle = 'rgba(0, 0, 0, 0.4)'
        ctx.fillRect(0, 0, 19, 21);
        ctx.drawImage(this.img, 0, 6, 19, 9);

        document.getElementById('play').innerText = "PLAY";

        setTimeout(() => {
            const name = prompt('점수를 기록하시겠습니까?');
            if(name){
                this.record.setRecord(name, scoreboard.score);
                this.record.write();
            }

            this.reset();
        }, 100);
    }

    clear(){
        this.screen.entity = [];
        this.screen.item = [];
        this.screen.draw();

        this.screen.wall = [];

        this.grid.init(LAYOUT);
        this.screen.init(this.grid);
    }

    reset(){
        this.pac = null;
        this.clear();
        this.scoreboard.writeStage(1);
        this.scoreboard.writeScore(0);
    }
}