import ActionTypes from "src/Constant/ActionTypes";
import { treeNode } from "src/model/tree";

interface Action {
  type: string;
  payload: any;
}
export interface RootState {
  tree: treeNode[],
  checkNodes: string[];
  selectNode?: string;
  selectNodes?: string[];
}

const root: RootState = {
  selectNodes: [],
  checkNodes: [],
  tree: []
};

const reducer = function(state:RootState = root, action: Action) {
  const { payload } = action;
  switch(action.type) {
    case ActionTypes.tree.loadData.error:
    case ActionTypes.tree.loadData.request: {
      return {
        ...state,
        treeDataType: payload,
        tree: [] as treeNode[],
      };
    }
    case ActionTypes.tree.loadData.done: {
      return {
        ...state,
        tree: payload
      };
    }
    case ActionTypes.tree.selectNodes: {
      return {
        ...state,
        selectNodes: payload,
      }
    }
    case ActionTypes.tree.selectNode: {
      return {
        ...state,
        selectNode: payload
      }
    }
    case ActionTypes.tree.checkNodes: {
      return {
        ...state,
        checkNodes: payload
      }
    }
    default:
      return state;
  }
}
export default reducer;