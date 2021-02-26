import ActionTypes from "src/Constant/ActionTypes";
import { treeNode } from "src/models/tree";
export interface RootState {
  zoom: number,
}
interface Action {
  type: string;
  payload: any;
}
const root: RootState = {
  zoom: 100,
};

const reducer = function(state:RootState = root, action: Action) {
  const { payload } = action;
  switch(action.type) {
    case ActionTypes.zoom.setZoom: {
      return {
        ...state,
        zoom: payload,
      };
    }
    default:
      return state;
  }
}
export default reducer;