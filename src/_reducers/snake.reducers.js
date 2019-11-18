import initialState from '../_reducers/default.reducers';
import ac from '../_constants/action.constants';

export function snake(state = initialState.snake, action) {
    switch (action.type) {
        case ac.move:
            const {direction} = action;
            const offset = 20;  // same as the width/height of the snake part
            let pos, dir;  // init
            let [head, ...tail] = state.parts;
            let [lastPart, ...rest] = state.parts.slice().reverse();

            if (direction === `left`) {
                dir = `left`;
                pos = head.style[dir] - offset;
            } else if (direction === `right`) {
                dir = `left`;
                pos = head.style[dir] + offset;
            } else if (direction === `up`) {
                dir = `top`;
                pos = head.style[dir] - offset;
            } else if (direction === `down`) {
                dir = `top`;
                pos = head.style[dir] + offset;
            }

            let newPart = {
                ...lastPart,
                style: {
                    ...lastPart.style,
                    [dir]: pos,
                },
            };

            return {
                ...state,
                parts: [newPart, ...rest.slice().reverse()],
            };
        default:
            return state;
    }
}