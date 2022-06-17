class Grid {
    constructor(layout){
        this.init(layout);
    }

    init(layout){
        if(!(layout instanceof Array) || !(layout[0] instanceof Array)){
            throw new TypeError('layout must be a array');
        }

        //벽, 엔티티, 아이템 클래스가 만들어질 경우 각 ID를 통해 요소를 대체(예정)

        this.grid = layout;
    }

    pick(x, y){
        return this.grid[x][y];
    }

    getSize(){
        return [this.grid.length, this.grid[0].length]; //[x, y] 크기
    }
}