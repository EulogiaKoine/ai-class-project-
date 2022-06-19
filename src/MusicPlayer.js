class MusicPlayer {
    audio;

    constructor(audio, "music"){
        this.audio = audio;
        this.music = ""
    }

    init(){
        let audio = this.audio;
        audio.display = 'none';

        audio.src = this.music;
    }

    play(){
        this.audio.play();
    }

    pause(){
        this.audio.pause();
    }

    
}