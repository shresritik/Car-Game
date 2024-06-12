import { CANVAS_HEIGHT, CANVAS_WIDTH, SPEED } from "../constants/constants";
import { getRandomValue } from "../utils/utils";
import { Car } from "./Car";
import { Point } from "./Point";

export var foo = { score: -2 };

interface KeysMap {
  [key: string]: boolean;
}

export class Player extends Car {
  keys: KeysMap = {};
  verticalSpeed = 0.8;
  speedIncreaseInterval: number | null = null;
  speedIncreaseAmount = 0.1;

  constructor(center: Point, img: string) {
    super(center, img);
    document.addEventListener("keydown", this.keyDownHandler);
    document.addEventListener("keyup", this.keyUpHandler);
    this.startSpeedIncreaseTimer();
  }

  keyDownHandler = (e: KeyboardEvent) => {
    this.keys[e.key] = true;
  };

  keyUpHandler = (e: KeyboardEvent) => {
    this.keys[e.key] = false;
  };

  updateY = () => {
    if (this.center.y >= CANVAS_HEIGHT + this.height) {
      this.center.y = -100;
      this.center.x = getRandomValue(5, CANVAS_WIDTH - this.width);
      foo.score += 1;
    } else {
      this.center.y += this.verticalSpeed * SPEED;
    }
  };

  updateX = () => {
    if (this.keys["a"]) {
      if (this.center.x <= 0) {
        this.center.x = 0;
      } else this.center.x -= this.verticalSpeed * SPEED;
    } else if (this.keys["d"]) {
      if (this.center.x >= CANVAS_WIDTH - this.width) {
        this.center.x = CANVAS_WIDTH - this.width;
      } else this.center.x += this.verticalSpeed * SPEED;
    }
  };

  collision = (nextCar: Car): number => {
    if (
      this.center.y + this.height >= nextCar.center.y &&
      this.center.y <= nextCar.center.y + nextCar.height &&
      this.center.x + this.width >= nextCar.center.x &&
      this.center.x <= nextCar.center.x + nextCar.width
    ) {
      return -1;
    }
    return 0;
  };

  updateScore = () => {
    const scoreVal = document.querySelector(".score") as HTMLElement;
    scoreVal.innerText = "Score: " + foo.score;
  };

  startSpeedIncreaseTimer = () => {
    this.speedIncreaseInterval = window.setInterval(() => {
      this.verticalSpeed += this.speedIncreaseAmount;
    }, 500);
  };

  stopSpeedIncreaseTimer = () => {
    if (this.speedIncreaseInterval !== null) {
      clearInterval(this.speedIncreaseInterval);
      this.speedIncreaseInterval = null;
    }
  };

  reset = () => {
    this.verticalSpeed = 0.8;
    this.keys = {};
    this.stopSpeedIncreaseTimer();
  };
}
