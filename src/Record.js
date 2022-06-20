class Record {
    storage;
    container;

    constructor(localStorage){
        this.storage = localStorage;
    }

    init(container){
        this.container = container;

        if(!('record' in this.storage)){
            localStorage.setItem('record', '[]');
        }
    }

    getRecord(){
        return JSON.parse(this.storage.getItem('record'));
    }

    write(){
        const record = this.getRecord(), container = this.container;

        let i = container.childNodes.length;
        while(i-- !== 0){
            container.removeChild(container.childNodes[i]);
        }

        let li;
        for(i of record){
            li = document.createElement('li');
            li.className = 'record-li';
            li.innerText = i.name + ": " + i.score;
            container.appendChild(li);
        }
    }

    setRecord(name, score){
        const record = this.getRecord();
        record.push({name: name, score: score});
        record.sort((a, b) => b.score - a.score);
        this.storage.setItem('record', JSON.stringify(record));
    }
}