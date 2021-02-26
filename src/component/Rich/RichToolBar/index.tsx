import * as React from 'react';
import { I_TOOL_BAR, I_TRIGGER_TYPE } from 'src/models/rich';
import { RichHelper } from 'src/helper';
import RichProvider from '../RichProvider';
import './index.scss';
import RichCommon from './RichCommon';
import RichFontSize from './RichFontSize';
interface IProps {
  editor?: React.RefObject<HTMLDivElement>;
  tools: string[];
  option: {
    fontSize: number[];
  };
  trigger?(type: I_TRIGGER_TYPE, ...opts: any[]): void;
}
interface IStates {
}

class RichToolBar extends React.Component<IProps, IStates> {
  templateHtml: string = '<table class="rich-table"><tr><td></td><td></td></tr><tr><td></td><td></td></tr></table>';
  static defaultProps = {
  };
  constructor(props: IProps) {
    super(props);
    this.state = {
    };
  }

  bindClick = (tool: string, ...opt: any) => {
    const { editor } = this.props;
    switch(tool) {
      case I_TOOL_BAR.BOLD:
        RichHelper.setBold();
        break;
      case I_TOOL_BAR.BACK_COLOR:
        RichHelper.setBackColor('red');
        break;
      case I_TOOL_BAR.FONT_SIZE:
        editor && editor.current && RichHelper.setFontSize(opt);
        break;
      case I_TOOL_BAR.FORE_COLOR:
        RichHelper.setForeColor('green');
        break;
      case I_TOOL_BAR.IN_DENT:
        RichHelper.setInDent();
        break;
      case I_TOOL_BAR.OUT_DENT:
        RichHelper.setOutDent();
        break;
      case I_TOOL_BAR.INSERT_HTML:
        RichHelper.insertHtml(this.templateHtml);
        break;
    }
  }

  renderTools = () => {
    const { tools, option } = this.props;
    return tools.map(tool => {
      switch(tool) {
        case I_TOOL_BAR.BOLD:
          return <RichCommon onClick={() => this.bindClick(tool)} content={tool}/>
        case I_TOOL_BAR.BACK_COLOR:
          return <RichCommon onClick={() => this.bindClick(tool)} content={tool}/>
        case I_TOOL_BAR.FONT_SIZE:
          return <RichFontSize onSelect={(size: number) => this.bindClick(tool, size)} content={tool} fontSize={option.fontSize}/>
        case I_TOOL_BAR.FORE_COLOR:
          return <RichCommon onClick={() => this.bindClick(tool)} content={tool}/>
        case I_TOOL_BAR.IN_DENT:
          return <RichCommon onClick={() => this.bindClick(tool)} content={tool}/>
        case I_TOOL_BAR.OUT_DENT:
          return <RichCommon onClick={() => this.bindClick(tool)} content={tool}/>
        case I_TOOL_BAR.INSERT_HTML:
          return <RichCommon onClick={() => this.bindClick(tool)} content={tool}/>
      }
    });
  }

  render() {
    return (
      <div className="rich-toolbar">
        {this.renderTools()}
      </div>
    );
  }
}

export default (props: IProps) => <RichProvider.Consumer>{({ editorRef, trigger }) => <RichToolBar {...props} trigger={trigger} editor={editorRef} />}</RichProvider.Consumer>;