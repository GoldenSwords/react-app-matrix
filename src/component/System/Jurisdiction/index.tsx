import {connect} from 'react-redux';
import * as React from 'react';

import Actions from 'src/Actions';

import { RootState } from 'src/model';
import { jurisdictionType } from 'src/model/jurisdiction';
import { JurisdictionType } from 'src/Constant/jurisdiction';
import Tree from 'src/component/Tree';
import { treeNode } from 'src/model/tree';
import { RootState as JurisdictionState } from "src/reducer/Jurisdiction";
import { RootState as TreeState } from "src/reducer/Tree";

import './index.scss';
interface IProps {
  jurisdiction: JurisdictionState;
  tree: TreeState;
  setJurisdiction(buttons: string[], type: jurisdictionType): void;
  selectTreeNode(treeNode: string): void;
  selectTreeNodes(treeNodes: string[]): void;
  onCheckNode(treeNodes: string[]): void;
  loadTree(): void;
  treeType: jurisdictionType;
  treeData: treeNode[];
  selectNode: treeNode;
  selectNodes: treeNode[];
}
interface IStates {
}

class Jurisdiction extends React.Component<IProps, IStates> {
  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { setJurisdiction, loadTree } = this.props;
    loadTree();
    setJurisdiction(['a', 'b'], JurisdictionType.buttons)
  }

  onSelectNode = (selectNode: treeNode) => {
    const { tree, selectTreeNode, selectTreeNodes } = this.props;
    const { selectNodes } = tree;
    let selected = [...selectNodes];
    if (selected.includes(selectNode.id)) {
      selected.splice(selected.findIndex((node: string) => node === selectNode.id), 1);
    } else {
      selected.push(selectNode.id);
    }
    selectTreeNode(selectNode.id);
    selectTreeNodes(selected);
  }

  onCheckNode = (checkNode: treeNode, checked: boolean) => {
    const { tree, onCheckNode } = this.props;
    const { checkNodes } = tree;
    checkNode.checked = checked;
    const checkNodesCopy = [...checkNodes];
    const index = checkNodesCopy.findIndex(node => node === checkNode.id);
    if(checked && !checkNodesCopy.includes(checkNode.id)){
      checkNodesCopy.push(checkNode.id);
    } else if(index !== -1) {
      checkNodesCopy.splice(index, 1);
    }
    onCheckNode(checkNodesCopy);
  }

  render() {
    const { tree } = this.props;
    const { tree: treeData, selectNodes, selectNode, checkNodes } = tree;
    return (
      <div className="jurisdiction-container">
        <Tree
          data={treeData}
          showCheckbox={true}
          checkNodes={checkNodes}
          highlightIds={selectNodes}
          selectNode={selectNode}
          onSelectNode={this.onSelectNode}
          onCheckNode={this.onCheckNode}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: RootState, ownProps: any) => ({
  jurisdiction: state.jurisdiction,
  tree: state.tree,
});
const mapDispatchToProps = (dispatch: Function,ownProps: any) => ({
  loadTree: () => {
    dispatch(Actions.Jurisdiction.loadButtons());
  },
  setJurisdiction: (buttons: string[], type: jurisdictionType ) => {
    dispatch(Actions.Jurisdiction.jurisdictionButton(buttons, type));
  },
  onCheckNode: (nodes: string[]) => {
    dispatch(Actions.Tree.checkTreeNode(nodes));
  },
  selectTreeNodes: (nodes: string[]) => {
    dispatch(Actions.Tree.selectTreeNodes(nodes));
  },
  selectTreeNode: (treeNode: string) => {
    dispatch(Actions.Tree.selectTreeNode(treeNode));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Jurisdiction);