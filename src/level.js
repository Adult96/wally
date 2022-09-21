'use strict';

export class LevelSelect {
  constructor() {
    this.select = document.querySelector('.level');
    this.select.addEventListener('click', (e) => {
      e.target.style.background = 'darkorange';
      this.selectd(e.target.innerText);
    });
  }

  selectd(key) {
    let time = 0;
    let carrot = 0;
    let bug = 0;
    if (key === '') return;

    if (key === '1') {
      time = 5;
      carrot = 3;
      bug = 0;
    } else if (key === '3') {
      time = 10;
      carrot = 6;
      bug = 0;
    } else if (key === '4') {
      time = 15;
      carrot = 9;
      bug = 0;
    } else if (key === '5') {
      time = 20;
      carrot = 12;
      bug = 0;
    } else if (key === '6') {
      time = 25;
      carrot = 15;
      bug = 0;
    } else if (key === '7') {
      time = 30;
      carrot = 18;
      bug = 0;
    } else if (key === '8') {
      time = 35;
      carrot = 21;
      bug = 0;
    } else if (key === '9') {
      time = 30;
      carrot = 24;
      bug = 0;
    } else if (key === '10') {
      time = 30;
      carrot = 30;
      bug = 0;
    }
    return [time, carrot, bug];
  }
}
