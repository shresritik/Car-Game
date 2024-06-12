import "../src/style.css";
import { CANVAS_HEIGHT, CANVAS_WIDTH, foo } from "./constants/constants";
import { Point } from "./shapes/Point";
import { Rectangle } from "./shapes/Rectangle";
import car from "./assets/car.png";
import car2 from "./assets/car3.png";
import car3 from "./assets/car4.png";
import { Player } from "./shapes/Player";

const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

let road_x_offset: number = 0;
let road_y_offset: number = 0;
let car_x_offset: number = 0;
let car_y_offset: number = 0;
let rectangle: Rectangle[] = [];
let myReq: number = 0;

let over = false;
let start = false;
const createRoadRectangles = () => {
  rectangle = [];
  road_x_offset = 0;
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
};

const createOpponents = () => {
  car_x_offset = 0;
  car_y_offset = 0;
  let allCars = [car2, car3, car2];

  const opponent: Player[] = [];

  for (let j = 0; j < 3; j++) {
    const opp = new Player(
      new Point(
        CANVAS_WIDTH / 2.2 + car_x_offset,
        CANVAS_HEIGHT / 5 + car_y_offset
      ),
      allCars[j]
    );
    opponent.push(opp);
    car_x_offset += 250;
    car_y_offset += 500;
  }
  return opponent;
};
let opponent: Player[] = createOpponents();

const roadFunc = () => {
  ctx.beginPath();
  rectangle.forEach((rect) => {
    rect.draw(ctx);
    rect.updateY();
  });
};

const opponentFunc = (player1: Player) => {
  opponent.forEach((opp) => {
    opp.draw(ctx);
    opp.updateY();
    myReq = opp.collision(player1);
    if (myReq == -1) {
      over = true;
      start = false;
    }
  });
};

canvas.style.backgroundColor = "black";
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

let player1 = new Player(
  new Point(CANVAS_WIDTH / 2.2, CANVAS_HEIGHT / 1.2),
  car
);

function homeMenu() {
  const gameInfo = document.querySelector(".game-info") as HTMLDivElement;
  const startBtn = document.querySelector(".btn") as HTMLButtonElement;

  if (startBtn) {
    startBtn.addEventListener("click", (e) => {
      e.preventDefault();
      createRoadRectangles();
      gameInfo.style.top = "-50%";
      gameInfo.style.transition = "all 0.3s ease";
      start = true;
    });
  }

  over = false;
  start = false;
}

function draw() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  if (start && !over) {
    roadFunc();
    opponentFunc(player1);
    scoreBoard();
    player1.draw(ctx);
    player1.updateX();
    player1.updateScore();
  } else if (over) {
    gameOver();
    return;
  }
  requestAnimationFrame(draw);
}

function scoreBoard() {
  const scoreBoard = document.querySelector(".score") as HTMLElement;
  if (!scoreBoard) {
    const newScoreBoard = document.createElement("h1");
    newScoreBoard.className = "score";
    newScoreBoard.innerText = "Score: ";
    canvas.parentElement?.appendChild(newScoreBoard);
  }
}

function gameOver() {
  const gameInfo = document.querySelector(".game-info") as HTMLDivElement;
  const gameOverScreen = document.querySelector(".game") as HTMLElement;
  const againBtn = document.querySelector(".again") as HTMLElement;
  const startBtn = document.querySelectorAll(".start");

  gameInfo.style.top = "50%";

  gameOverScreen.innerHTML = "Game Over <br/> Your Score is: " + foo.score;
  gameOverScreen.style.display = "block";
  [...startBtn].forEach((el: any) => {
    el.style.display = "none";
  });
  gameOverScreen.style.display = "block";
  againBtn.style.display = "block";
  againBtn.addEventListener("click", restartGame);
}

function restartGame(e: Event) {
  e.preventDefault();
  const gameInfo = document.querySelector(".game-info") as HTMLDivElement;
  const gameOverScreen = document.querySelector(".game") as HTMLElement;
  const againBtn = document.querySelector(".again") as HTMLElement;

  over = false;
  start = true;

  createRoadRectangles();
  opponent = createOpponents();
  player1 = new Player(new Point(CANVAS_WIDTH / 2.2, CANVAS_HEIGHT / 1.2), car);
  player1.reset();
  gameInfo.style.top = "-50%";
  foo.score = -1;

  gameOverScreen.style.display = "none";
  againBtn.style.display = "none";

  draw();
}

// Initialize game
draw();
homeMenu();
