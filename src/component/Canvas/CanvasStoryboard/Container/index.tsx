import { scale2d } from '@helper/MatrixHelper';
import * as React from 'react';
import { ICanvasEvent, IImg } from 'src/models/canvas';
import './index.scss';


interface ICanvasProps {
  pages: IImg[];
  offset: {
    x: number;
    y: number;
  };
  spaceMode: boolean;
  scale: number;
  selectedPages: string[];
  hoverPage: string;
  center: {
    x: number;
    y: number;
  };
  event?: ICanvasEvent;
}
interface ICanvasStates {
  tempW: number;
  tempH: number;
  rootW: number;
  rootH: number;
  rootScale: number;
  offsetW: number;
  offsetH: number;
}

class CanvasContainer extends React.Component<ICanvasProps, ICanvasStates> {
  positionStr?: string;
  offscreenCanvasForward: OffscreenCanvas;
  offscreenCanvasBackground: OffscreenCanvas;
  offscreenCanvasForwardCtx: OffscreenCanvasRenderingContext2D;
  offscreenCanvasBackgroundCtx: OffscreenCanvasRenderingContext2D;
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

  static defaultProps: ICanvasProps = {
    pages: [],
    spaceMode: false,
    scale: 1,
    selectedPages: [],
    hoverPage: '',
    offset: { x:0 , y: 0 },
    center: { x:0 , y: 0 },
  };

  constructor(props: ICanvasProps) {
    super(props);
    this.state = {
      rootScale: 1,
      rootW: 0,
      rootH: 0,
      tempW: 0,
      tempH: 0,
      offsetW: 0,
      offsetH: 0,
    };
  }

  componentDidMount() {
    this.onMount();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('keydown', this.keydown);
    window.removeEventListener('keyup', this.keyup);
  }


  onMount = () => {
    const { scale } = this.props;
    const { width, height } = this.backgroundCanvas.current.getBoundingClientRect();
    this.offscreenCanvasForward = new OffscreenCanvas(width, height);
    this.offscreenCanvasBackground = new OffscreenCanvas(width, height);
    this.forwardCanvas.current.width = this.backgroundCanvas.current.width = width;
    this.forwardCanvas.current.height = this.backgroundCanvas.current.height = height;
    this.forwardCtx = this.forwardCanvas.current.getContext('2d');
    this.backgroundCtx = this.backgroundCanvas.current.getContext('2d');
    this.offscreenCanvasForwardCtx = this.offscreenCanvasForward.getContext('2d');
    this.offscreenCanvasBackgroundCtx = this.offscreenCanvasBackground.getContext('2d');
    window.addEventListener('resize', this.onResize);
    window.addEventListener('keydown', this.keydown);
    window.addEventListener('keyup', this.keyup);
    this.setState({
      rootScale: scale,
      tempH: height,
      tempW: width,
      rootW: width,
      rootH: height,
      offsetH: 0,
      offsetW: 0,
    });
    this.paintForward();
    this.paintBackground();

  }

  // 100 1 0.9 90
  translate = (ctx: CanvasRenderingContext2D) => {
    const { scale } = this.props;
    const { rootW, rootH, offsetW, offsetH } = this.state;
    ctx.save();
    const left = (offsetW / rootW) * (rootW * scale) - offsetW;
    const top = (offsetH / rootH) * (rootH * scale) - offsetH;
    ctx.translate(left, top);
  }

  onResize = () => {
    this.onMount();
  }

  onRestoreAll = () => {
    this.onRestore(this.forwardCtx);
    this.onRestore(this.backgroundCtx);
  }

  onRestore = (ctx: CanvasRenderingContext2D) => {
    ctx.restore();
  }

  componentDidUpdate(preProps: ICanvasProps, preStates: ICanvasStates) {
    const { rootW, rootH, rootScale } = this.state;
    const { selectedPages, hoverPage, scale, pages, offset } = this.props;
    this.paintForward();
    if (hoverPage !== preProps.hoverPage
      || selectedPages !== preProps.selectedPages
      || pages !== preProps.pages
      || scale !== preProps.scale) {
      this.setState({
        tempH: rootH / rootScale * scale,
        tempW: rootW / rootScale * scale,
      }, () => {
        this.paintBackground();
      });
    }
  }

