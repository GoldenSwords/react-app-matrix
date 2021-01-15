import { flatTree, replaceTree } from "src/helper/ImageLoader";
import { Dispatch, } from "react";
import ActionTypes from "src/Constant/ActionTypes";
import { JurisdictionType } from "src/Constant/jurisdiction";
import { IDispatch, jurisdictionType } from "src/model/jurisdiction";
import { treeNode } from "src/model/tree";
import apis from 'src/apis';

export default {
  checkTreeNode: (treeNodes: string[]) => (dispatch: Dispatch<IDispatch>, getState: Function) => {
    dispatch({
      type: ActionTypes.tree.checkNodes,
      payload: treeNodes,
    });
  },
  selectTreeNode: (treeNode: string) => (dispatch: Dispatch<IDispatch>, getState: Function) => {
    dispatch({
      type: ActionTypes.tree.selectNode,
      payload: treeNode,
    });
  },
  selectTreeNodes: (treeNodes: string[]) => (dispatch: Dispatch<IDispatch>, getState: Function) => {
    dispatch({
      type: ActionTypes.tree.selectNodes,
      payload: treeNodes,
    });
  }
}
  