import { Dispatch } from "react";
import ActionTypes from "src/Constant/ActionTypes";
import { IDispatch } from "src/models/jurisdiction";

export default {
  onZoom: (zoom: number) => (dispatch: Dispatch<IDispatch>, getState: Function) => {
    dispatch({
      type: ActionTypes.zoom.setZoom,
      payload: zoom,
    });
  },
}
  