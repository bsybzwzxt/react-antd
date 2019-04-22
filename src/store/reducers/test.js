import { fromJS } from 'immutable';
import { createReducer, createAction } from './index'
import { combineReducers } from "redux-immutable";
import {testActions, testState} from '../actions/test';

export default combineReducers({
    test: createReducer(fromJS(testState), createAction(testActions))
});
