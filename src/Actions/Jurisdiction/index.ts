import { flatTree, replaceTree } from "src/helper/ImageLoader";
import { Dispatch, Reducer, ReducerStateWithoutAction } from "react";
import ActionTypes from "src/Constant/ActionTypes";
import { JurisdictionType } from "src/Constant/jurisdiction";
import { IDispatch, jurisdictionType } from "src/model/jurisdiction";
import { treeNode } from "src/model/tree";
import { RootState } from "src/reducer/Jurisdiction";

export default {
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
    dispatch({
      type: ActionTypes.system.tree.request,
      payload: {
        tree: replaceTree(tree, treeNode)
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