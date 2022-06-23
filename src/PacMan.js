class PacMan extends Entity {
    constructor(x, y, grid, screen){
        super(x, y, grid, 'pac-man', screen);
        this.direction = 'left';
    }

    move(){
        super.move();

        let item = this.grid.pick(this.x, this.y).filter(v => v !== this)
                                                .find(v => v instanceof Item);
        if(item){
            item.use(this, this.screen);
        }
    }
}