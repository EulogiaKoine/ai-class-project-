const URL = "https://teachablemachine.withgoogle.com/models/6vD8X7Pcu/";
let model, prediction, imageURL;

(async function init() {
    model = await tmImage.load(URL+"model.json", URL+"metadata.json");
    maxPrediction = model.getTotalClasses();
})()

async function predict(canvas) {
    imageURL = canvas.toDataURL();
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
            
            if(this.pac, false){
                this.control();
            } else {
                this.req();
                setTimeout(() => this.capture(this.decide(), 1), 500);
            }
        }
    }

    constructor(canvas, pac){
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.pac = pac;
    }

    req(){
        predict(this.canvas);
        return prediction;
    }

    decide(){
        prediction.sort((a, b) => b.probability - a.probability)[0];

        if(prediction[0].probability > 0.7){
            return prediction[0].className;
        }

        return 'none';
    }

    capture(decision, time){
        const img = new Image(), ctx = this.ctx, canvas = this.canvas;
        img.src = 'img/direction/'+decision+'.png';

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        setTimeout(() => ctx.drawImage(img, 0, 0, canvas.width, canvas.height), 50);
        setTimeout(() => ctx.clearRect(0, 0, canvas.width, canvas.height), time * 1000);
    }

    control(){
        const decision = this.decide();

        this.capture(decision, 0.5);
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