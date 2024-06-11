import "../src/style.css";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./constants/constants";
import { Point } from "./shapes/Point";
import { Rectangle } from "./shapes/Rectangle";
import car from "./assets/car.png";
import car2 from "./assets/car3.png";

import { Player } from "./shapes/Player";

const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;

const ctx = canvas.getContext("2d")!;

let road_x_offset: number = 0;
let road_y_offset: number = 0;
let car_x_offset: number = 0;
let car_y_offset: number = 0;
let rectangle: Rectangle[] = [];
let myReq: number = 0;
const player = { start: false };
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
    // rect.draw(ctx);
    rectangle.push(rect);
    road_y_offset += 350;
  }
  road_x_offset += 350;
}
const opponent: Player[] = [];
for (let i = 0; i < 2; i++) {
  for (let j = 0; j < 2; j++) {
    const opp = new Player(
      new Point(
        CANVAS_WIDTH / 5 + car_x_offset,
        CANVAS_HEIGHT / 5 + car_y_offset
      ),

      car2
    );
    opponent.push(opp);
    car_y_offset += 450;
  }
  car_x_offset += 450;
}

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
    if (myReq == -1) player.start = false;
  });
};
canvas.style.backgroundColor = "black";
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

const player1 = new Player(
  new Point(CANVAS_WIDTH / 2.2, CANVAS_HEIGHT / 1.2),
  car
);
homeMenu(player);
function draw() {
  ctx.clearRect(0, 0, CANVAS_HEIGHT, CANVAS_WIDTH);

  homeMenu(player);
  console.log(player.start);
  if (player.start) {
    roadFunc();
    opponentFunc(player1);
    scoreBoard();
    player1.draw(ctx);
    player1.updateX();
    player1.updateScore();

    requestAnimationFrame(draw);
  }
}
function scoreBoard() {
  const scoreBoard = document.createElement("h1") as HTMLElement;
  scoreBoard.className = "score";
  scoreBoard.innerText = "Score: ";
  canvas.parentElement?.appendChild(scoreBoard);
}

function homeMenu(player: any) {
  let status = false;
  const gameInfo = document.querySelector(".game-info") as HTMLDivElement;
  const startBtn = document.querySelector(".btn") as HTMLButtonElement;

  if (startBtn) {
    startBtn.addEventListener("click", (e) => {
      e.preventDefault();
      gameInfo.style.top = "-50%";
      gameInfo.style.transition = "all 0.3s ease";
      status = true;
      player.start = true; // Update player start status inside the event listener
      console.log(status);
    });
  }

  // Initially set player.start to false
  player.start = false;
}
draw();
