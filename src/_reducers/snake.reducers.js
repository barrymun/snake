import initialState from '../_reducers/default.reducers';
import ac from '../_constants/action.constants';

export function snake(state = initialState.snake, action) {
    switch (action.type) {
        case ac.move:
            return {
                ...state,
                style: {
                    ...state.style,
                    [action.direction]: action.position,
                }
            };
        default:
            return state;
    }
}