import { CANVAS_HEIGHT, CANVAS_WIDTH, SPEED } from "../constants/constants";
import { getRandomValue } from "../utils/utils";
import { Car } from "./Car";
import { Point } from "./Point";
let score = -2;

export class Player extends Car {
  keys = [];
  dy = 0.8;
  constructor(center: Point, img: string) {
    super(center, img);
  }
  updateY = () => {
    if (this.center.y >= CANVAS_HEIGHT) {
      this.center.y = -100;
      this.center.x = getRandomValue(10, CANVAS_WIDTH - this.width);
      score += 1;
    } else {
      this.center.y += this.dy * SPEED;
    }
  };
  updateX = () => {
    document.addEventListener("keydown", (e: KeyboardEvent) => {
      this.keys[e.key] = true;
    });
    document.addEventListener("keyup", (e: KeyboardEvent) => {
      this.keys[e.key] = false;
    });
    if (this.keys["a"]) {
      if (this.center.x <= 0) {
        this.center.x = 0;
      } else this.center.x -= this.dy * SPEED;
    } else if (this.keys["d"]) {
      if (this.center.x >= CANVAS_WIDTH - 50) {
        this.center.x = CANVAS_WIDTH - 50;
      } else this.center.x += this.dy * SPEED;
    }
  };
  collision = (nextCar: Car): number => {
    if (
      this.height + this.center.y >= nextCar.center.y &&
      this.center.y <= nextCar.center.y + nextCar.height &&
      this.center.x + this.width >= nextCar.center.x &&
      this.center.x <= nextCar.center.x + nextCar.width
    ) {
      console.log("collision");
      return -1;
    }
    return 0;
  };
  updateScore = () => {
    const scoreVal = document.querySelector(".score") as HTMLSelectElement;
    scoreVal.innerText = "Score: " + score;
  };
}
