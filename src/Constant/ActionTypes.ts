import { ActionType, createActionTypes } from 'action-types';

const AsyncAction = {
  request: ActionType,
  error: ActionType,
  done: ActionType,
}

const ActionTypes = createActionTypes({
  system: {
    jurisdiction: AsyncAction,
  },
  tree: {
    loadData: AsyncAction,
    selectNodes: ActionType,
    selectNode: ActionType,
    checkNodes: ActionType,
  },
  common: {
    error: AsyncAction,
  },
  temp: {
    config: ActionType,
  },
  zoom: {
    setZoom: ActionType,
  },
});

export default ActionTypes;