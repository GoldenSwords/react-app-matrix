import {connect} from 'react-redux';
import * as React from 'react';

import Actions from 'src/Actions';

import { RootState } from 'src/model';
import { jurisdictionType } from 'src/model/jurisdiction';
import { JurisdictionType } from 'src/Constant/jurisdiction';

import './index.scss';
import Tree from 'src/component/Tree';
import { treeNode } from 'src/model/tree';
import { flatTree } from 'src/helper/ImageLoader';
interface IProps {
  jurisdiction: any;
  setJurisdiction(buttons: string[], type: jurisdictionType): void;
  selectTreeNode(treeNode: treeNode): void;
  selectTreeNodes(treeNode: treeNode[]): void;
  onCheckNode(treeNode: treeNode): void;
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
    const { setJurisdiction } = this.props;
    setJurisdiction(['a', 'b'], JurisdictionType.buttons)
  }

  componentDidUpdate(){
    console.log(this.props.jurisdiction)
  }

  onSelectNode = (selectNode: treeNode) => {
    const { jurisdiction, selectTreeNode, selectTreeNodes } = this.props;
    const { selectNodes } = jurisdiction;
    // const highlightIds = flatTree(tree).map(node => node.id);

    const selectedNodeIds = selectNodes.map((node: treeNode) => node.id);
    selectedNodeIds.includes(selectNode.id) && selectNodes.splice(selectNodes.findIndex((node: treeNode) => node.id === selectNode.id), 1);
    selectTreeNode(selectNodes);
    selectTreeNodes([...selectNodes, selectNode]);
  }

  onCheckNode = (checkNode: treeNode, checked: boolean) => {
    const { onCheckNode } = this.props;
    checkNode.checked = checked;
    onCheckNode(checkNode);
  }

  render() {
    const { jurisdiction } = this.props;
    const { tree, selectNode, selectNodes } = jurisdiction;
    const highlightIds = selectNodes.map((node: treeNode) => node.id);
    return (
      <div className="jurisdiction-container">
        <Tree
          data={tree}
          showCheckbox={true}
          highlightIds={highlightIds}
          selectNode={selectNode}
          onSelectNode={this.onSelectNode}
          onCheckNode={this.onCheckNode}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: RootState, ownProps: any) => ({
  jurisdiction: state.jurisdiction
});
const mapDispatchToProps = (dispatch: Function,ownProps: any) => ({
  setJurisdiction: (buttons: string[], type: jurisdictionType ) => {
    dispatch(Actions.Jurisdiction.jurisdictionButton(buttons, type));
  },
  onCheckNode: (node: treeNode) => {
    dispatch(Actions.Jurisdiction.checkTreeNode(node));
  },
  selectTreeNodes: (treeNode: treeNode[]) => {
    console.log(treeNode)
    dispatch(Actions.Jurisdiction.selectTreeNodes(treeNode));
  },
  selectTreeNode: (treeNode: treeNode) => {
    dispatch(Actions.Jurisdiction.selectTreeNode(treeNode));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Jurisdiction);