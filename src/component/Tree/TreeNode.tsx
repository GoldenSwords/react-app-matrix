import * as React from 'react';
import classnames from 'classnames';
import { treeNode } from 'src/models/tree';
import Tree from '.';

import './TreeNode.scss';
import Checkbox from '../Common/Checkbox';
interface IProps {
  item: treeNode;
  selectNode?: string;
  level: number;
  checkNodes: string[];
  showCheckbox?: boolean;
  highlightIds?: string[];
  onSelectNode?(node: treeNode): void;
  onCheckNode?(nodeID: treeNode, checked: boolean): void;
}

const TreeNode: React.FC<IProps> = (props: IProps) => {
  const left = 20;
  const { item, selectNode, level, showCheckbox, checkNodes, highlightIds, onSelectNode, onCheckNode } = props;
  return <li className="common-tree-node">
    <div
      onClick={(e) => {
        onSelectNode(item);
      }} 
      className={classnames("node-area", { disabled: item.disabled }, {active: selectNode === item.id}, {highlight: highlightIds.includes(item.id)})} 
      style={{left: -level * left}}>
      
      <div
        style={{paddingLeft: level * left}}
        className={classnames('node-title')}
      >
        {showCheckbox && <Checkbox disabled={item.disabled} checked={checkNodes.includes(item.id)} onChange={(checked: boolean) => onCheckNode(item, checked)}/>}
        {item.text}
      </div>
    </div>
    {
      item.children && <Tree
        key={`tree_${item.id}`} 
        checkNodes={checkNodes}
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
