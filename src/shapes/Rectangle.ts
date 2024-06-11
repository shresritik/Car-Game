import { CANVAS_HEIGHT, SPEED } from "../constants/constants";
import { Point } from "./Point";
interface IRectangle {
  center: Point;
  width: number;
  height: number;
  color: string;
}
export class Rectangle implements IRectangle {
  width: number;
  height: number;
  color: string;
  center: Point;
  constructor(center: Point, width: number, height: number, color: string) {
    this.width = width;
    this.height = height;
    this.color = color;
    this.center = center;
  }
  draw = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.center.x, this.center.y, this.width, this.height);
  };
  updateY = () => {
    if (this.center.y >= CANVAS_HEIGHT) {
      this.center.y = 0;
    } else {
      this.center.y += SPEED;
    }
  };
}
