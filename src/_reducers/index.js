import {combineReducers} from 'redux';
import {snake} from "./snake.reducers";

const rootReducer = combineReducers({
    snake,
});
export default rootReducer;