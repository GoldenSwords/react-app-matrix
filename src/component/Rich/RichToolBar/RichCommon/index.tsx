import * as React from 'react';
import { I_TOOL_BAR, I_TRIGGER_TYPE } from 'src/model/rich';
import { RichHelper } from 'src/helper';
import './index.scss';
import RichProvider from '../../RichProvider';
interface IProps {
  content: string;
  onClick(e: React.MouseEvent): void;
}
interface IStates {
}

class RichCommon extends React.Component<IProps, IStates> {
  static defaultProps = {
  };

  render() {
    const { content, onClick } = this.props;
    return (
      <button onClick={onClick}>{content}</button>
    );
  }
}

export default RichCommon;