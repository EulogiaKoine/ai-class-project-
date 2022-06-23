class Grid {
    constructor(layout){
        this.init(layout);
    }

    init(layout){
        if(!(layout instanceof Array) || !(layout[0] instanceof Array)){
            throw new TypeError('layout must be a array');
        }

        //...사설로, 카톡봇 시절 습관 때문에 속도 향상을 위해 반복 흐름 제어는 콜백 메서드 대신 직접 제어를 선호하게 되었습니다.
        //iterator 사용도 그다지...
        let grid = layout.map(v => v.concat())/* 복사 */, n;
        for(let x in grid){
            for(let y in grid[x]){
                n = grid[x][y];
                
                switch(n){
                    case '0':
                        grid[x][y] = [];
                        break;
                    case '1':
                        grid[x][y] = new Wall(x, y);
                        break;
                    case '2':
                        grid[x][y] = [new Item(x, y, 'dot', this)];
                        break;
                }
            }
        }
        //벽, 엔티티, 아이템 클래스가 만들어질 경우 각 ID를 통해 요소를 대체(예정)

        this.grid = grid;
    }

    pick(x, y){
        return this.grid[x][y];
    }

    has(obj){
        const block = this.grid[obj.x][obj.y];

        return (block === obj) || (block instanceof Array && block.indexOf(obj) !== -1);
    }

    set(obj){
        if(this.has(obj)){
            throw new Error(`the obj has been already exists in ${obj.x+', '+obj.y}`);
        }

        const grid = this.grid;
        let block = grid[obj.x][obj.y];

        if(block instanceof Wall){
            throw new Error("Cannot set something over the wall!");
        }

        if(block instanceof Array){
            block.push(obj);
        } else {
            grid[obj.x][obj.y] = obj;
        }
    }

    remove(obj){
        if(this.has(obj)){
            const block = this.grid[obj.x][obj.y];

            if(block instanceof Array){
                block.splice(block.indexOf(obj), 1);
            } else {
                this.grid[obj.x][obj.y] = undefined;
            }
        } else {
            throw new ReferenceError("the obj isn't exists in grid");
        }
    }

    get size(){
        return [this.grid.length, this.grid[0].length]; //[x, y] 크기
    }
}