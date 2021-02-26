import { ImageLoader } from '@helper';
import * as React from 'react';
import {connect} from 'react-redux';
import Actions from 'src/Actions';
import { RootState } from '@models';
import './index.scss';
interface ICanvasProps {
  zoom: number;
  max?: number;
  min?: number;
  onZoom?(zoom: number): void;
}
interface ICanvasStates {
}

class CanvasStoryboard extends React.Component<ICanvasProps, ICanvasStates> {
  static defaultProps = {
    max: 500,
    min: 10,
    onZoom: () => {},
  }
  zoomStep: number = 10;
  componentDidMount() {
    addEventListener('wheel', this.onScale, {
      passive: false
    });
  }

  componentWillUnmount() {
    removeEventListener('wheel', this.onScale);
  }

  onScale = (e: WheelEvent) => {
    e.preventDefault();
    const { zoom, min, max, onZoom } = this.props;
    e.deltaY > 0 && onZoom(zoom - this.zoomStep < min ? min : zoom - this.zoomStep);
    e.deltaY < 0 && onZoom(zoom + this.zoomStep > max ? max : zoom + this.zoomStep);
  }

  render() {
    const { zoom, onZoom } = this.props;
    return (
      <div className="scale-root">
        <div className="scale-root-content">
          <div className="subtraction circle">+</div>
          <input value={Math.round(zoom)} onChange={e => !isNaN(Number(e.target.value)) && onZoom(Number(e.target.value))}/>
          <div className="add circle">-</div>
        </div>
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
