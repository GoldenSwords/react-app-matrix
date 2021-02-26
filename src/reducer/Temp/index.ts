import ActionTypes from "src/Constant/ActionTypes";
import { treeNode } from "src/models/tree";

interface Action {
  type: string;
  payload: any;
}
export interface RootState {
  pages: string[],
  count: number;
}

const root: RootState = {
  count: 1,
  pages: [
    '10',
    // '2',
    // '3',
    // '4',
    // '5',
    // '6',
    // '7',
    // '8',
    // '9',
  ],
};

const reducer = function(state:RootState = root, action: Action) {
  const { payload } = action;
  switch(action.type) {
    case ActionTypes.temp.config: {
      const { count } = payload;
      return {
        ...state,
        count,
      }
    }
    default:
      return state;
  }
}
export default reducer;