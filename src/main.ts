import "../src/style.css";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./constants/constants";
import { Point } from "./shapes/Point";
import { Rectangle } from "./shapes/Rectangle";
import car from "./assets/car.png";
import { Car } from "./shapes/Car";
const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

let x_offset: number = 0;
let y_offset: number = 0;
let rectangle: Rectangle[] = [];
for (let i = 0; i < 2; i++) {
  y_offset = 0;
  for (let j = 0; j < 2; j++) {
    const rect = new Rectangle(
      new Point(CANVAS_WIDTH / 3.3 + x_offset, CANVAS_HEIGHT / 9 + y_offset),
      30,
      150,
      "white"
    );
    rect.draw(ctx);
    rectangle.push(rect);
    y_offset += 450;
  }
  x_offset += 350;
}

const roadFunc = () => {
  ctx.beginPath();
  rectangle.forEach((rect) => {
    rect.draw(ctx);
    rect.updateY();
  });
};
canvas.style.backgroundColor = "black";
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

const carObj = new Car(new Point(CANVAS_WIDTH / 2.2, CANVAS_HEIGHT / 1.2), car);
function draw() {
  ctx.clearRect(0, 0, CANVAS_HEIGHT, CANVAS_WIDTH);
  roadFunc();
  carObj.draw(ctx);
  requestAnimationFrame(draw);
}

draw();
window.addEventListener("keydown", (e) => {
  let keyVal = e.key;
  switch (keyVal) {
    case "a":
      carObj.update("up");
      break;

    default:
      break;
  }
});
