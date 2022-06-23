class Item {
    x;
    y;
    img;
    type;
    grid;

    /**
     * @param {Entity} user
     */
    static TYPES = {
        dot: function(user, screen){
            scoreboard.writeScore(scoreboard.score + SCORE.DOT);
            this.grid.remove(this);
            screen.removeItem(this);
        }
    };

    constructor(x, y, type, grid){
        if(!(type in Item.TYPES)){
            throw new TypeError('the type of item must be one of '+Object.keys(Item.TYPES).join(', '));
        }

        this.x = x;
        this.y = y;
        this.img = new Image();
        this.img.src = 'img/item/'+type+'.jpg';
        this.type = type;
        this.grid = grid;
    }

    get cord(){
        return [this.x, this.y];
    }

    use(user, screen){
        Item.TYPES[this.type].call(this, user, screen);
    }

    draw(ctx){
        ctx.drawImage(this.img, this.x, this.y, 1, 1);
    }
}