import { Point } from "./Point";
interface ICar {
  center: Point;
  img: HTMLImageElement;
  width: number;
  height: number;
}
export class Car implements ICar {
  center: Point;
  img: HTMLImageElement;
  width: number = 50;
  height: number = 100;
  constructor(center: Point, img: string) {
    this.center = center;
    this.img = new Image();

    this.img.src = img;
  }
  draw = (ctx: CanvasRenderingContext2D) => {
    ctx.drawImage(
      this.img,
      this.center.x,
      this.center.y,
      this.width,
      this.height
    );
  };
}
