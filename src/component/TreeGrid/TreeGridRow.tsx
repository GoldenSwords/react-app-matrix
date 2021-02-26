import * as React from 'react';
import classnames from 'classnames';
import { ITreeColumn } from 'src/models/treeGrid';
import TreeGridCol from './TreeGridCol';

import './TreeGridRow.scss';

interface IProps {
  columns: Array<ITreeColumn>;
  treeData: object;
  width?: number;
  treeLevel?: number;
}

const TreeGridRow: React.FC<IProps> = (props: IProps) => {
  const { columns, treeData, width, treeLevel = 0 } = props;
  const noWidth = columns.filter(o=>!o.width).length;
  let all = columns.map(o=>o.width).reduce((all: number = 0, current: number = 0)=>{
    return all + current;
  });

  const getStyle = (item: ITreeColumn) => item.width || (width - all) / noWidth;

  const mapKeys = (key: Array<keyof object>, data: object): string => {
    if (key.length === 1) {
      return data[key[0]];
    }
    return mapKeys(key.slice(1, key.length), data[key[0]])
  }

  return (
    <div className={classnames('common-treegrid-body-row', {})}>
      {
        columns.map((column: ITreeColumn, index: number) => {
          return <TreeGridCol key={`c_t_b_r_c_${index}`} width={getStyle(column)} treeLevel={treeLevel} isTree={column.tree} label={mapKeys(column.key.split('.') as keyof object, treeData)} />
        })
      }
    </div>
  );
};

export default TreeGridRow;
