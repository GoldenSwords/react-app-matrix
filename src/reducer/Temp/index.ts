import ActionTypes from "src/Constant/ActionTypes";
import { treeNode } from "src/model/tree";

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
    '1',
    '2',
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
    default:
      return state;
  }
}
export default reducer;