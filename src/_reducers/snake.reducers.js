import initialState from '../_reducers/default.reducers';
import ac from '../_constants/action.constants';

export function snake(state = initialState.snake, action) {
    switch (action.type) {
        case ac.move:
            const {direction} = action;
            const offset = 20;  // same as the width/height of the snake part
            let left, top;  // init
            let [head, ...tail] = state.parts;
            let [lastPart, ...rest] = state.parts.slice().reverse();

            if (direction === `left`) {
                top = head.style.top;
                left = head.style.left - offset;
            } else if (direction === `right`) {
                top = head.style.top;
                left = head.style.left + offset;
            } else if (direction === `up`) {
                top = head.style.top - offset;
                left = head.style.left;
            } else if (direction === `down`) {
                top = head.style.top + offset;
                left = head.style.left;
            }

            let newPart = {
                ...lastPart,
                style: {
                    ...lastPart.style,
                    top,
                    left,
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