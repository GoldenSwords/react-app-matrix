import ActionTypes from "src/Constant/ActionTypes";
import { JurisdictionType } from "src/Constant/jurisdiction";
import { jurisdictionType } from "src/model/jurisdiction";
import { treeNode } from "src/model/tree";

interface Action {
  type: string;
  payload: any;
}
export interface RootState {
  buttons: string[],
  pages: string[],
  interfaces: string[],
  tree: treeNode[],
  treeType: jurisdictionType;
  selectNode?: treeNode;
  selectNodes?: treeNode[];
}

const root: RootState = {
  buttons:[],
  pages:[],
  interfaces:[], 
  selectNodes: [],
  treeType: JurisdictionType.buttons,
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
    case ActionTypes.system.jurisdiction.request:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
}
export default reducer;