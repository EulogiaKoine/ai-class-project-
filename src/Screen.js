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
                } else if(obj instanceof Array){
                    for(let i of obj){
                        switch(i.constructor){
                            case Item:
                                this.item.push(i);
                                break;
                        }
                    }
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

    removeWall(wall){
        const list = this.wall;

        if(list.includes(wall)){
            list.splice(list.indexOf(wall), 1);
        } else {
            throw new Error("the wall doesn't exists on screen");
        }
    }

    applyEntity(entity){
        if(this.entity.includes(entity)){
            throw new Error('the entity has already applied on screen');
        }

        this.entity.push(entity);
    }

    removeEntity(entity){
        const list = this.entity;

        if(list.includes(entity)){
            list.splice(list.indexOf(entity), 1);
        } else {
            throw new Error("the entity doesn't exists on screen");
        }
    }

    applyItem(item){
        if(this.item.includes(item)){
            throw new Error('the item has already applied on screen');
        }

        this.item.push(item);
    }

    removeItem(item){
        const list = this.item;

        if(list.includes(item)){
            list.splice(list.indexOf(item), 1);
        } else {
            throw new Error("the item doesn't exists on screen");
        }
    }

    draw(){
        const ctx = this.#ctx, wall = this.wall, entity = this.entity, item = this.item;
        ctx.clearRect(0, 0, this.width, this.height);

        let i;
        for(i in wall){
            wall[i].draw(ctx);
        }
        for(i in item){
            item[i].draw(ctx);
        }
        for(i in entity){
            entity[i].draw(ctx);
        }
    }
}