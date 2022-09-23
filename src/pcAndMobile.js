const game = document.querySelector('.game');
const gameField = document.querySelector('.game__field');
const popUp = document.querySelector('.pop-up');

function checkTouchable() {
  const touch = !!window.ontouchstart;
  game.dataset.touchable = touch;
  gameField.dataset.touchable = touch;
  popUp.dataset.touchable = touch;
}

window.addEventListener('resize', () => {
  checkTouchable();
});

export default checkTouchable;
