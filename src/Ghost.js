//보류. 아이템 -> 팩맨 순으로 먼저 구현.

class Ghost extends Entity {
    
    //색깔(종류) 정의 및 이동 알고리즘 구현; 기존 팩맨 알고리즘은 공부가 필요한데 시간은 촉박...ㅠㅠ
    //전략 패턴도 약간이지만 차용해서 언제든지 쉬운 업데이트 및 교체 가능.
    static TYPES = {
        //빨강: 팩맨과의 직선에 가까운 방향으로 움직임(삼각법 사용)
        'red': function(pac){
            
        }

        //하양: 5x5 범위에서 
    }
    static IMAGE_PATH = 'ghost.png';

    constructor(x, y, grid, type){
        super(x, y, grid, );
    }

    move(){
        super.move();
    }
}