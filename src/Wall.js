class Wall {
    x;
    y;
    grid;
    color;

    static COLOR = '#4169E1';

    constructor(x, y){
        this.x = x;
        this.y = y;
        this.color = Wall.COLOR;
    }

    get cord(){
        return [this.x, this.y];
    }

    draw(ctx){
        let colorBefore = ctx.fillStyle;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, 1, 1);
        ctx.fillStyle = colorBefore;
    }
}