import { ImageLoader } from '@/helper';
import * as React from 'react';
import {connect} from 'react-redux';
import Actions from 'src/Actions';
import { RootState } from 'src/model';
import { IImg } from 'src/model/canvas';
import CanvasContainer from './Container';
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
    mouseDown(e: React.MouseEvent, opt: any): void;
    mouseMove(e: MouseEvent, opt: any): void;
    mouseUp(e: MouseEvent, opt: any): void;
  }
}

class CanvasStoryboard extends React.Component<ICanvasProps, ICanvasStates> {
  canvasRef: React.RefObject<HTMLCanvasElement> = React.createRef();

  constructor(props: ICanvasProps) {
    super(props);
    this.state = {
      pages: [],
      sourcePages: [],
      scale: 1,
      loading: false,
      hoverLayer: '',
      selectLayers: [],
      event: {
        mouseDown:(e, opt) => {},
        mouseMove:(e, opt) => {},
        mouseUp:(e, opt) => {},
      }
    }
  }
  
  initPage = (number: number, round: number) => {
    const imageArr: string[] = [];
    const suffix = '.jpg';
    const add = () => {
      (new Array(number).fill(0)).map((_: number, index: number) => {
        this.props.pages.forEach((img: string) => {
          imageArr.push(`http://localhost:8080/imgs/${img}${index === 0 ? '' : ' (' + (index + 1) + ')'}${suffix}`);
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
              position: {x: 0, y: 0 },
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
    const { sourcePages, event } = this.state;
    return (
      <div className="canvas-storyboard">
        <CanvasContainer pages={sourcePages} event={event}/>
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
