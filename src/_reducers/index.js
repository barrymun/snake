import {combineReducers} from 'redux';
import {snakeReducer} from "./snake.reducers";

const rootReducer = combineReducers({
    snakeReducer,
});
export default rootReducer;