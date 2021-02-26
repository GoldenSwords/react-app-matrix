import { flatTree, replaceTree } from "src/helper/ImageLoader";
import { Dispatch, } from "react";
import ActionTypes from "src/Constant/ActionTypes";
import { JurisdictionType } from "src/Constant/jurisdiction";
import { IDispatch, jurisdictionType } from "src/models/jurisdiction";
import { treeDataType, treeNode } from "src/models/tree";
import apis from 'src/apis';

export default {
  loadJurisdiction: () => (dispatch: Dispatch<IDispatch>) => {
    dispatch({
      type: ActionTypes.tree.loadData.request,
      payload: treeDataType.jurisdiction
    });
    apis.tree.loadJurisdictionButton().then(payload => {
      dispatch({
        type: ActionTypes.tree.loadData.done,
        payload,
      });
    }).catch((error: Error) => {
      dispatch({
        type: ActionTypes.tree.loadData.error,
      });
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
  }
}