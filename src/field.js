'use strict';
import * as sound from './sound.js';

const CARROT_SIZE = 80;

export const ItemType = Object.freeze({
  carrot: 'carrot',
  bug: 'bug',
});

export class Field {
  constructor(carrotCount, bugCount) {
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.gameField = document.querySelector('.game__field');
    this.gameFieldRect = this.gameField.getBoundingClientRect();
    this.gameField.addEventListener('click', this.onclick);
  }

  init() {
    this.gameField.innerHTML = '';
    this._addItem(ItemType.carrot, this.carrotCount, 'img/wally.png');
    this._addItem(ItemType.bug, this.bugCount, 'img/bug.png');
  }

  setClickListener(onItemClick) {
    this.onItemClick = onItemClick;
  }

  _addItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = this.gameFieldRect.width - CARROT_SIZE;
    const y2 = this.gameFieldRect.height - CARROT_SIZE;

    for (let i = 0; i < count; i++) {
      const createItem = document.createElement('img');
      createItem.setAttribute('class', className);
      createItem.setAttribute('src', imgPath);
      const x = randomNumber(x1, x2);
      const y = randomNumber(y1, y2);
      createItem.style.position = 'absolute';
      createItem.style.top = `${y}px`;
      createItem.style.left = `${x}px`;

      this.gameField.appendChild(createItem);
    }
  }

  onclick = (event) => {
    const target = event.target;
    if (target.matches('.carrot')) {
      target.remove();
      sound.palyCarrot();
      this.onItemClick && this.onItemClick(ItemType.carrot);
    } else if (target.matches('.bug')) {
      this.onItemClick && this.onItemClick(ItemType.bug);
    }
  };
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
