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
        test: function(user){
            console.log('success');
        },
        dot: function(user){
            
        }
    };

    constructor(x, y, type, grid){
        if(!(type in Item.TYPES)){
            throw new TypeError('the type of item must be one of '+Object.keys(Item.TYPES).join(', '));
        }

        this.x = x;
        this.y = y;
        this.img = new Image();
        this.img.src = 'img/item/'+type+'.png';
        this.type = type;
        this.grid = grid;
    }

    get cord(){
        return [this.x, this.y];
    }

    use(){
        Item.TYPES[this.type].call(this);
    }

    draw(ctx){
        ctx.drawImage(this.img, this.x, this.y, 1, 1);
    }
}