import { scale2d } from '@helper/MatrixHelper';
import * as React from 'react';
import { IImg } from 'src/model/canvas';
import './index.scss';

export interface IOpt {
  dom: React.RefObject<HTMLCanvasElement>;
}
interface ICanvasProps {
  pages: IImg[];
  scale: number;
  selectedPages: string[];
  hoverPage: string;
  center: {
    x: number;
    y: number;
  };
  event?: {
    mouseDown?(e: React.MouseEvent, opt: IOpt): void;
    mouseMove?(e: MouseEvent, opt: IOpt): void;
    mouseUp?(e: MouseEvent, opt: IOpt): void;
  }
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
    scale: 1,
    selectedPages: [],
    hoverPage: '',
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
  }


  onMount = () => {
    const { scale } = this.props;
    const { width, height } = this.backgroundCanvas.current.getBoundingClientRect();
    this.offscreenCanvasForward = new OffscreenCanvas(width, height);
    this.offscreenCanvasBackground = new OffscreenCanvas(width, height);
    this.forwardCanvas.current.width = this.backgroundCanvas.current.width = width * scale;
    this.forwardCanvas.current.height = this.backgroundCanvas.current.height = height * scale;
    this.forwardCtx = this.forwardCanvas.current.getContext('2d');
    this.backgroundCtx = this.backgroundCanvas.current.getContext('2d');
    this.offscreenCanvasForwardCtx = this.offscreenCanvasForward.getContext('2d');
    this.offscreenCanvasBackgroundCtx = this.offscreenCanvasBackground.getContext('2d');
    window.addEventListener('resize', this.onResize);
    this.setState({
      rootScale: scale,
      tempH: height * scale,
      tempW: width * scale,
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

  onScaleAll = () => {
    this.onScale(this.forwardCanvas.current, this.forwardCtx);
    this.onScale(this.backgroundCanvas.current, this.backgroundCtx);
  }

  onRestore = (ctx: CanvasRenderingContext2D) => {
    ctx.restore();
  }

  onScale = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    const { scale } = this.props;
    const { rootW, rootH } = this.state;
    canvas.width = this.backgroundCanvas.current.width = rootW * scale;
    canvas.height = this.backgroundCanvas.current.height = rootH * scale;
    this.translate(ctx);
  }

  componentDidUpdate(preProps: ICanvasProps, preStates: ICanvasStates) {
    const { rootW, rootH, rootScale } = this.state;
    const { selectedPages, hoverPage, scale, pages } = this.props;

    if (scale !== preProps.scale) {
      this.setState({
        offsetH: (window.event as WheelEvent).clientY,
        offsetW: (window.event as WheelEvent).clientX,
      })
    }

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

  translateCanvas = (ctx: CanvasRenderingContext2D, cb?: Function) => {
    // ctx.restore();
    // ctx.save();
    // ctx.translate();
    // ctx.restore();
  }

  resetStyle = (ctx: CanvasRenderingContext2D) => {
    ctx.strokeStyle = this.ctxStyle.resetStyle;
    ctx.lineWidth = this.ctxStyle.resetSize;
  }

  paintImg = (ctx: CanvasRenderingContext2D, page: IImg) => {
    const { position, source, width, height } = page;
    const { scale } = this.props;
    if (source) {
      this.translateCanvas(ctx);
      // ctx.drawImage(source, 0, 0, width, height, page.position.x, page.position.y, width * scale, height * scale );
      ctx.drawImage(source, 0, 0, width, height, page.position.x, page.position.y, width, height);
    }
  }

  paintBorder = (ctx: CanvasRenderingContext2D, page: IImg) => {
    const { position, source, width, height } = page;
    const { scale } = this.props;
    if (source) {
      ctx.beginPath();
      // ctx.rect(position.x, position.y, width * scale, height * scale );
      ctx.rect(position.x, position.y, width, height);
      ctx.strokeStyle = this.ctxStyle.strokeStyle;
      ctx.lineWidth = this.ctxStyle.strokeSize;
      ctx.stroke();
    }
  }

  paintForward = () => {
    const { pages, hoverPage, selectedPages } = this.props;
    const ctx = this.forwardCtx;
    this.onScale(this.forwardCanvas.current, ctx);

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    pages.forEach((page: IImg) => {
      if (page && selectedPages.includes(page._id)) {
        this.paintImg(ctx, page);
        this.paintBorder(ctx, page);
      }
    });
    pages.forEach((page: IImg) => {
      if (page && page._id === hoverPage) {
        this.paintImg(ctx, page);
        this.paintBorder(ctx, page);
      }
    });

    this.onRestore(ctx);
  }
  
  paintBackground = () => {
    const { pages, hoverPage, selectedPages } = this.props;
    const ctx = this.backgroundCtx;
    this.onScale(this.backgroundCanvas.current, ctx);

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    pages.forEach((page: IImg) => {
      if (page && page._id !== hoverPage && !selectedPages.includes(page._id)) {
        this.paintImg(ctx, page);
      }
    });

    this.onRestore(ctx);
  }

  mouseUp = (e: MouseEvent) => {
    const { event } = this.props;
    document.removeEventListener('mousemove', this.mouseMove);
    document.removeEventListener('mouseup', this.mouseUp);
    event && event.mouseUp && event.mouseUp(e, {
      dom: this.forwardCanvas
    });
  }

  mouseMove = (e: MouseEvent) => {
    const { event } = this.props;
    event && event.mouseMove && event.mouseMove(e, {
      dom: this.forwardCanvas
    });
  }

  mouseDown = (e: React.MouseEvent) => {
    const { event } = this.props;
    document.addEventListener('mousemove', this.mouseMove);
    document.addEventListener('mouseup', this.mouseUp);
    event && event.mouseDown && event.mouseDown(e, {
      dom: this.forwardCanvas
    });
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
