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
  matrix: number[];
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
  move: number = 0;
  baseMatrix: number[] = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 201, 201, 0, 1];
  constructor(props: ICanvasProps) {
    super(props);
    this.state = {
      x: 10,
      y: 10,
      start: true,
      matrix: []
    };
  }

  componentDidMount() {
    this.animationCount = requestAnimationFrame(this.initConfig);
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

    const matrix = MatrixHelper.translate3d(this.move,this.move,0);
    this.setState({
      matrix,
    });
  }

  animation = () => {
    cancelAnimationFrame(this.animationCount);
    this.clear();
    this.drawSymbol();
    this.renderTranslate();
    this.animationCount = requestAnimationFrame(this.animation);
  }

  renderTranslate = () => {
    const {start} = this.state;
    if (start) {
      this.move += 1;
      if (this.move>this.max) {
        this.setState({
          start: false
        });
      }
    } else {
      this.move -= 1;
      if (this.move<this.startX) {
        this.setState({
          start: true
        });
      }
    }
  }

  render() {
    const {x,y,matrix} = this.state;
    return (
      <div className="canvas-export-container">
        <div style={{position:'absolute',left:x,top:y, padding:100,background:'red', transform:`matrix3d(${matrix.join(',')})`}} ref={this.divRef}/>
        <canvas ref={this.canvasRef}/>
      </div>
    );
  }
}

export default CanvasExport;
