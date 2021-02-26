import ActionTypes from "src/Constant/ActionTypes";

export default {
  setConfig: (count: number) => (dispatch: Function) => {
    dispatch({
      type: ActionTypes.temp.config,
      payload: {
        count,
      }
    });
  }
}