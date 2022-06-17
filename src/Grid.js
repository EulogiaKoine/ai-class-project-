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
                
                if(n === '1'){
                    grid[x][y] = new Wall(x, y);
                }
            }
        }
        //벽, 엔티티, 아이템 클래스가 만들어질 경우 각 ID를 통해 요소를 대체(예정)

        this.grid = grid;
    }

    pick(x, y){
        return this.grid[x][y];
    }

    getSize(){
        return [this.grid.length, this.grid[0].length]; //[x, y] 크기
    }
}