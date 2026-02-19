import goblinImg from '../img/goblin.png';

export default class GamePlay {
  constructor() {
    this.boardSize = 4;
    this.container = null;
    this.boardEl = null;
    this.cells = [];
    this.activePosition = null;
    this.timerId = null; 
  }

  bindToDOM(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('container is not HTMLElement');
    }
    this.container = container;
  }

  drawBoard() {
    this.boardEl = document.createElement('div');
    this.boardEl.classList.add('board');

    for (let i = 0; i < this.boardSize ** 2; i += 1) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      this.boardEl.append(cell);
    }

    this.cells = Array.from(this.boardEl.children);
    this.container.append(this.boardEl);
  }

  start() {
    this.drawBoard();
    this.activePosition = Math.floor(Math.random() * this.cells.length);
    this.showGoblin(this.activePosition);

    this.timerId = setInterval(() => {
      this.moveGoblin();
    }, 1000);
  }

  showGoblin(index) {
    if (!this.goblinElement) {
      this.goblinElement = document.createElement('img');
      this.goblinElement.src = goblinImg;
      this.goblinElement.classList.add('goblin');
    }

    this.cells[index].append(this.goblinElement);
  }

  moveGoblin() {
    let newPosition;
    do {
      newPosition = Math.floor(Math.random() * this.cells.length);
    } while (newPosition === this.activePosition);

    this.activePosition = newPosition;
    this.showGoblin(newPosition);
  }
  
  stop() {
    clearInterval(this.timerId);
  }
}
