import * as React from 'react';
import { ITreeColumn, ITreeData } from 'src/models/treeGrid';
import classnames from 'classnames';

import './TreeGridCol.scss';

interface IProps {
  label: string;
  width: number;
  isTree?: boolean;
  treeLevel?: number;
}

const TreeGridCol: React.FC<IProps> = (props: IProps) => {
  const { label, width, isTree, treeLevel = 0 } = props;
  const left = 16; // 左边距
  const mapKeys = (key: Array<keyof object>, data: object): string => {
    if (key.length === 1) {
      return data[key[0]];
    }
    return mapKeys(key.slice(1, key.length), data[key[0]])
  }

  return (
    <div className="common-treegrid-body-col" style={{ width, paddingLeft: treeLevel * left }}>{ label }</div>
  );
};

export default TreeGridCol;
