import "../src/style.css";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./constants/constants";
import { Point } from "./shapes/Point";
import { Rectangle } from "./shapes/Rectangle";
import car from "./assets/car.png";
import car2 from "./assets/car3.png";
import { Player, score } from "./shapes/Player";

// Initialize canvas and context
const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

// Game state variables
let road_x_offset: number = 0;
let road_y_offset: number = 0;
let car_x_offset: number = 0;
let car_y_offset: number = 0;
let rectangle: Rectangle[] = [];
let myReq: number = 0;
type TPlayer = {
  start: Boolean;
  over: Boolean;
};
const player: TPlayer = { start: false, over: false };
let over = false;
let start = false;

// Create road rectangles
for (let i = 0; i < 2; i++) {
  road_y_offset = 0;
  for (let j = 0; j < 3; j++) {
    const rect = new Rectangle(
      new Point(
        CANVAS_WIDTH / 3.3 + road_x_offset,
        CANVAS_HEIGHT / 9 + road_y_offset
      ),
      30,
      150,
      "white"
    );
    rectangle.push(rect);
    road_y_offset += 350;
  }
  road_x_offset += 350;
}

// Create opponents
const opponent: Player[] = [];

for (let i = 0; i < 2; i++) {
  for (let j = 0; j < 2; j++) {
    const opp = new Player(
      new Point(CANVAS_WIDTH / +car_x_offset, CANVAS_HEIGHT / 5 + car_y_offset),
      car2
    );
    opponent.push(opp);
    car_y_offset += 450;
  }
  car_x_offset += 500;
}

// Road drawing and updating function
const roadFunc = () => {
  ctx.beginPath();
  rectangle.forEach((rect) => {
    rect.draw(ctx);
    rect.updateY();
  });
};

// Opponent drawing and updating function
const opponentFunc = (player1: Player) => {
  opponent.forEach((opp) => {
    opp.draw(ctx);
    opp.updateY();
    myReq = opp.collision(player1);
    if (myReq == -1) {
      player.start = false;
      player.over = true;
      over = true;
      start = false;
    }
  });
};

// Setup canvas properties
canvas.style.backgroundColor = "black";
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

// Create player instance
const player1 = new Player(
  new Point(CANVAS_WIDTH / 2.2, CANVAS_HEIGHT / 1.2),
  car
);

// Setup home menu
function homeMenu(player: any) {
  const gameInfo = document.querySelector(".game-info") as HTMLDivElement;
  const startBtn = document.querySelector(".btn") as HTMLButtonElement;

  if (startBtn) {
    startBtn.addEventListener("click", (e) => {
      e.preventDefault();
      gameInfo.style.top = "-50%";
      gameInfo.style.transition = "all 0.3s ease";
      player.start = true;
      start = true; // Update player start status inside the event listener
      console.log("Game started home:", player.start);
    });
  }

  // Initially set player.start to false
  player.start = false;
  player.over = false;
  over = false;
  start = false;
}

// Game drawing loop
function draw() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  console.log(over, start);
  if (start && !over) {
    roadFunc();
    opponentFunc(player1);
    scoreBoard();
    player1.draw(ctx);
    player1.updateX();
    player1.updateScore();
  } else if (over) {
    // If the game is over, show the game over screen
    gameOver(player);
    return;
  }
  requestAnimationFrame(draw);
}

// Scoreboard function
function scoreBoard() {
  const scoreBoard = document.querySelector(".score") as HTMLElement;
  if (!scoreBoard) {
    const newScoreBoard = document.createElement("h1");
    newScoreBoard.className = "score";
    newScoreBoard.innerText = "Score: ";
    canvas.parentElement?.appendChild(newScoreBoard);
  }
}

function gameOver(player: TPlayer) {
  const gameInfo = document.querySelector(".game-info") as HTMLDivElement;
  const gameOverScreen = document.querySelector(".game") as HTMLElement;
  const againBtn = document.querySelector(".again") as HTMLElement;
  const startBtn = document.querySelectorAll(".start");

  // Display game over message and show the "play again" button
  gameInfo.style.top = "50%";

  gameOverScreen.innerHTML = "Game Over <br/> Your Score is: " + score;
  gameOverScreen.style.display = "block";
  // Hide the start button
  [...startBtn].forEach((el: any) => {
    el.style.display = "none";
  });
  gameOverScreen.style.display = "block";
  againBtn.style.display = "block";

  againBtn.addEventListener("click", (e) => {
    e.preventDefault();
    // gameInfo.style.top = "-50%";
    gameInfo.style.transition = "all 0.3s ease";

    // Reset the game state
    player.start = true; // Set to true to restart the game
    player.over = false;
    over = false;
    start = true;
    // Set to false to indicate the game is not over
    // score = 0; // Reset the score
    draw();

    // Hide the game over screen
  });
  start = true;
  over = false;
}

// Initialize game

// gameOver(player);
draw();
homeMenu(player);
