export interface IImg {
  position: {x:number,y:number};
  offset?: {x:number,y:number};
  scaleOffset?: {x:number,y:number};
  source?: HTMLImageElement;
  width: number;
  height: number;
  // scale: number;
  _id: string;
}

export interface IPatchImg {
  position: {x:number,y:number};
  offset?: {x:number,y:number};
  scaleOffset?: {x:number,y:number};
  width: number;
  height: number;
  // scale: number;
  _id: string;
}

export interface IOpt {
  dom: React.RefObject<HTMLCanvasElement>;
}

export interface ICanvasEvent {
  mouseDown?(e: React.MouseEvent, opt: IOpt): void;
  mouseMove?(e: React.MouseEvent, opt: IOpt): void;
  mouseUp?(e: React.MouseEvent, opt: IOpt): void;
  keyDown?(e: KeyboardEvent, opt: IOpt): void;
  keyUp?(e: KeyboardEvent, opt: IOpt): void;
}