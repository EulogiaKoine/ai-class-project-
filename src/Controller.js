const URL = "https://teachablemachine.withgoogle.com/models/sj3h1W_bj/";
let model, prediction, imageURL;

(async function init() {
    model = await tmImage.load(URL+"model.json", URL+"metadata.json");
    maxPrediction = model.getTotalClasses();
})()

async function predict(canvas) {
    prediction = await model.predict(canvas);
}

//---------- Model Layer ----------

class Controller {
    canvas;
    isDrawing = false;
    ctx;
    pac = null;
    x = null;
    y = null;

    static directions = ['up', 'down', 'left', 'right'];

    static mousedown = function(e){
        if(!this.isDrawing){
            const ctx = this.ctx, canvas = ctx.canvas;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            [this.isDrawing, this.x, this.y] = [true, e.offsetX, e.offsetY];
        }
    };

    static mousemove = function(e){
        if(!this.isDrawing) return;

        const ctx = this.ctx;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        [this.x, this.y] = [e.offsetX, e.offsetY];
        ctx.lineTo(this.x, this.y);
        ctx.stroke();
    };

    static mouseup = function(e){
        if(this.isDrawing){
            this.isDrawing = false;

            const cont = this;
            this.req().then(
                function(){
                    if(cont.pac){
                        cont.control(cont.decide());
                    } else {
                        cont.capture(cont.decide());
                    }
                }
            )
        }
    }

    constructor(canvas, pac){
        this.canvas = canvas;
        
        const ctx = canvas.getContext('2d');
        ctx.strokeStyle = "white";
        ctx.fillStyle = "skyblue";
        ctx.font = "200px Arial";
        this.ctx = ctx;

        this.pac = pac;
    }

    req(){
        return predict(this.canvas);
    }

    decide(){
        prediction.sort((a, b) => b.probability - a.probability)[0];

        if(prediction[0].probability > 0.7){
            return prediction[0].className;
        }

        return 'none';
    }

    capture(decision){
        const ctx = this.ctx;

        ctx.clearRect(0, 0, 300, 300);

        ctx.fillStyle = "rgba(248, 248, 255, 0.9)";
        let x, y;
        switch(decision){
            case 'up':
                decision = '↑';
                [x, y] = [100, 200];
                break;
            
            case 'down':
                decision = '↓';
                [x, y] = [100, 200];
                break;
            
            case 'left':
                decision = '←';
                [x, y] = [50, 200];
                break;
            
            case 'right':
                decision = '→';
                [x, y] = [50, 200];
                break;
            
            default:
                decision = 'X';
                [x, y] = [85, 215];
        }
        ctx.fillText(decision, x, y, 200);
    }

    control(decision){
        this.capture(decision);
        if(decision !== 'none'){
            this.pac.rotate(decision);
        }
    }

    on(){
        this.canvas.addEventListener('mousedown', Controller.mousedown.bind(this));
        this.canvas.addEventListener('mousemove', Controller.mousemove.bind(this));
        this.canvas.addEventListener('mouseup', Controller.mouseup.bind(this));
    }

    off(){
        this.canvas.removeEventListener('mousedown', Controller.mousedown.bind(this));
        this.canvas.removeEventListener('mousemove', Controller.mousemove.bind(this));
        this.canvas.removeEventListener('mouseup', Controller.mouseup.bind(this));
    }
}