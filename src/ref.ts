import "./style.css";

import cars from "./assets/cars.jpg";

console.log(cars);

const carImage = new Image();

carImage.src = cars;

// carImage.onload = function () {
//   document.body.appendChild(carImage);
// }

import { DIMENSIONS, SPEED } from "./constants";

import Line from "./shapes/Line";
import Point from "./shapes/Point";
import Circle from "./shapes/Circle";

import { getRandomInt, clamp } from "./utils/common";

const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

canvas.width = DIMENSIONS.CANVAS_WIDTH;
canvas.height = DIMENSIONS.CANVAS_HEIGHT;

const line = new Line(new Point(100, 100), new Point(200, 300));

const circle1 = new Circle(new Point(100, getRandomInt(-400, 0)), 20);

const circle2 = new Circle(new Point(300, getRandomInt(-400, 0)), 20);

const circle3 = new Circle(new Point(500, getRandomInt(-400, 0)), 20);

const circles = [circle1, circle2, circle3];

const player1 = new Circle(new Point(300, DIMENSIONS.CANVAS_HEIGHT - 40), 20);

const player2 = new Circle(new Point(300, DIMENSIONS.CANVAS_HEIGHT - 40), 20);

console.log(line);

let gameSpeed = 1;

function draw() {
  ctx.clearRect(0, 0, DIMENSIONS.CANVAS_WIDTH, DIMENSIONS.CANVAS_HEIGHT);
  ctx.fillStyle = "#9c9c9c";
  ctx.fillRect(0, 0, DIMENSIONS.CANVAS_WIDTH, DIMENSIONS.CANVAS_HEIGHT);

  ctx.strokeStyle = "#fff";

  circles.forEach((circle) => {
    ctx.beginPath();
    ctx.drawImage(
      carImage,
      215,
      390,
      122,
      258,
      circle.center.x - 20,
      circle.center.y - 40,
      40,
      80
    );

    ctx.stroke();
    circle.center.y += clamp(SPEED * gameSpeed, 0, 3);

    if (circle.center.y > DIMENSIONS.CANVAS_HEIGHT) {
      circle.center.y = getRandomInt(-200, 0);
    }
  });

  ctx.beginPath();
  ctx.drawImage(
    carImage,
    215,
    120,
    122,
    258,
    player1.center.x - 20,
    player1.center.y - 40,
    40,
    80
  );

  requestAnimationFrame(draw);

  gameSpeed *= 1.01;
}

requestAnimationFrame(draw);

window.addEventListener("keypress", (event) => {
  switch (event.key) {
    case "a": {
      player1.center.x -= 200;
      break;
    }

    case "d": {
      player1.center.x += 200;
      break;
    }

    case "h": {
      player2.center.x -= 200;
      break;
    }

    case "k": {
      player2.center.x += 200;
      break;
    }
  }
});

// new Controller({
//   left: 'a',
//   right: 'd',
//   target: player1
// });
// new Controller({
//   left: 'h',
//   right: 'k',
//   target: player2
// });
