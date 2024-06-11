import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../constants/constants";
import { Point } from "./Point";
interface ICar {
  center: Point;
  img: HTMLImageElement;
}
export class Car implements ICar {
  center: Point;
  img: HTMLImageElement;

  constructor(center: Point, img: string) {
    this.center = center;
    this.img = new Image();

    this.img.src = img;
  }
  draw = (ctx: CanvasRenderingContext2D) => {
    ctx.drawImage(this.img, CANVAS_WIDTH / 2.2, CANVAS_HEIGHT / 1.2, 50, 100);
  };
  update = (type: string) => {
    if (type == "up") {
    }
  };
}
