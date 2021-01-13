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
  treeType: jurisdictionType;
}

const root: RootState = {
  buttons:[],
  pages:[],
  interfaces:[], 
  treeType: JurisdictionType.buttons,
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