import initialState from '../_reducers/default.reducers';
import ac from '../_constants/action.constants';

export function snakeReducer(state = initialState.snake, action) {
    switch (action.type) {
        case ac.changeDirection:
            return {
                ...state,
                snake: {
                    ...state.snake,
                    direction: action.direction,
                },
            };
        default:
            return state;
    }
}