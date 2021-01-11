import ActionTypes from "src/Constant/ActionTypes";

export default {
  setError: (payload: Error) => (dispatch: Function) => {
    dispatch({
      type: ActionTypes.common.error,
      payload,
    });
  }
}