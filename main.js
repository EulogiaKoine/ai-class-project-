const grid = new Grid(LAYOUT);
const screen = new Screen(document.getElementById('screen').getContext('2d'));
screen.init(grid);

const music = document.getElementById('music');
music.volume = 0.2;

const record = new Record(window.localStorage);
record.init(document.getElementById('record-container'));