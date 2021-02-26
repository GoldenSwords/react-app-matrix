import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { I_TOOL_BAR, I_TRIGGER_TYPE } from 'src/models/rich';
import { RichHelper } from 'src/helper';
import './index.scss';
import RichProvider from '../../RichProvider';
import DropMenu from '../../Plugins/DropMenu';
interface IProps {
  fontSize: number[];
  content: string;
  onSelect(size: number): void;
  trigger?(type: I_TRIGGER_TYPE, ...opts: any[]): void;
}
interface IStates {
  openMenu: boolean;
}

class RichFontSize extends React.Component<IProps, IStates> {
  static defaultProps = {
  };
  constructor(props: IProps) {
    super(props);
    this.state = {
      openMenu: false,
    };
  }

  renderMenu = () => {
    const { fontSize, onSelect } = this.props;
    const { openMenu } = this.state;
    if (!openMenu) {
      return null;
    }
    return ReactDOM.createPortal(
      <DropMenu width={200} options={fontSize} autoClose onSelect={onSelect}/>,
      document.body,
    );
  }

  render() {
    const { content } = this.props;
    const { openMenu } = this.state;
    return (
      <React.Fragment>
        <button onClick={() => {
          this.setState({
            openMenu: !openMenu
          });
        }}>{content}</button>
        {openMenu && this.renderMenu()}
      </React.Fragment>

    );
  }
}

export default (props: IProps) => <RichProvider.Consumer>{({ trigger }) => <RichFontSize {...props} trigger={trigger} />}</RichProvider.Consumer>;