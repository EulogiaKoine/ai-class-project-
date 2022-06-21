class ScoreBoard {
    stage;
    score;
    stageBox;
    scoreBox;

    constructor(stageBox, scoreBox){
        this.stage = 1;
        this.score = 0;
        this.stageBox = stageBox;
        this.scoreBox = scoreBox;
    }

    writeStage(n){
        if(isNaN(n) || n < 1){
            throw new TypeError("stage must be a number more than or equal to 1");
        }

        this.stage = n;
        this.stageBox.innerText = n;
    }

    writeScore(n){
        if(isNaN(n) || n < 0){
            throw new TypeError("score must be a number more than or equal to 0");
        }

        this.score = n;
        this.scoreBox.innerText = n;
    }
}