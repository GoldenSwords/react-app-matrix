import * as React from 'react';
import { IImg } from 'src/model/canvas';
import './index.scss';
interface ICanvasProps {
  pages: IImg[];
  event?: {
    mouseDown?(e: React.MouseEvent, opt: any): void;
    mouseMove?(e: MouseEvent, opt: any): void;
    mouseUp?(e: MouseEvent, opt: any): void;
  }
}
interface ICanvasStates {
  scale: number;
  hoverPage: string;
  selectedPages: string[];
}

class CanvasContainer extends React.Component<ICanvasProps, ICanvasStates> {
  forwardCanvas: React.RefObject<HTMLCanvasElement> = React.createRef();
  backgroundCanvas: React.RefObject<HTMLCanvasElement> = React.createRef();
  forwardCtx: CanvasRenderingContext2D;
  backgroundCtx: CanvasRenderingContext2D;
  ctxStyle = {
    strokeStyle: '#418fd7',
    strokeSize: 8,
    resetStyle: '#ffffff',
    resetSize: 1,
  };
  constructor(props: ICanvasProps) {
    super(props);
    this.state = {
      scale: 0.1,
      hoverPage: '',
      selectedPages: [],
    };
  }

  componentDidMount() {
    const { width, height } = this.backgroundCanvas.current.getBoundingClientRect();
    this.forwardCanvas.current.width = this.backgroundCanvas.current.width = width;
    this.forwardCanvas.current.height = this.backgroundCanvas.current.height = height;
    this.forwardCtx = this.forwardCanvas.current.getContext('2d');
    this.backgroundCtx = this.backgroundCanvas.current.getContext('2d');
  }

  componentDidUpdate(preProps: ICanvasProps, preStates: ICanvasStates) {
    const { hoverPage, selectedPages, scale } = this.state;

    this.paintForward();
    if (hoverPage !== preStates.hoverPage
      || selectedPages !== preStates.selectedPages
      || scale !== preStates.scale) {
      this.paintBackground();
    }
  }

  resetStyle = (ctx: CanvasRenderingContext2D) => {
    ctx.strokeStyle = this.ctxStyle.resetStyle;
    ctx.lineWidth = this.ctxStyle.resetSize;
  }

  paintImg = (ctx: CanvasRenderingContext2D, page: IImg) => {
    const { position, source, width, height } = page;
    const { scale } = this.state;
    if (source) {
      ctx.drawImage(source, 0, 0, width, height, position.x, position.y, width * scale, height * scale );
    }
  }

  paintBorder = (ctx: CanvasRenderingContext2D, page: IImg) => {
    const { position, source, width, height } = page;
    const { scale } = this.state;
    if (source) {
      ctx.beginPath();
      ctx.rect(position.x, position.y, width * scale, height * scale );
      ctx.strokeStyle = this.ctxStyle.strokeStyle;
      ctx.lineWidth = this.ctxStyle.strokeSize;
      ctx.stroke();
    }
  }

  paintForward = () => {
    const { pages } = this.props;
    const { selectedPages, hoverPage } = this.state;
    const ctx = this.forwardCtx;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    pages.forEach((page: IImg) => {
      if (page && (page._id === hoverPage || !selectedPages.includes(page._id))) {
        this.paintImg(ctx, page);
        this.paintBorder(ctx, page);
      }
    });
  }
  
  paintBackground = () => {
    const { pages } = this.props;
    const { selectedPages, hoverPage } = this.state;
    const ctx = this.backgroundCtx;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    pages.forEach((page: IImg) => {
      if (page && page._id !== hoverPage && !selectedPages.includes(page._id)) {
        this.paintImg(ctx, page);
      }
    });
  }

  mouseUp = (e: MouseEvent) => {
    const { event } = this.props;
    document.removeEventListener('mousemove', this.mouseMove);
    document.removeEventListener('mouseup', this.mouseUp);
    event && event.mouseUp && event.mouseUp(e, {});
  }

  mouseMove = (e: MouseEvent) => {
    const { event } = this.props;
    event && event.mouseMove && event.mouseMove(e, {});
  }

  mouseDown = (e: React.MouseEvent) => {
    const { event } = this.props;
    document.addEventListener('mousemove', this.mouseMove);
    document.addEventListener('mouseup', this.mouseUp);
    event && event.mouseDown && event.mouseDown(e, {});
  }

  render() {
    return (
      <div className="canvas-export-container">
        <canvas ref={this.backgroundCanvas}/>
        <canvas ref={this.forwardCanvas} onMouseDown={this.mouseDown}/>
      </div>
    );
  }
}

export default CanvasContainer;
