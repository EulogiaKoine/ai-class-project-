//보류. 아이템 -> 팩맨 순으로 먼저 구현.

class Ghost extends Entity {
    
    //색깔(종류) 정의 및 이동 알고리즘 구현; 기존 팩맨 알고리즘은 공부가 필요한데 시간은 촉박...ㅠㅠ
    //전략 패턴도 약간이지만 차용해서 언제든지 쉬운 업데이트 및 교체 가능.
    static TYPES = {
        //빨강: 이동 가능한 방향 중 랜덤
        'red': function(x, y, w){
            const list = this.getAbleDirection();
            return list[Math.random() * list.length >> 0];
        },

        //파랑: 이동 가능한 방향 중 팩맨과의 직선거리가 가장 짧은 방향으로 이동. 두 방향이 똑같을 경우 바라보는 방향도 고려.
        'blue': function(x, y, w){
            const list = this.getAbleDirection()
            .map(v => {
                const cord = this.cord;

                switch(v){
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
                }

                return {
                    direction: v,
                    d: Math.hypot(cord[0]-x, cord[1]-y)
                };
            })
            .sort((a, b) => a.d - b.d);

            if(list[0].d === list[1].d){
                if(list[0].d === 1) return this.direction;
                else return w;
            }

            return list[0].direction;
        }
    }

    static IMAGE_PATH = 'ghost.png';

    constructor(x, y, grid, screen, type){
        if(!(type in Ghost.TYPES)){
            throw new TypeError(type+' is not a type of ghost!');
        }

        super(x, y, grid, 'ghost/'+type, screen);
        this.type = type;
        this.img = this.img.replace(/\.png$/, '.jpg');
    }

    getAbleDirection(){
        return ['up', 'down', 'left', 'right']
                .filter(v => {
                    this.rotate(v);
                    return this.canMove();
                });
    }

    move(x, y, w){
        this.rotate(Ghost.TYPES[this.type].call(this, x, y, w));
        super.move();
    }

    draw(ctx){
        const img = new Image();
        img.src = this.img.replace(/\.jpg$/, this.direction+'.jpg');
        ctx.drawImage(img, this.x, this.y, 1, 1);
    }
}