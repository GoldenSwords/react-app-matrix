import * as React from 'react';
import { treeNode } from 'src/model/tree';
import TreeNode from './TreeNode';

import './index.scss';

interface IProps {
  data: treeNode[];
  selectNode?: treeNode;
  selectNodes?: treeNode[];
  level?: number;
  showCheckbox?: boolean;
  highlightIds?: string[];
  onSelectNode?(node: treeNode): void;
  onCheckNode?(nodeID: treeNode, checked: boolean): void;
}

const Tree: React.FC<IProps> = (props: IProps) => {
  const { data, selectNode, highlightIds = [], showCheckbox, level = 1, onSelectNode, onCheckNode } = props;
  return <ul className="common-tree" key={'tree'}>
    {
      data.map((node:treeNode) => <TreeNode
        key={node.id} 
        item={node} 
        showCheckbox={showCheckbox}
        selectNode={selectNode} 
        level={level} 
        highlightIds={highlightIds}
        onSelectNode={onSelectNode}
        onCheckNode={onCheckNode}
      />)
    }
  </ul>;
};

export default Tree;