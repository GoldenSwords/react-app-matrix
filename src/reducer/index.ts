import { combineReducers } from 'redux';
import jurisdiction from './Jurisdiction';
import common from './Common';
import tree from './tree';
export default combineReducers({
  common,
  tree,
  jurisdiction,
});