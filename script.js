var playStart = new Audio("start.wav");
var resetSound = new Audio("reset.mp3");
var music = new Audio("joyful.mp3");
var pickSound = new Audio("pick.wav")
music.loop = true;
music.volume = 0.05;
playStart.volume = 0.05;
resetSound.volume = 0.05;
pickSound.volume = 0.05;

document.addEventListener("DOMContentLoaded", function () {
  const playButton = document.getElementById("playButton");
  const usernameInput = document.getElementById("username");
  const userInput = document.getElementById("user-input");
  const playerSide = document.getElementById("player-side");

  playButton.addEventListener("click", function () {
    playStart.play();
    userInput.style.display = "none";
    const username = usernameInput.value;
    if (username.trim() !== "") {
      playerSide.textContent = username;
      usernameInput.style.display = "none";
      playButton.style.display = "none";
      music.play();
    }
  });
});

let playerScore = 0;
let Tie = 0;
let botScore = 0;

const playerScore_span = document.getElementById("player-score");
const draw_span = document.getElementById("draw-score");
const botScore_span = document.getElementById("bot-score");
const scoreBoard_div = document.querySelector("score-board");
const result_p = document.querySelector(".result >p");
const rock_div = document.getElementById("rock");
const paper_div = document.getElementById("paper");
const scissor_div = document.getElementById("scissor");

function getBotChoice() {
  const choices = ["rock", "paper", "scissor"];
  const randomNumber = Math.floor(Math.random() * 3);
  return choices[randomNumber];
}

function win(playerChoice, botChoice) {
  const playerChoice_div = document.getElementById(playerChoice);
  playerScore++;
  playerScore_span.innerHTML = playerScore;
  botScore_span.innerHTML = botScore;
  result_p.innerHTML = `${playerChoice} TINALO ${botChoice} PANALO KA 🫵 BATA!!! 😁 `;
  document.getElementById(playerChoice).classList.add("win-glow");
  setTimeout(() => playerChoice_div.classList.remove("win-glow"), 300);
}

function lose(playerChoice, botChoice) {
  const playerChoice_div = document.getElementById(playerChoice);
  botScore++;
  playerScore_span.innerHTML = playerScore;
  botScore_span.innerHTML = botScore;
  result_p.innerHTML = `${playerChoice} TINALO ${botChoice} TALO KA 😨 BATA 😩 😭 `;
  document.getElementById(playerChoice).classList.add("lost-glow");
  setTimeout(() => playerChoice_div.classList.remove("lost-glow"), 300);
}

function draw(playerChoice, botChoice) {
  const playerChoice_div = document.getElementById(playerChoice);
  Tie++;
  draw_span.innerHTML = Tie;
  playerScore_span.innerHTML = playerScore;
  botScore_span.innerHTML = botScore;
  result_p.innerHTML = `${playerChoice} = ${botChoice} PATAS 👏 LANG 🤝 BATA!!! 🤜🤛 `;
  document.getElementById(playerChoice).classList.add("draw-glow");
  setTimeout(() => playerChoice_div.classList.remove("draw-glow"), 300);
}

function move(playerChoice) {
  pickSound.play();
  const botChoice = getBotChoice();
  switch (playerChoice + botChoice) {
    case "rockscissor":
    case "paperrock":
    case "scissorpaper":
      win(playerChoice, botChoice);
      break;
    case "rockpaper":
    case "papescissor":
    case "scissorrock":
      lose(playerChoice, botChoice);
      break;
    case "paperpaper":
    case "scissorscissor":
    case "rockrock":
      draw(playerChoice, botChoice);
      break;
  }
}
function resetScoreboard(resetBtn) {
  playerScore = 0;
  Tie = 0;
  botScore = 0;
  playerScore_span.innerHTML = "0";
  draw_span.innerHTML = "0";
  botScore_span.innerHTML = "0";
  result_p.innerHTML = "BATO BATO PICK. Panalo ka!!!";
  resetSound.play();
}

function main() {
  rock_div.addEventListener("click", () => move("rock"));
  paper_div.addEventListener("click", () => move("paper"));
  scissor_div.addEventListener("click", () => move("scissor"));
  const resetBtn = document.getElementById("resetBtn");
  resetBtn.addEventListener("click", resetScoreboard);
}
main();
