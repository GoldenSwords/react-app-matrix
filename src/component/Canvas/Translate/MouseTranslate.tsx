import * as React from 'react';
import { MatrixHelper } from '@/helper';
import './index.scss';
interface ICanvasProps {
  imageSrc?: string;
}
interface ICanvasStates {
  x: number;
  y: number;
  start: boolean;
  moveMatrix: number[];
  scaleMatrix: number[];
}

class CanvasExport extends React.Component<ICanvasProps, ICanvasStates> {
  canvasRef: React.RefObject<HTMLCanvasElement> = React.createRef();
  divRef: React.RefObject<HTMLDivElement> = React.createRef();
  ctx: CanvasRenderingContext2D;
  h: number = 100;
  w: number = 40;
  line: number = 10;
  startX: number = 10;
  max: number = window.innerHeight - 300;
  animationCount: number = 0;
  animationDivCount: number = 0;
  scale: number = 1;
  scaleStep: number = 0.1;
  move: {x:number, y: number} = {x:0,y:0};
  temp: {x:number, y: number} = {x:0,y:0};
  catch: {move:{x:number, y: number},scale:{x:number, y: number}} = {move:{x:0,y:0},scale:{x:0,y:0}};
  baseMatrix: number[] = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 201, 201, 0, 1];
  constructor(props: ICanvasProps) {
    super(props);
    this.state = {
      x: 10,
      y: 10,
      start: true,
      moveMatrix: [],
      scaleMatrix: [],
    };
  }

  componentDidMount() {
    this.animationCount = requestAnimationFrame(this.initConfig);
    this.animationDivCount = requestAnimationFrame(this.initDivCONFIG);
    
  }
  initDivCONFIG = () => {
    cancelAnimationFrame(this.animationDivCount);
    if (this.divRef.current) {
      this.divRef.current.addEventListener('mousewheel',this.onWheel,{passive: false})
    } else {
      this.animationDivCount = requestAnimationFrame(this.initDivCONFIG);
    }
  }
  initConfig = () => {
    cancelAnimationFrame(this.animationCount);
    if (this.canvasRef.current) {
      this.canvasRef.current.width = window.innerWidth;
      this.canvasRef.current.height = window.innerHeight;
      this.ctx = this.canvasRef.current.getContext('2d');
      this.animation();
    } else {
      this.animationCount = requestAnimationFrame(this.initConfig);
    }
  }

  clear = () => {
    this.ctx.clearRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height);
  }

  drawSymbol = () => {
    const {width,height} = this.ctx.canvas;

    this.ctx.beginPath();
    this.ctx.moveTo(0,height/2);
    this.ctx.lineTo(width,height/2);
    this.ctx.moveTo(width/2,0);
    this.ctx.lineTo(width/2,height);
    this.ctx.strokeStyle="orange";
    this.ctx.lineWidth=2;
    this.ctx.stroke();
  }

  animation = () => {
    cancelAnimationFrame(this.animationCount);
    this.clear();
    this.drawSymbol();
    // this.animationCount = requestAnimationFrame(this.animation);
  }

  onMouseUp = (e: MouseEvent) => {
    this.temp = {
      x: e.clientX,
      y: e.clientY
    };
    this.move={
      x: e.clientX,
      y: e.clientY
    }
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
  }

  onMouseMove = (e: MouseEvent) => {
    this.move={
      x: e.clientX,
      y: e.clientY
    }
    const x = e.clientX - this.temp.x;
    const y = e.clientY - this.temp.y;
    const moveMatrix = MatrixHelper.translate3d(x,y,0);
    if(this.catch.move) {
      moveMatrix.splice(12,1,this.catch.move.x + moveMatrix[12])
      moveMatrix.splice(13,1,this.catch.move.y + moveMatrix[13])
    }
    this.setState({
      moveMatrix,
    });
  }

  onWheel = (e: WheelEvent) => {
    const {deltaY} = e;
    e.preventDefault();
    const {scaleMatrix: scale, moveMatrix} = this.state;
    if (deltaY > 0) {
     this.scale -= this.scaleStep;
    } else {
      this.scale += this.scaleStep;
    }
    console.log(deltaY, scale)
    const scaleMatrix = MatrixHelper.scale3d(this.scale,this.scale,1);
    this.setState({
      scaleMatrix,
    });
  }

  onMouseDown = (e: React.MouseEvent) => {
    this.move={
      x: e.clientX,
      y: e.clientY
    }
    this.temp = {
      x: e.clientX,
      y: e.clientY
    };
    const {moveMatrix} = this.state;
    if (moveMatrix.length) {
      this.catch = {
       move: {
        x: moveMatrix[12],
        y: moveMatrix[13]
       },
       scale: {
         x:0,
         y:0
       }
      };
    } else {
      this.catch = {
        move:{
          x:0,
          y:0
        },
        scale:{
          x:0,
          y:0
        }
      }
    }
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  }

  render() {
    const {x,y,moveMatrix,scaleMatrix} = this.state;
    const matrix = moveMatrix.length &&　scaleMatrix.length ?
      MatrixHelper.multipleMatrix(moveMatrix,scaleMatrix) :
      moveMatrix.length ? moveMatrix :
      scaleMatrix;
    return (
      <div className="canvas-export-container">
        <div 
          style={{
            position:'absolute',
            left:x,
            top:y, 
            padding:100,
            background:'red', 
            transform:`matrix3d(${matrix.join(',')})`
          }} 
          ref={this.divRef} 
          onMouseDown={this.onMouseDown}
        >123</div>
        <canvas ref={this.canvasRef}/>
      </div>
    );
  }
}

export default CanvasExport;
