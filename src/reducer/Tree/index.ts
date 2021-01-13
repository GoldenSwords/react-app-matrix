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
  tree: [
    {id: '1', text:'1', disabled: true, checked: true, children:[
      {id: '2', text:'1-1', disabled: true},
      {id: '3', text:'1-2'},
      {id: '4', text:'1-3'},
      {id: '5', text:'1-4'}
    ]},
    {id: '6', text:'2'},
    {id: '7', text:'3',children:[
      {id: '8', text:'3-1'},
      {id: '9', text:'3-2'},
      {id: '10', text:'3-3'},
      {id: '11', text:'3-4'}
    ]},
  ]
};

const reducer = function(state:RootState = root, action: Action) {
  const { payload } = action;
  switch(action.type) {
    case ActionTypes.tree.loadData.error:
    case ActionTypes.tree.loadData.request: {
      return {
        ...state,
        tree: []
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