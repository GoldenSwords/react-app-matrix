import * as React from 'react';
import { ITreeColumn, ITreeData } from 'src/models/treeGrid';
import classnames from 'classnames';

import './TreeGridBody.scss';
import TreeGridRow from './TreeGridRow';

interface IProps {
  columns: Array<ITreeColumn>;
  treeData: ITreeData;
  width?: number;
  theme?: 'striple' | 'bordered';
}

const TreeGridBody: React.FC<IProps> = (props: IProps) => {
  const { columns, treeData, theme, width } = props;
  return (
    <div className={classnames('common-treegrid-body', { 
        striple: theme === 'striple', 
        bordered: theme === 'bordered' 
      })}>
      {
        treeData.map((data, index) => {
          return <TreeGridRow key={`c_t_b_r_${index}`} treeData={data} columns={columns} width={width}/>
        })
      }
    </div>
  );
};

export default TreeGridBody;