  resetStyle = (ctx: CanvasRenderingContext2D) => {
    ctx.strokeStyle = this.ctxStyle.resetStyle;
    ctx.lineWidth = this.ctxStyle.resetSize;
  }

  paintImg = (ctx: CanvasRenderingContext2D, page: IImg) => {
    const { scale } = this.props;
    const { position, scaleOffset, offset, source, width, height } = page;
    source && ctx.drawImage(
      source, 0, 0, width, height, 
      position.x + (offset ? offset.x : 0) + (scaleOffset ? scaleOffset.x : 0), 
      position.y + (offset ? offset.y : 0) + (scaleOffset ? scaleOffset.y : 0), 
      width * scale, height * scale);
  }

  paintBorder = (ctx: CanvasRenderingContext2D, page: IImg) => {
    const { position, scaleOffset, offset, source, width, height } = page;
    const { scale } = this.props;
    if (source) {
      ctx.beginPath();
      ctx.rect(
        position.x + (offset ? offset.x : 0) + (scaleOffset ? scaleOffset.x : 0), 
        position.y + (offset ? offset.y : 0) + (scaleOffset ? scaleOffset.y : 0), 
        width * scale, height * scale);
      ctx.strokeStyle = this.ctxStyle.strokeStyle;
      ctx.lineWidth = this.ctxStyle.strokeSize;
      ctx.stroke();
    }
  }

  paintForward = () => {
    const { pages, hoverPage, selectedPages } = this.props;
    const ctx = this.forwardCtx;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    let hover;
    pages.forEach((page: IImg) => {
      if (page && selectedPages.includes(page._id)) {
        this.paintImg(ctx, page);
        this.paintBorder(ctx, page);
      }
      if (page && page._id === hoverPage) {
        hover = page;
      }
    });
    if (hover) {
      this.paintImg(ctx, hover);
      this.paintBorder(ctx, hover);
    }

  }
  
  paintBackground = () => {
    const { pages, hoverPage, selectedPages } = this.props;
    const ctx = this.backgroundCtx;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    pages.forEach((page: IImg) => {
      if (page && page._id !== hoverPage && !selectedPages.includes(page._id)) {
        this.paintImg(ctx, page);
      }
    });

  }

  mouseUp = (e: React.MouseEvent) => {
    const { event } = this.props;
    event && event.mouseUp && event.mouseUp(e, {
      dom: this.forwardCanvas
    });
  }

  mouseMove = (e: React.MouseEvent) => {
    const { event } = this.props;
    if (!this.positionStr) {
      this.positionStr = `${e.clientX}-${e.clientY}`;
    } else if (this.positionStr !== `${e.clientX}-${e.clientY}`) {
      this.positionStr = `${e.clientX}-${e.clientY}`;
      event && event.mouseMove && event.mouseMove(e, {
        dom: this.forwardCanvas
      });
    }
  }

  mouseDown = (e: React.MouseEvent) => {
    const { event } = this.props;
    event && event.mouseDown && event.mouseDown(e, {
      dom: this.forwardCanvas
    });
  }

  keydown = (e: KeyboardEvent) => {
    const { event } = this.props;
    event && event.keyDown && event.keyDown(e, {
      dom: this.forwardCanvas
    });
  }

  keyup = (e: KeyboardEvent) => {
    const { event } = this.props;
    event && event.keyUp && event.keyUp(e, {
      dom: this.forwardCanvas
    });
  }

  render() {
    return (
      <div className="canvas-export-container">
        <canvas ref={this.backgroundCanvas}/>
        <canvas ref={this.forwardCanvas} 
          onMouseDown={this.mouseDown}
          onMouseMove={this.mouseMove}
          onMouseUp={this.mouseUp}
        />
      </div>
    );
  }
}

export default CanvasContainer;
