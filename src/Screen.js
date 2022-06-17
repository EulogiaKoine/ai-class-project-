class Screen {
    #ctx;
    wall = [];
    entity = [];
    item = [];

    constructor(ctx){
        this.#ctx = ctx;
    }

    getCtx(){
        return this.#ctx;
    }

    init(grid){
        let canvas = this.#ctx.canvas, size = grid.getSize();
        canvas.width = size[0] * CANVAS_SCALE;
        canvas.height = size[1] * CANVAS_SCALE;
        this.#ctx.scale(CANVAS_SCALE, CANVAS_SCALE);
    }

    draw(){
        this.wall.forEach(v => v.draw(this.#ctx));
        this.entity.forEach(v => v.draw(this.#ctx));
        this.item.forEach(v => v.draw(this.#ctx));
    }
}