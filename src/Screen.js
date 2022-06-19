class Screen {
    #ctx;
    width;
    height;
    wall = [];
    entity = []; //그리드 대신 객체 단위 접근을 위한 1차원 스토리지
    item = [];

    static SCALE = 20; //unit: px

    constructor(ctx){
        this.#ctx = ctx;
    }

    getCtx(){
        return this.#ctx;
    }

    init(grid){
        //캔버스 크기 조절
        let canvas = this.#ctx.canvas, size = grid.size;
        const SCALE = Screen.SCALE;
        canvas.width = (this.width = size[0]) * SCALE;
        canvas.height = (this.height = size[1]) * SCALE;
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

    applyEntity(entity){
        if(this.entity.includes(entity)){
            throw new Error('the entity has already applied on screen');
        }

        this.entity.push(entity);
    }

    draw(){
        const ctx = this.#ctx;
        ctx.clearRect(0, 0, this.width, this.height);
        for(let obj of this.wall){
            obj.draw(ctx);
        }
        for(let obj of this.entity){
            obj.draw(ctx);
        }
        for(let obj of this.item){
            obj.draw(ctx);
        }
    }
}