'use strict';
import * as sound from './sound.js';
import { Field, ItemType } from './field.js';

export const Reason = Object.freeze({
  win: 'win',
  lose: 'Lose',
  cancel: 'Cancel',
});

// Builder Pattern
export class GameBuilder {
  gameDuration(duration) {
    this.gameDuration = duration;
    return this;
  }

  CarrotCnt(num) {
    this.CarrotCnt = num;
    return this;
  }

  bugCnt(num) {
    this.bugCnt = num;
    return this;
  }

  bulid() {
    return new Game(
      this.gameDuration, //
      this.CarrotCnt, //
      this.bugCnt
    );
  }
}

class Game {
  constructor(durationSec, carrotCount, bugcount) {
    this.durationSec = durationSec;
    this.carrotCount = carrotCount;
    this.bugcount = bugcount;

    this.started = false;
    this.score = 0;
    this.timer = undefined;

    this.gameBtn = document.querySelector('.game__button');
    this.gameTimer = document.querySelector('.game__timer');
    this.gameScore = document.querySelector('.game__score');
    this.gameLevel = document.querySelector('.game__level');

    this.gameField = new Field(this.carrotCount, this.bugcount);
    this.gameField.setClickListener(this.onItemClick);

    this.gameBtn.addEventListener('click', () => {
      if (this.started) {
        this.stop(Reason.cancel);
      } else {
        this.start();
      }
    });
  }

  onItemClick = (item) => {
    if (!this.started) {
      return;
    }
    if (item === ItemType.carrot) {
      this.score++;
      console.log(this.score);
      this.updateScoreBoard();
      if (this.score === this.carrotCount) {
        this.stop(Reason.win);
      }
    } else if (item === ItemType.bug) {
      this.stop(Reason.lose);
    }
  };

  setGameStopListener(onGameStop) {
    this.onGameStop = onGameStop;
  }

  init() {
    this.score = 0;
    this.gameScore.textContent = this.carrotCount;
    this.gameField.init();
  }

  start() {
    this.started = true;
    this.init();
    this.showStartBtn(true);
    this.showStopBtn();
    this.hidelevel();
    this.showTimerAndStopBtn();
    this.startGameTimer(this.durationSec);
    sound.palyBgm();
    sound.palyBgm();
  }

  stop(Reason) {
    this.started = false;
    this.showStartBtn(false);
    this.stopGameTimer();
    sound.stopBgm();
    sound.loadBgm();
    this.onGameStop && this.onGameStop(Reason);
  }

  hidelevel() {
    this.gameLevel.style.display = 'none';
  }

  // showAndHideField() {
  //   this.gameLevel.style.display = 'none';
  // }

  showStopBtn() {
    const icon = this.gameBtn.querySelector('.fa-solid');
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
  }

  showStartBtn(boolean) {
    if (boolean) {
      this.gameBtn.style.visibility = 'visible';
    } else {
      this.gameBtn.style.visibility = 'hidden';
    }
  }

  showTimerAndStopBtn() {
    this.gameScore.style.visibility = 'visible';
    this.gameTimer.style.visibility = 'visible';
  }

  startGameTimer() {
    let remainingTimeSec = this.durationSec;
    this.updateTimerText(remainingTimeSec);
    this.timer = setInterval(() => {
      this.updateTimerText(--remainingTimeSec);
      if (remainingTimeSec <= 0) {
        this.stop(this.carrotCount === this.score ? Reason.win : Reason.lose);
        clearInterval(this.timer);
        return;
      }
    }, 1000);
  }

  stopGameTimer() {
    clearInterval(this.timer);
  }

  updateScoreBoard() {
    this.gameScore.textContent = this.carrotCount - this.score;
  }

  updateTimerText(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    this.gameTimer.textContent = `${minutes}:${seconds}`;
  }
}
