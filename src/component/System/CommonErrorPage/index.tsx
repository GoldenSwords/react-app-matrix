import {connect} from 'react-redux';
import * as React from 'react';

import Actions from 'src/Actions';

import { RootState } from 'src/model';

import './index.scss';
interface IProps {
  message: Error;
  error(error?: Error): void;
}
interface IStates {
  message?: Error;
}

class CommonErrorBox extends React.Component<IProps, IStates> {
  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  setClear = () => {
    setTimeout(() => {
      const { error } = this.props;
      error();
      this.setState({
        message: null
      })
    }, 1000)
  }

  componentDidUpdate(preProps: IProps){
    const { message } = this.props;
    if (message !== preProps.message && message) {
      this.setState({
        message
      }, this.setClear);
    }
  }

  render() {
    const { message } = this.state;
    if (!message) {
      return null;
    }
    return <div className="common-error-message-box">{ message.message }</div>;
  }
}

const mapStateToProps = (state: RootState, ownProps: any) => ({
  message: state.common.message
});
const mapDispatchToProps = (dispatch: Function,ownProps: any) => ({
  error: (error: Error) => {
    dispatch(Actions.Common.setError(error));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CommonErrorBox);