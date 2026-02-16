import './css/style.css';
import GamePlay from './js/GamePlay';

const game = new GamePlay();
game.bindToDOM(document.querySelector('#game-container'));
game.start();