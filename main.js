const grid = new Grid(LAYOUT);
const screen = new Screen(document.getElementById('screen').getContext('2d'));
screen.init(grid);

const music = document.getElementById('music');
music.volume = 0.2;

const record = new Record(window.localStorage);
record.init(document.getElementById('record-container'));
record.write();

const scoreboard = new ScoreBoard(document.getElementById('stage-box'), document.getElementById('score-box'));
scoreboard.write();

const game = new Game(screen, grid, scoreboard, record);
document.getElementById('play').onclick = () => game.play();

// function handleKeydown(e){
//     if(e.keyCode < 37 || e.keyCode > 40) return;

//     const pac = game.pac, ctx = screen.getCtx();
//     if(pac === null) return;

//     pac.rotate(['left', 'up', 'right', 'down'][e.keyCode - 37]);
    
//     ctx.clearRect(pac.x, pac.y, 1, 1);
//     pac.draw(ctx);
//     setTimeout(() => pac.draw(ctx), 100);
// }
// document.removeEventListener('keydown', handleKeydown);
// document.addEventListener('keydown', handleKeydown);

const cont = document.getElementById('controller').getContext('2d');
cont.fillStyle = 'white';
cont.lineWidth = 5;
const controller = new Controller(cont.canvas, game.pac);

game.controller = controller;

(function ready(canvas){
    setTimeout(() => {
        predict(canvas).then(
            function(){
                game.canPlay = true;
            },
            function(){
                ready(canvas);
            }
        );
        if(true){
            const ready = setInterval(() => {
                if(typeof prediction === 'object'){
                    game.canPlay = true;
                    // controller.on();

                    clearInterval(ready);
                }
            }, 100);
        }
    }, 2000);
})(cont.canvas);