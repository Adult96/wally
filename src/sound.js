const audioCarrot = new Audio('sound/carrot_pull.mp3');
const audioBug = new Audio('sound/bug_pull.mp3');
const audioBgm = new Audio('sound/bg.mp3');
const audioalert = new Audio('sound/alert.wav');
const audioWin = new Audio('sound/game_win.mp3');

export function palyCarrot() {
  audioCarrot.play();
}

export function palyBug() {
  audioBug.play();
}

export function palyAlert() {
  audioalert.play();
}

export function palywin() {
  audioWin.play();
}

export function palyBgm() {
  audioBgm.play();
}

export function loadBgm() {
  audioBgm.load();
}

export function stopBgm() {
  audioBgm.pause();
}
