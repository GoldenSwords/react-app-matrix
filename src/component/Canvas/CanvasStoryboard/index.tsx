import { ImageLoader } from '@/helper';
import * as React from 'react';
import {connect} from 'react-redux';
import Actions from 'src/Actions';
import { RootState } from 'src/model';
import { IImg } from 'src/model/canvas';
import CanvasContainer, { IOpt } from './Container';
import './index.scss';
interface ICanvasProps {
  pages: string[];
  count: number;
  errorMessage(error: Error): void;
}
interface ICanvasStates {
  pages: string[];
  sourcePages: IImg[];
  scale: number;
  loading: boolean;
  hoverLayer: string;
  selectLayers: string[];
  event: {
    mouseDown(e: React.MouseEvent, opt: IOpt): void;
    mouseMove(e: MouseEvent, opt: IOpt): void;
    mouseUp(e: MouseEvent, opt: IOpt): void;
  }
}

class CanvasStoryboard extends React.Component<ICanvasProps, ICanvasStates> {
  canvasRef: React.RefObject<HTMLCanvasElement> = React.createRef();

  constructor(props: ICanvasProps) {
    super(props);
    this.state = {
      pages: [],
      sourcePages: [],
      scale: 0.1,
      loading: false,
      hoverLayer: '',
      selectLayers: [],
      event: {
        mouseDown:(e, opt) => {
          this.setState({
            hoverLayer: this.checkHoverLayer(opt, e.clientX, e.clientY)
          })
        },
        mouseMove:(e, opt) => {
          this.setState({
            hoverLayer: this.checkHoverLayer(opt, e.clientX, e.clientY)
          })
        },
        mouseUp:(e, opt) => {
          this.setState({
            hoverLayer: ''
          })
        },
      }
    }
  }

  checkHoverLayer = (opt: IOpt, x: number, y: number): string => {
    const { sourcePages, scale } = this.state;
    let resPage: IImg = null;
    sourcePages.slice().reverse().some((page) => {
      if(!this.outPage(x, y, page.position.x, page.position.y, page.width * scale, page.height * scale)){
        resPage = page;
        return true;
      }
      return false;
    });
    return resPage?._id;
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

  componentDidMount() {
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
              position: {x: Math.round(Math.random() * 400), y: Math.round(Math.random() * 400) },
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

  render() {
    const { sourcePages, event, scale, hoverLayer } = this.state;
    return (
      <div className="canvas-storyboard">
        <CanvasContainer pages={sourcePages} hoverPage={hoverLayer} event={event} scale={scale}/>
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
