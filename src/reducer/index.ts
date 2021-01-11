import { combineReducers } from 'redux';
import ActionTypes from 'src/Constant/ActionTypes';
import jurisdiction from './Jurisdiction';
import common from './Common';
export default combineReducers({
  common,
  jurisdiction,
});