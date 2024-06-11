import { Point } from "./Point";
interface ICircle {
  center: Point;
  radius: number;
}
export class Circle implements ICircle {
  center: Point;
  radius: number;
  constructor(center: Point, radius: number) {
    this.center = center;
    this.radius = radius;
  }
}
