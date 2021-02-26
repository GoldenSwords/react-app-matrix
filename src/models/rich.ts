export enum I_TOOL_BAR {
  OUT_DENT = 'outDent',
  IN_DENT = 'inDent',
  BOLD = 'bold',
  FONT_SIZE = 'fontSize',
  FORE_COLOR = 'foreColor',
  BACK_COLOR = 'backColor',
  INSERT_HTML = 'insertHtml',
};

export enum I_TRIGGER_TYPE {
  DROP_DOWN_MENU = 'dropDownMenu',
}

export interface IMenuItem {
  text: string;
  value: string;
  children: IMenuItem[];
}
