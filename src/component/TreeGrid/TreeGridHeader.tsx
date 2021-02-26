import * as React from 'react';
import classnames from 'classnames';
import { ITreeColumn } from 'src/models/treeGrid';

import './TreeGridHeader.scss';

interface IProps {
  columns: Array<ITreeColumn>;
  theme?: 'striple' | 'bordered';
  width?: number;
}

const TreeGridHeader: React.FC<IProps> = (props: IProps) => {
  const { columns, theme, width } = props;
  const noWidth = columns.filter(o=>!o.width).length;
  let all = columns.map(o=>o.width).reduce((all: number = 0, current: number = 0)=>{
    return all + current;
  });
  const getStyle = (item: ITreeColumn) => ({width: item.width || (width - all) / noWidth});

  return (
    <div className={classnames('common-treegrid-header', { theme })}>
      {
        columns.map((column, index) => <div key={`c_t_h_${index}`} className="common-treegrid-header-item" style={getStyle(column)}>{ column.label }</div>)
      }
    </div>
  );
};

export default TreeGridHeader;
