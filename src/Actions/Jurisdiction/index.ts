import { flatTree, replaceTree } from "src/helper/ImageLoader";
import { Dispatch, } from "react";
import ActionTypes from "src/Constant/ActionTypes";
import { JurisdictionType } from "src/Constant/jurisdiction";
import { IDispatch, jurisdictionType } from "src/model/jurisdiction";
import { treeNode } from "src/model/tree";
import apis from 'src/apis';

export default {
  loadButtons: () => (dispatch: Dispatch<IDispatch>) => {
    apis.tree.loadJurisdictionButton().then(res => {
      console.log(res)
    }).catch((error: Error) => {
      dispatch({
        type: ActionTypes.common.error,
        error,
      });
    });
  },
  jurisdictionButton: (payload: string[], type: jurisdictionType) => (dispatch: Dispatch<IDispatch>) => {
    if (!type || ![JurisdictionType.pages, JurisdictionType.interfaces, JurisdictionType.buttons].includes(type as JurisdictionType)) {
      dispatch({
        type: ActionTypes.common.error,
        payload: new Error('not type')
      });
      return;
    }
    dispatch({
      type: ActionTypes.system.jurisdiction.request,
      payload: {
        [type]: payload
      },
    });
  },
  checkTreeNode: (treeNode: treeNode) => (dispatch: Dispatch<IDispatch>, getState: Function) => {
    const { jurisdiction } = getState();
    const { tree } = jurisdiction;
    const checkTree = replaceTree(tree, treeNode);
    const checkNodes = flatTree(checkTree).filter((node) => node.checked).map((node) => node.id);
    dispatch({
      type: ActionTypes.tree.checkNode,
      payload: {
        tree: checkTree,
        checkNodes,
      },
    });
  },
  selectTreeNode: (selectNode: treeNode) => (dispatch: Dispatch<IDispatch>, getState: Function) => {
    dispatch({
      type: ActionTypes.system.jurisdiction.request,
      payload: {
        selectNode,
      },
    });
  },
  selectTreeNodes: (selectNodes: treeNode[]) => (dispatch: Dispatch<IDispatch>, getState: Function) => {
    dispatch({
      type: ActionTypes.system.jurisdiction.request,
      payload: {
        selectNodes,
      },
    });
  }
}