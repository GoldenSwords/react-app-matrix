import * as React from 'react';
import classnames from 'classnames';
import { treeNode } from 'src/model/tree';
import Tree from '.';

import './TreeNode.scss';
import Checkbox from '../Common/Checkbox';
interface IProps {
  item: treeNode;
  selectNode?: treeNode;
  level: number;
  showCheckbox?: boolean;
  highlightIds?: string[];
  onSelectNode?(node: treeNode): void;
  onCheckNode?(nodeID: treeNode, checked: boolean): void;
}

const TreeNode: React.FC<IProps> = (props: IProps) => {
  const left = 20; // css margin-left;
  const { item, selectNode, level, showCheckbox, highlightIds, onSelectNode, onCheckNode } = props;
  return <li className="common-tree-node">
    <div
      onClick={() => onSelectNode(item)} 
      className={classnames("node-area", {active: selectNode?.id === item.id}, {highlight: highlightIds.includes(item.id)})} 
      style={{left: -level * left}}>
      
      <div
        style={{paddingLeft: level * left}}
        className={classnames('node-title')}
      >
        {showCheckbox && <Checkbox checked={item.checked || false} onChange={(checked: boolean) => onCheckNode(item, checked)}/>}
        {item.text}
      </div>
    </div>
    {
      item.children && <Tree
        key={`tree_${item.id}`} 
        showCheckbox={showCheckbox}
        highlightIds={highlightIds} 
        data={item.children} 
        selectNode={selectNode} 
        level={level + 1}
        onCheckNode={onCheckNode}
        onSelectNode={onSelectNode}/>
    }
  </li>;
};

export default TreeNode;
