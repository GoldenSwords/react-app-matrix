import * as React from 'react';
import { ImageLoader } from '@/helper';
import './index.scss';
interface ICanvasProps {
  imageSrc?: string;
}
interface ICanvasStates {
  x: number;
  y: number;
  start: boolean;
}

class CanvasExport extends React.Component<ICanvasProps, ICanvasStates> {
  canvasRef: React.RefObject<HTMLCanvasElement> = React.createRef();
  ctx: CanvasRenderingContext2D;
  h: number = 100;
  w: number = 40;
  line: number = 10;
  startX: number = 10;
  startY: number = 10;
  max: number = window.innerHeight - 300;
  animationCount: number = 0;
  constructor(props: ICanvasProps) {
    super(props);
    this.state = {
      x: 10,
      y: 10,
      start: true,
    };
  }

  componentDidMount() {
    this.animationCount = requestAnimationFrame(this.initConfig);
  }

  clear = () => {
    this.ctx.clearRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height);
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

  drawSymbol = () => {
    const {x,y} = this.state;
    this.ctx.lineWidth=this.line;
    this.ctx.beginPath();
    this.ctx.moveTo(x,y);
    this.ctx.lineTo(x,y+this.h);
    this.ctx.lineTo(x+this.w,y+this.h);
    this.ctx.strokeStyle="#fff";
    this.ctx.stroke();

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
    this.renderTranslate();
    this.animationCount = requestAnimationFrame(this.animation);
  }

  renderTranslate = () => {
    const {start, x, y} = this.state;
    if (start) {
      this.setState({
        x: x+1,
        y: y+1,
      });
      if (x+1>this.max) {
        this.setState({
          start: false
        });
      }
    } else {
      this.setState({
        x: x-1,
        y: y-1,
      });
      if (x-1<this.startX) {
        this.setState({
          start: true
        });
      }
    }
  }

  render() {
    return (
      <div className="canvas-export-container">
        <canvas ref={this.canvasRef}/>
      </div>
    );
  }
}

export default CanvasExport;
