import goblinImg from '../img/goblin.png';

export default class GamePlay {
    constructor() {
        this.boardSize = 4;
        this.container = null;
        this.boardEl = null;
        this.cells = [];
        this.activePosition = null;
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
            this.boardEl.appendChild(cell);
        }

        this.cells = Array.from(this.boardEl.children);
        this.container.appendChild(this.boardEl);
    }

    start() {
        this.drawBoard();
        // Случайная начальная позиция
        this.activePosition = Math.floor(Math.random() * this.cells.length);
        this.showGoblin(this.activePosition);

        // Перемещение каждую секунду (1000 мс)
        setInterval(() => {
            this.moveGoblin();
        }, 1000);
    }

    showGoblin(index) {
        if (!this.goblinElement) {
            this.goblinElement = document.createElement('img');
            this.goblinElement.src = goblinImg;
            this.goblinElement.classList.add('goblin');
        }
        // appendChild просто перемещает элемент, если он уже есть в DOM
        this.cells[index].appendChild(this.goblinElement);
    }

    moveGoblin() {
        let newPosition;
        // Ищем новую позицию, отличную от текущей
        do {
            newPosition = Math.floor(Math.random() * this.cells.length);
        } while (newPosition === this.activePosition);

        this.activePosition = newPosition;
        this.showGoblin(newPosition);
    }
}