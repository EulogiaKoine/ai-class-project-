class Entity {
    x;
    y;
    img;
    grid;
    screen;
    direction = 'up';

    static #directions = ['up', 'down', 'left', 'right'];

    constructor(x, y, grid, img, screen){
        this.x = x;
        this.y = y;
        this.screen = screen;

        this.grid = grid;
        grid.set(this);

        this.img = 'img/'+img+'/.png';
    }

    get cord(){
        return [this.x, this.y];
    }

    rotate(direct){
        if(Entity.#directions.includes(direct)){
            this.direction = direct;
        } else {
            throw new TypeError('direction must be one of ' + Entity.#directions.join(', '));
        }
    }

    canMove(){
        let cord = this.cord;

        switch(this.direction){
            case 'up':
                cord[1]--;
                break;
            case 'down':
                cord[1]++;
                break;
            case 'left':
                cord[0]--;
                break;
            case 'right':
                cord[0]++;
                break;
            default:
                throw new Error('방향이 이상한데요?');
        }
        
        return !(this.grid.pick(cord[0], cord[1]) instanceof Wall);
    }

    move(){
        if(this.canMove()){
            this.grid.remove(this);

            switch(this.direction){
                case 'up':
                    this.y--;
                    break;
                case 'down':
                    this.y++;
                    break;
                case 'left':
                    this.x--;
                    break;
                case 'right':
                    this.x++;
            }

            this.grid.set(this);
        }
    }

    draw(ctx){
        const img = new Image();
        img.src = this.img.replace(/\.png$/, this.direction+'.png');
        ctx.drawImage(img, this.x, this.y, 1, 1);
    }
}