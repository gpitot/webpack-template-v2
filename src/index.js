import style from "./sass/index.scss";
import Map from './js/map';

/*
const dimensions = {
    rows : 5,
    cols : 5,
}
const parentEl = document.getElementById('game');

function destroy(toy) {
    
}
*/
console.log('changeasdfa sdf')

window.createGame = createGame;
function createGame(dimensions, parentEl, cb) {
    new Map({dimensions, parentEl, destroyCallback:cb})
}

