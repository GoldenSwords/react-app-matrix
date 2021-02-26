import { cloneDeep } from 'lodash';
import * as React from 'react';
import {connect} from 'react-redux';
import { ImageLoader } from '@helper';
import Actions from 'src/Actions';
import { RootState } from '@models';
import { ICanvasEvent, IImg } from 'src/models/canvas';
import CanvasContainer, { IOpt } from './Container';
import './index.scss';
import Scaler from './Scaler';
import ImageCounter from './ImageCounter';
interface ICanvasProps {
  pages: string[];
  count: number;
  zoom: number;
  errorMessage(error: Error): void;
  onZoom(zoom: number): void;
}
interface ICanvasStates {
  pages: string[];
  sourcePages: IImg[];
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
  boxOffset: {
    x: number;
    y: number;
  };
  selectedPages: string[];
  event: ICanvasEvent;
  spaceMode: boolean;
}

class CanvasStoryboard extends React.Component<ICanvasProps, ICanvasStates> {
  canvasRef: React.RefObject<HTMLCanvasElement> = React.createRef();
  scaleStep: number = 0.1;
  scaleMin: number = 0.1;
  scaleMax: number = 5;
  loadNumber: number = 0;
  moving: boolean = false;
  constructor(props: ICanvasProps) {
    super(props);
    this.state = {
      boxOffset: { x: 0, y: 0 },
      spaceMode: false,
      pages: [],
      sourcePages: [],
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
          const { spaceMode } = this.state;
          if (spaceMode) {
            this.moving = false;
            this.setState({
              movePosition: {
                x: e.clientX,
                y: e.clientY,
              },
              tempPosition: {
                x: e.clientX,
                y: e.clientY,
              },
            });
            return;
          }
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
          });
        },
        mouseMove:(e, opt) => {
          const { spaceMode, tempPosition } = this.state;
          this.setState({
              movePosition: {
                x: e.clientX,
                y: e.clientY,
              },
            });
          if (spaceMode) {
            this.setState({
              // movePosition: {
              //   x: e.clientX,
              //   y: e.clientY,
              // },
              boxOffset: {
                x: e.clientX - tempPosition.x,
                y: e.clientY - tempPosition.y
              }
            });
            return;
          }
          if (!this.moving) {
            // this.setState({
            //   movePosition: {
            //     x: e.clientX,
            //     y: e.clientY,
            //   },
            // });
            const hoverLayer = this.checkHoverLayer(opt, e.clientX, e.clientY);
            hoverLayer && this.setState({ hoverLayer: hoverLayer._id });
            !hoverLayer && this.setState({ hoverLayer: '' });
          }
        },
        mouseUp:(e, opt) => {
          const { hoverLayer: hoverPage } = this.state;
          hoverPage && this.savePagePosition(hoverPage);
          this.moving = false;
        },
        keyDown: (e, opt) => {
          if (e.code.toLowerCase() === 'space') {
            this.setState({
              spaceMode: true,
            });
          }
        },
        keyUp: (e, opt) => {
          if (e.code.toLowerCase() === 'space') {
            this.setState({
              spaceMode: false,
            });
          }
        }
      }
    }
  }

  componentDidMount() {
    this.loadData();
  }
  
  // 加载页面
  initPage = (number: number, round: number) => {
    const imageArr: string[] = [];
    // const suffix = '.jpg';
    const suffix = '.png';
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

  loadData = () => {
    const { pages, zoom, count, errorMessage } = this.props;
    this.setState({
      loading: true,
    }, () => {
      ImageLoader.loader(this.initPage(pages.length, count), () => this.loadNumber += 1)
      .then((res: HTMLImageElement[]) => {
        this.setState({
          loading: false,
          sourcePages: res.map((img, index) => {
            return {
              position: index === 0 ? {x: 100, y: 100 } : { x: window.innerWidth * Math.random(), y: window.innerHeight * Math.random() + 40 },
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

  scalePageContainer = () => {
    const { zoom } = this.props;
    const { sourcePages, movePosition } = this.state;
    const scalePages = sourcePages.map(page => {
      const { position } = page;
      const scale = zoom / 100;
      page.scaleOffset = {
        x: (position.x - movePosition.x) * scale - (position.x - movePosition.x),
        y: (position.y - movePosition.y) * scale - (position.y - movePosition.y),
      }
      return page;
    });
    this.setState({
      sourcePages: scalePages,
    });
  }

  componentDidUpdate(preProps: ICanvasProps, preState: ICanvasStates) {
    const { count, zoom } = this.props;
    const { movePosition, tempPosition, hoverLayer, sourcePages } = this.state;
    if (movePosition !== preState.movePosition && this.moving) {
      // 移动设计稿
      const findPage = sourcePages.find(page => page._id === hoverLayer);
      if (findPage) {
        findPage.offset = {
          x: movePosition.x - tempPosition.x,
          y: movePosition.y - tempPosition.y,
        }
        this.setState({
          sourcePages,
        });
      }
    } else if (zoom !== preProps.zoom) {
      // 鼠标点缩放
      this.scalePageContainer();
    }

    if (count !== preProps.count) {
      this.loadData();
    }
  }


  savePagePosition = (hoverLayer: string) => {
    const { movePosition, tempPosition, sourcePages } = this.state;
    const findPage = sourcePages.find(page => page._id === hoverLayer);
    if (findPage) {
      const { offset, position } = findPage;
      if (offset) {
        findPage.position = {
          x: position.x + findPage.offset.x,
          y: position.y + findPage.offset.y,
        }
        findPage.offset = {
          x: 0,
          y: 0,
        }
      }
      this.setState({
        sourcePages,
      })
    }
  }

  // 悬浮图层
  checkHoverLayer = (opt: IOpt, x: number, y: number): IImg | null => {
    const { zoom } = this.props;
    const { sourcePages } = this.state;
    let resPage: IImg = null;
    const scale = zoom / 100;
    sourcePages.slice().reverse().some((page) => {
      if(!this.outPage(x, y, page.position.x, page.position.y, page.width * scale, page.height * scale)){
        resPage = page;
        return true;
      }
      return false;
    });
    return resPage;
  }

  // 计算位置
  outPage = ( x: number, y: number, rectX: number, rectY: number, rectW: number, rectH: number): boolean => {
    const bool = (x < rectX) || (y < rectY) || (x >= rectX + rectW) || (y >= rectY + rectH);
    return bool;
  }

  onZoom = (zoom: number) => {
    const { onZoom } = this.props;
    if (!this.moving) {
      onZoom(zoom);
    }
  }

  render() {
    const { zoom } = this.props;
    const { sourcePages, event, hoverLayer, mousePoint, selectedPages, spaceMode, boxOffset } = this.state;
    return (
      <div className="canvas-storyboard">
        <Scaler zoom={zoom} onZoom={this.onZoom}/>
        <ImageCounter load={this.loadNumber}/>
        <CanvasContainer pages={sourcePages} offset={boxOffset} spaceMode={spaceMode} hoverPage={hoverLayer} selectedPages={selectedPages} event={event} scale={zoom / 100} center={mousePoint}/>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState, ownProps: any) => ({
  message: state.common.message,
  pages: state.temp.pages,
  count: state.temp.count,
  zoom: state.zoom.zoom,
});

const mapDispatchToProps = (dispatch: Function,ownProps: any) => ({
  errorMessage: (error: Error) => {
    dispatch(Actions.Common.setError(error));
  },
  onZoom:(zoom: number) => {
    dispatch(Actions.Zoom.onZoom(zoom));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CanvasStoryboard);
