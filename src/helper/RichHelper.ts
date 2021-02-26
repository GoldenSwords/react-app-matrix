import { I_TOOL_BAR } from "src/models/rich";
// 设置文字
export const setFontSize = (fontSize: number) => {
  document.execCommand('styleWithCSS', null, 'true');
  // 先将文字大小设置成1-7号中的任何一个大小
  document.execCommand(I_TOOL_BAR.FONT_SIZE, false, String(1));
  Array.from(document.querySelectorAll('span')).some((span: HTMLSpanElement)=>{
    if (span.style.fontSize === 'x-small') {
      span.style.fontSize = `${fontSize}px`;
      return true;
    }
    return false;
  })
}

export const setForeColor = (color: string) => {
  document.execCommand(I_TOOL_BAR.FORE_COLOR, false, color);
}

export const setBackColor = (color: string) => {
  document.execCommand(I_TOOL_BAR.BACK_COLOR, false, color);
}

export const setBold = () => {
  document.execCommand(I_TOOL_BAR.BOLD);
}

export const setInDent = () => {
  document.execCommand(I_TOOL_BAR.IN_DENT.toLocaleLowerCase());
}

export const setOutDent = () => {
  document.execCommand(I_TOOL_BAR.OUT_DENT.toLocaleLowerCase());
}

export const insertHtml = (htmlStr: string) => {
  document.execCommand(I_TOOL_BAR.INSERT_HTML, false, htmlStr);
}