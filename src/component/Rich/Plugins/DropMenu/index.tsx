import * as React from 'react';
import { IMenuItem, I_TRIGGER_TYPE } from 'src/models/rich';
import './index.scss';
import RichProvider from '../../RichProvider';
interface IProps {
  options: IMenuItem[] | number[] | string[];
  width?: number;
  left?: number;
  top?: number;
  autoClose?: boolean;
  onClose?(): void;
  onSelect(item: IMenuItem | number | string): void;
  register?(type: I_TRIGGER_TYPE, comp: React.Component, receiveMessage: Function): void;
  destroy?(type: I_TRIGGER_TYPE, comp: React.Component, receiveMessage: Function): void;
}
interface IStates {
}

class DropMenu extends React.Component<IProps, IStates> {
  static defaultProps = {
  };
  constructor(props: IProps) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    const { register } = this.props;
    register && register(I_TRIGGER_TYPE.DROP_DOWN_MENU, this, this.receiveMessage);
    document.addEventListener('click', this.checkClose);
  }

  checkClose = (e: MouseEvent) => {
    const { autoClose, onClose } = this.props;
    if (autoClose) {
      onClose && onClose();
      this.setState({
        isClose: true
      })
    }
  }

  receiveMessage = (opts: IMenuItem[]) => {
    // setTimeout(() => {
    //   this.setState({
    //     options: opts,
    //     isClose: false,
    //   });
    // }, 100);
  }

  componentWillUnmount() {
    const { destroy } = this.props;
    destroy && destroy(I_TRIGGER_TYPE.DROP_DOWN_MENU, this, this.receiveMessage);
    document.removeEventListener('click', this.checkClose);
  }

  clickItem = (e: React.MouseEvent, item: IMenuItem) => {
    e.stopPropagation();
    const { onSelect } = this.props;
    onSelect(item);
  }

  renderSingle = (item: IMenuItem) => {
    return <li className="rich-drop-menu-item" onClick={(e) => {
      this.clickItem(e, item);
    }}>
      <div className="rich-drop-menu-item-bg"></div>
      { typeof item === 'object' ? item.text : item }
      { typeof item === 'object' && item.children && !!item.children.length && this.renderItem(item.children) }
    </li>
  }

  renderItem = (options: IMenuItem[] | number[] | string[], first?: boolean) => {
    return (
      <React.Fragment>
        {
          first && <ul>{ (options as IMenuItem[]).map((opt: IMenuItem) => this.renderSingle(opt)) }</ul>
        }
        {
          !first && <ol>{ (options as IMenuItem[]).map((opt: IMenuItem) => this.renderSingle(opt)) }</ol>
        }
      </React.Fragment>
    );
  }

  render() {
    const { width, left, top, options } = this.props;
    return (
      <div className="rich-drop-menu" style={{ minWidth: width, left, top, }}>
        {this.renderItem(options, true)}
      </div>
    );
  }
}

export default (props: IProps) => <RichProvider.Consumer>{({ register, destroy }) => <DropMenu {...props} register={register} destroy={destroy} />}</RichProvider.Consumer>;