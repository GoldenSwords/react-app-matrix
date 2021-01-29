import { combineReducers } from 'redux';
import jurisdiction from './Jurisdiction';
import common from './Common';
import temp from './Temp';
import tree from './tree';
export default combineReducers({
  common,
  tree,
  temp,
  jurisdiction,
});