import ActionTypes from "src/Constant/ActionTypes";

interface Action {
  type: string;
  payload: any;
  error?: Error;
}
export interface RootState {
  message?: Error,
}

const reducer = function(state:RootState = {}, action: Action) {
  const { payload } = action;
  switch(action.type) {
    case ActionTypes.common.error:
      return {
        ...state,
        message: payload ? payload : null,
       }
    default:
      return state;
  }
}
export default reducer;