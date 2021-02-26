import * as React from 'react';
import { ITreeColumn, ITreeData, ITreeGridData } from 'src/models/treeGrid';
import TreeGridBody from './TreeGridBody';
import TreeGridFooter from './TreeGridFooter';
import TreeGridHeader from './TreeGridHeader';
import classnames from 'classnames';

import './index.scss';

interface IProps {
  treeData: ITreeData;
  columns: Array<ITreeColumn>;
  theme?: 'striple' | 'bordered';
  width: number;
}

const TreeGrid: React.FC<IProps> = (props: IProps) => {
  const { columns, treeData, theme = "bordered", width = 100 } = props;
  return (
    <div className="common-treegrid-container">
      <TreeGridHeader columns={columns} theme={theme} width={width}/>
      <TreeGridBody treeData={treeData} columns={columns} theme={theme} width={width}/>
      <TreeGridFooter/>
    </div>
  );
};

export default TreeGrid;
