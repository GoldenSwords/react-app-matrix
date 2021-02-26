import { ImageLoader } from '@/helper';
import * as React from 'react';
import {connect} from 'react-redux';
import Actions from 'src/Actions';
import { RootState } from '@models';
import './index.scss';
interface IProps {
  counter: number;
  load: number;
  applyConfig(count: number): void;
}
interface IStates {
  count: number;
}

class ImageCounter extends React.Component<IProps, IStates> {

  state = {
    count: 1,
    counter: 0,
  }

  onApplyConfig = () => {
    const { applyConfig } = this.props;
    const { count } = this.state;
    applyConfig(count);
  }

  render() {
    const { counter, load } = this.props;
    const { count } = this.state;
    return (
      <div className="counter-root">
        <input value={count} onKeyDown={e => {
          if (e.key.toLowerCase() === 'enter') {
            this.onApplyConfig();
          }
        }} onChange={(e) => {
          this.setState({
            count: Number(e.target.value)
          })
        }}/>
        <span>总数: { counter }</span>
        <button onClick={this.onApplyConfig}>应 用</button>
        <div className="counter-loading-bar" style={{
          width: `${(load / counter) * 100}%`
        }}></div>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState, ownProps: any) => ({
  counter: state.temp.pages.length * state.temp.count
});

const mapDispatchToProps = (dispatch: Function,ownProps: any) => ({
  applyConfig: (count: number) => {
    dispatch(Actions.Temp.setConfig(count));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ImageCounter);
