import initialState from '../_reducers/default.reducers';
import ac from '../_constants/action.constants';

export function snake(state = initialState.snake, action) {
    switch (action.type) {
        case ac.move:
            const {direction} = action;
            const offset = 10;
            let pos, dir;  // init

            if (direction === `left`) {
                dir = `left`;
                pos = state.style[dir] - offset;
            } else if (direction === `right`) {
                dir = `left`;
                pos = state.style[dir] + offset;
            } else if (direction === `up`) {
                dir = `top`;
                pos = state.style[dir] - offset;
            } else if (direction === `down`) {
                dir = `top`;
                pos = state.style[dir] + offset;
            }

            return {
                ...state,
                style: {
                    ...state.style,
                    [dir]: pos,
                }
            };
        default:
            return state;
    }
}