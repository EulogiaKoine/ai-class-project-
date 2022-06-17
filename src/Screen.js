class Screen {
    #ctx;
    wall = [];
    entity = []; //그리드 대신 객체 단위 접근을 위한 1차원 스토리지
    item = [];

    static SCALE = 20; //unit: px

    constructor(ctx){
        this.#ctx = ctx;
    }

    get ctx(){
        return this.#ctx;
    }

    init(grid){
        //캔버스 크기 조절
        let canvas = this.#ctx.canvas, size = grid.getSize(), SCALE = Screen.SCALE;
        canvas.width = size[0] * SCALE;
        canvas.height = size[1] * SCALE;
        this.#ctx.scale(SCALE, SCALE);

        //객체 등록
        let obj;
        for(let x of grid.grid){
            for(let obj of x){
                if(obj instanceof Wall){
                    this.wall.push(obj);
                }
            }
        }
    }

    applyWall(wall){
        if(this.wall.includes(wall)){
            throw new Error('the wall has already applied on screen');
        }

        this.wall.push(wall);
    }

    draw(){
        this.wall.forEach(v => v.draw(this.#ctx));
        this.entity.forEach(v => v.draw(this.#ctx));
        this.item.forEach(v => v.draw(this.#ctx));
    }
}