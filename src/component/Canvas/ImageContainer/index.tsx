import { ImageLoader } from '@/helper';
import * as React from 'react';
import {connect} from 'react-redux';
import Actions from 'src/Actions';
import { RootState } from 'src/model';
import ImageDom from './ImageDom';
import './index.scss';
interface ICanvasProps {
  pages: string[];
  count: number;
  errorMessage(error: Error): void;
}
interface ICanvasStates {
  pages: string[];
}

class ImageContainer extends React.Component<ICanvasProps, ICanvasStates> {
  canvasRef: React.RefObject<HTMLCanvasElement> = React.createRef();

  constructor(props: ICanvasProps) {
    super(props);
    this.state = {
      pages: this.initPage(props.pages.length, props.count)
    }
  }
  initPage = (number: number, round: number) => {
    const imageArr: string[] = [];
    const suffix = '.jpg';
    const add = () => {
      (new Array(number).fill(0)).map((_: number, index: number) => {
        this.props.pages.forEach((img: string) => {
          imageArr.push(`imgs/${img}${index === 0 ? '' : ' (' + (index + 1) + ')'}${suffix}`);
        });
      });
    }
    (new Array(round).fill(0)).map(() => {
      add();
    })
    return imageArr;
  }
  
  componentDidMount() {
  }

  render() {
    const { pages } = this.state;
    return (
      <div className="canvas-storyboard">
        {
          pages.map((page, index) => <ImageDom key={index} page={page}/>)
        }
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

export default connect(mapStateToProps, mapDispatchToProps)(ImageContainer);
