import { ImageLoader } from '@/helper';
import * as React from 'react';
import {connect} from 'react-redux';
import Actions from 'src/Actions';
import { RootState } from '@models';
import './index.scss';
interface ICanvasProps {
  page: string;
}
interface ICanvasStates {
  position: {
    x: number;
    y: number;
  }
}

class ImageDom extends React.Component<ICanvasProps, ICanvasStates> {
  constructor(props: ICanvasProps) {
    super(props);
    this.state = {
      position: {
        x: 0,
        y: 0,
      }
    }
  }

  onMouseup = (e: MouseEvent) => {
    document.removeEventListener('mousemove', this.onMousemove);
    document.removeEventListener('mouseup', this.onMouseup);
  }
  onMousemove = (e: MouseEvent) => {}

  mousedown = (e: React.MouseEvent) => {
    document.addEventListener('mousemove', this.onMousemove);
    document.addEventListener('mouseup', this.onMouseup);
  }

  render() {
    const { page } = this.props;
    return (
      <div className="img-box" onMouseDown={this.mousedown}><img src={page}/></div>
    );
  }
}

export default ImageDom;
