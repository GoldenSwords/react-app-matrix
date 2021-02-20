import { ImageLoader } from '@/helper';
import * as React from 'react';
import { cloneDeep } from 'lodash';
import {connect} from 'react-redux';
import Actions from 'src/Actions';
import { RootState } from 'src/model';
import { IImg } from 'src/model/canvas';
import CanvasContainer, { IOpt } from './Container';
import './index.scss';
import Scaler from './Scaler';
import ImageCounter from './ImageCounter';
interface ICanvasProps {
  pages: string[];
  count: number;
  errorMessage(error: Error): void;
}
interface ICanvasStates {
  pages: string[];
  sourcePages: IImg[];
  catchPage?: IImg;
  scale: number;
  loading: boolean;
  hoverLayer: string;
  selectLayers: string[];
  tempPosition: {
    x: number;
    y: number;
  },
  movePosition: {
    x: number;
    y: number;
  },
  mousePoint: {
    x: number;
    y: number;
  };
  selectedPages: string[];
  event: {
    mouseDown(e: React.MouseEvent, opt: IOpt): void;
    mouseMove(e: MouseEvent, opt: IOpt): void;
    mouseUp(e: MouseEvent, opt: IOpt): void;
  }
}

class CanvasStoryboard extends React.Component<ICanvasProps, ICanvasStates> {
  canvasRef: React.RefObject<HTMLCanvasElement> = React.createRef();
  scaleStep: number = 0.1;
  scaleMin: number = 0.1;
  scaleMax: number = 5;
  moving: boolean = false;
  constructor(props: ICanvasProps) {
    super(props);
    this.state = {
      pages: [],
      sourcePages: [],
      scale: 1,
      loading: false,
      hoverLayer: '',
      selectedPages: [],
      selectLayers: [],
      movePosition: {
        x: 0,
        y: 0,
      },
      tempPosition: {
        x: 0,
        y: 0,
      },
      mousePoint: {
        x: 0,
        y: 0,
      },
      event: {
        mouseDown:(e, opt) => {
          this.moving = true;
          const hoverLayer = this.checkHoverLayer(opt, e.clientX, e.clientY);
          this.setState({
            hoverLayer: hoverLayer?._id,
            movePosition: {
              x: e.clientX,
              y: e.clientY,
            },
            tempPosition: {
              x: e.clientX,
              y: e.clientY,
            },
            catchPage: cloneDeep(hoverLayer),
          })
        },
        mouseMove:(e, opt) => {
          if (this.moving) {
            this.setState({
              movePosition: {
                x: e.clientX,
                y: e.clientY,
              },
            });
          }
          // this.setState({
          //   hoverLayer: this.checkHoverLayer(opt, e.clientX, e.clientY)
          // })
        },
        mouseUp:(e, opt) => {
          const { selectedPages } = this.state;
          this.moving = false;
          const hoverLayer = this.checkHoverLayer(opt, e.clientX, e.clientY);
          if (hoverLayer && !selectedPages.includes(hoverLayer._id)) {
            this.setState({
              selectedPages: [...selectedPages, hoverLayer._id],
            }) 
          } else if (!hoverLayer) {
            this.setState({
              selectedPages: [],
            }) 
          }
          this.setState({
            hoverLayer: ''
          })
        },
      }
    }
  }

  componentDidMount() {
    addEventListener('wheel', this.onScale, {
      passive: false
    });
    this.loadData();
  }

  loadData = () => {
    const { pages, count, errorMessage } = this.props;
    const { scale } = this.state;
    this.setState({
      loading: true,
    }, () => {
      ImageLoader.loader(this.initPage(pages.length, count))
      .then((res: HTMLImageElement[]) => {
        this.setState({
          loading: false,
          sourcePages: res.map((img, index) => {
            return {
              scale,
              // position: {x: Math.round(Math.random() * 400), y: Math.round(Math.random() * 400) },
              position: {x: 100, y: 100 },
              source: img,
              width: img.width,
              height: img.height,
              _id: `_${index}`,
            };
          }),
        });
      })
      .catch((error: Error) => {
        this.setState({
          loading: false,
        }, () => {
          errorMessage(error);
        });
      });
    });
  }

  componentDidUpdate(preProps: ICanvasProps, preState: ICanvasStates) {
    const { count } = this.props;
    const { scale, movePosition, tempPosition, hoverLayer, sourcePages, catchPage } = this.state;
    // 移动设计稿
    if (movePosition !== preState.movePosition && hoverLayer) {
      const findPage = sourcePages.find(page => page._id === hoverLayer);
      if (findPage && catchPage) {
        findPage.position = {
          x: catchPage.position.x + movePosition.x - tempPosition.x,
          y: catchPage.position.y + movePosition.y - tempPosition.y,
        }
      }
    }

    if (count !== preProps.count) {
      this.loadData();
    }
  }

  checkHoverLayer = (opt: IOpt, x: number, y: number): IImg | null => {
    const { sourcePages, scale } = this.state;
    let resPage: IImg = null;
    sourcePages.slice().reverse().some((page) => {
      if(!this.outPage(x, y, page.position.x, page.position.y, page.width * scale, page.height * scale)){
        resPage = page;
        return true;
      }
      return false;
    });
    return resPage;
  }

  outPage = ( x: number, y: number, rectX: number, rectY: number, rectW: number, rectH: number): boolean => {
    const bool = (x < rectX) || (y < rectY) || (x >= rectX + rectW) || (y >= rectY + rectH);
    return bool;
  }
  
  initPage = (number: number, round: number) => {
    const imageArr: string[] = [];
    const suffix = '.jpg';
    const add = () => {
      (new Array(number).fill(0)).map((_: number, index: number) => {
        this.props.pages.forEach((img: string) => {
          imageArr.push(`http://localhost:8080/imgs/${img}${suffix}`);
        });
      });
    }
    (new Array(round).fill(0)).map(() => {
      add();
    })
    return imageArr;
  }

  getMousePosition = () => {
    const event = window.event as MouseEvent;
    return {
      x: event.pageX,
      y: event.pageY,
    }
  }

  onScale = (e: WheelEvent) => {
    const { scale } = this.state;
    e.preventDefault();
    if (e.deltaY > 0) {
      this.setState({
        scale: scale - this.scaleStep < this.scaleMin ? this.scaleMin : scale - this.scaleStep,
        mousePoint: this.getMousePosition(),
      });
    } else {
      this.setState({
        scale: scale + this.scaleStep > this.scaleMax ? this.scaleMax : scale + this.scaleStep,
        mousePoint: this.getMousePosition(),
      });
    }
  }

  render() {
    const { sourcePages, event, scale, hoverLayer, mousePoint, selectedPages } = this.state;
    return (
      <div className="canvas-storyboard">
        <Scaler zoom={ (1 / scale) * 100}/>
        <ImageCounter />
        <CanvasContainer pages={sourcePages} hoverPage={hoverLayer} selectedPages={selectedPages} event={event} scale={scale} center={mousePoint}/>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState, ownProps: any) => ({
  message: state.common.message,
  pages: state.temp.pages,
  count: state.temp.count,
});

const mapDispatchToProps = (dispatch: Function,ownProps: any) => ({
  errorMessage: (error: Error) => {
    dispatch(Actions.Common.setError(error));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CanvasStoryboard);
