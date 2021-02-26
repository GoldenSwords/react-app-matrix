import * as React from 'react';
import RichToolBar from './RichToolBar';
import i18n from 'src/i18n';
import './index.scss';
import RichProvider from './RichProvider';
import { IMenuItem, I_TRIGGER_TYPE } from 'src/models/rich';
import DropMenu from './Plugins/DropMenu';
interface IProps {
}
interface IStates {
  tools: string[];
  content: string;
  fontSize: number[];
}

interface I_Register {
  type: I_TRIGGER_TYPE;
  comp: React.Component;
  receiveMessage: Function;
}

class Rich extends React.Component<IProps, IStates> {
  registerRefs: I_Register[] = [];
  editorRef: React.RefObject<HTMLDivElement> = React.createRef();
  constructor(props: IProps) {
    super(props);
    this.state = {
      tools: ['inDent', 'outDent', '|', 'bold', 'fontSize', 'foreColor', 'backColor', 'insertHtml'],
      content: '<span>123</span><span>123</span><span>123</span>',
      fontSize: [12, 14, 16, 20, 24, 30],
    };
  }

  register = (type: I_TRIGGER_TYPE, comp: React.Component, receiveMessage: Function) => {
    this.registerRefs.push({ type, comp, receiveMessage });
  }

  destroy = (type: I_TRIGGER_TYPE, comp: React.Component, receiveMessage: Function) => {
    const index = this.registerRefs.findIndex(
      register => register.comp === comp 
        && register.type === type 
        && register.receiveMessage === receiveMessage
    );
    if (index === -1) return;
    this.registerRefs.splice(index, 1);
  }

  trigger = (type: I_TRIGGER_TYPE, ...opts: any) => {
    this.registerRefs.filter(register => register.type === type).forEach(register => register.receiveMessage && register.receiveMessage(...opts))
  }

  render() {
    const { tools, content, fontSize } = this.state;
    return (
      <RichProvider.Provider value={{
        register: this.register,
        trigger: this.trigger,
        destroy: this.destroy,
        editorRef: this.editorRef,
      }}>
        <div className="rich-container">
          <RichToolBar tools={tools} option={{
            fontSize
          }}/>
          { 
            !content && <div className="rich-placeholder">
              <div>{i18n('rich.placeholder')}</div>
            </div>
          }
          <div className="rich-content" suppressContentEditableWarning contentEditable="true" dangerouslySetInnerHTML={{
            __html: content
          }} ref={this.editorRef}>
          </div>
        </div>
      </RichProvider.Provider>
    );
  }
}

export default Rich;