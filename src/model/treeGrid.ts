export interface ITreeGridData {
  column: Array<ITreeColumn>;
  data: ITreeData;
}

export type ITreeColumn = {label: string, width?: number, key: string, tree?: boolean};
export type ITreeData = Array<object>;