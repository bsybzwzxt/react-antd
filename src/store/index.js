import { createStore, combineReducers } from 'redux'
import { system } from './reducers/system';

const reducer = combineReducers({
    system,
});

export default createStore(reducer)
