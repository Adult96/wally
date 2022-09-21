'use strict';
import PopUp from './popup.js';
import { GameBuilder, Reason } from './game.js';
import { LevelSelect } from './level.js';
import * as sound from './sound.js';

const selectLevel = document.querySelector('.level');
const level = new LevelSelect();

selectLevel.addEventListener('click', (e) => {
  const text = e.target.innerText;
  const setLevel = level.selectd(text);

  const game = new GameBuilder()
    .gameDuration(setLevel[0]) //
    .CarrotCnt(setLevel[1]) //
    .bugCnt(setLevel[2]) //
    .bulid();

  game.setGameStopListener((reason) => {
    let message;
    switch (reason) {
      case Reason.cancel:
        message = 'Replay?';
        sound.palyAlert();
        break;
      case Reason.win:
        message = 'You Win!';
        sound.palywin();
        break;
      case Reason.lose:
        message = 'You Lose';
        sound.palyBug();
        break;
      default:
        throw new Error('not valid reason');
    }
    gameFinishBanner.showWithText(message);
  });

  const gameFinishBanner = new PopUp();
  gameFinishBanner.setClickListener(() => {
    game.start();
  });
});
