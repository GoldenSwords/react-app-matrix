export interface IImg {
  position: {x:number,y:number};
  source?: HTMLImageElement;
  width: number;
  height: number;
  scale: number;
  _id: string;
}

export interface IPatchImg {
  position: {x:number,y:number};
  width: number;
  height: number;
  scale: number;
  _id: string;
}