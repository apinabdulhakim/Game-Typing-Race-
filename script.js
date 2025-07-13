const sentences = [
  "The quick brown fox jumps over the lazy dog",
  "Typing games can improve your speed",
  "JavaScript makes web pages interactive",
  "Practice makes perfect in coding",
  "Never stop learning and improving",
  "Fast fingers win the race in typing"
];

const sentenceBox = document.getElementById("targetSentence");
const player1Input = document.getElementById("player1Input");
const player2Input = document.getElementById("player2Input");
const timer1Text = document.getElementById("timer1");
const timer2Text = document.getElementById("timer2");
const statusText = document.getElementById("statusText");
const winnerText = document.getElementById("winnerText");

let currentSentence = "";
let phase = 0; // 0 = belum main, 1 = player1, 2 = player2, 3 = selesai
let startTime = null;
let timerInterval = null;
let time1 = 0;
let time2 = 0;

function startGame() {
  currentSentence = sentences[Math.floor(Math.random() * sentences.length)];
  sentenceBox.innerText = currentSentence;

  player1Input.value = "";
  player2Input.value = "";
  player1Input.disabled = false;
  player2Input.disabled = true;
  player1Input.placeholder = "Ketik di sini...";
  player2Input.placeholder = "Tunggu giliran...";
  player1Input.focus();

  winnerText.innerText = "";
  timer1Text.innerText = "Waktu: 0.00 s";
  timer2Text.innerText = "Waktu: 0.00 s";
  statusText.innerText = "🎮 Giliran Player 1";

  phase = 1;
  startTime = null;
  time1 = 0;
  time2 = 0;
}

function startTimer() {
  startTime = performance.now();
  timerInterval = setInterval(() => {
    const elapsed = ((performance.now() - startTime) / 1000).toFixed(2);
    if (phase === 1) timer1Text.innerText = `Waktu: ${elapsed} s`;
    else if (phase === 2) timer2Text.innerText = `Waktu: ${elapsed} s`;
  }, 50);
}

function stopTimer() {
  clearInterval(timerInterval);
  const endTime = performance.now();
  const elapsed = ((endTime - startTime) / 1000).toFixed(2);
  return parseFloat(elapsed);
}

player1Input.addEventListener("input", () => {
  if (phase !== 1) return;
  if (!startTime) startTimer();

  if (player1Input.value.trim() === currentSentence) {
    time1 = stopTimer();
    player1Input.disabled = true;
    player1Input.placeholder = "Sudah selesai!";
    statusText.innerText = "✅ Player 1 selesai! Giliran Player 2...";
    setTimeout(() => {
      phase = 2;
      player2Input.disabled = false;
      player2Input.focus();
      player1Input.placeholder = "Tunggu giliran...";
      player2Input.placeholder = "Ketik di sini...";
      statusText.innerText = "🎮 Giliran Player 2";
      startTime = null;
      timer2Text.innerText = "Waktu: 0.00 s";
    }, 1500);
  }
});

player2Input.addEventListener("input", () => {
  if (phase !== 2) return;
  if (!startTime) startTimer();

  if (player2Input.value.trim() === currentSentence) {
    time2 = stopTimer();
    player2Input.disabled = true;
    player2Input.placeholder = "Sudah selesai!";
    phase = 3;
    statusText.innerText = "✅ Player 2 selesai!";
    showWinner();
  }
});

function showWinner() {
  if (time1 < time2) {
    winnerText.innerText = `🏆 Player 1 menang! (${time1}s vs ${time2}s)`;
  } else if (time2 < time1) {
    winnerText.innerText = `🏆 Player 2 menang! (${time2}s vs ${time1}s)`;
  } else {
    winnerText.innerText = `🤝 Seri! (${time1}s vs ${time2}s)`;
  }
}
