import { LANG } from 'src/helper/envHelper';
import { ILanguageNode } from 'src/model/i18n';
import zhCn from './zh-cn';

const languages: {
  [name in string]: ILanguageNode;
} = {
  'zh-cn': zhCn,
};

const language: ILanguageNode = languages[LANG];

export default (key: string, ...params: string[]) => {
  let keyStr: string | ILanguageNode = language;
  key.split('.').forEach((keySet: string, index: number) => {
    keyStr = keyStr[keySet];
  });
  return keyStr.replace(/{(\d+)}/g, (match: string, index: number) => match.indexOf('{'||'}')!==-1 ? match : params[index]);
}