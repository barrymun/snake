import initialState from '../_reducers/default.reducers';
import ac from '../_constants/action.constants';
import globalC from "../_constants/global.constants";
import {roundDimensions} from "../_constants";

/**
 *
 * @param state
 * @param direction
 * @returns {*}
 */
function moveLogic(state, direction) {
    const offset = globalC.snakePiece;  // same as the width/height of the snake part
    const gameWidth = roundDimensions(window.innerWidth);
    const gameHeight = roundDimensions(window.innerHeight);

    let left, top;  // init
    let [head, ...tail] = state.parts;
    let [lastPart, ...rest] = state.parts.slice().reverse();

    if (direction === `left`) {
        top = head.style.top;
        left = head.style.left - offset;
        if (left < 0) left = gameWidth;
    } else if (direction === `right`) {
        top = head.style.top;
        left = head.style.left + offset;
        if (left > gameWidth - offset) left = 0;
    } else if (direction === `up`) {
        top = head.style.top - offset;
        left = head.style.left;
        if (top < 0) top = gameHeight;
    } else if (direction === `down`) {
        top = head.style.top + offset;
        left = head.style.left;
        if (top > gameHeight - offset) top = 0;
    }

    let newPart = {
        ...lastPart,
        style: {
            ...lastPart.style,
            top,
            left,
        },
    };

    let parts = [newPart, ...rest.slice().reverse()];

    // collision detection
    let flag = false;
    parts.forEach(part => {
        let x = parts.filter(o => part.style.left === o.style.left && part.style.top === o.style.top);
        if (x.length > 1) flag = true;  // collision
    });

    if (flag) {
        // stop the snake from moving
        clearInterval(state.interval);
        // returning the state without modification here to give
        // the illusion of a collision
        return {gameOver: true};
    }

    return {parts};
}


/**
 *
 * @param currentPos
 * @param maximum
 * @returns {number}
 */
function generateNewFoodPosition(currentPos = 0, maximum = 0) {
    const minimum = 0;

    // format maximum (prevent outside boundary clipping)
    maximum = roundDimensions(maximum);

    let n = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
    let newPos = roundDimensions(n);

    // check if the food x/y position would be put in the same place
    if (newPos === currentPos) return generateNewFoodPosition(currentPos, maximum);

    // all clear, return new x/y position
    return newPos;
}


export function snake(state = initialState.snake, action) {
    let r;
    switch (action.type) {
        case ac.move:
            let direction = state.direction;
            r = moveLogic(state, direction);
            return {
                ...state,
                ...r,
                steps: state.steps + 1,
            };
        case ac.changeDirection:
            r = moveLogic(state, action.direction);
            return {
                ...state,
                ...r,
                direction: action.direction,
                steps: state.steps + 1,
            };
        case ac.changeInterval:
            return {
                ...state,
                interval: action.interval,
            };
        case ac.resetGame:
            return {...initialState.snake};
        case ac.consumeFood:
            // create a new location for the food
            let left = generateNewFoodPosition(state.parts[0].style.left, window.innerWidth);
            let top = generateNewFoodPosition(state.parts[0].style.top, window.innerHeight);

            // setup to create a new part
            let [lastPart, ...rest] = state.parts.slice().reverse();
            let newPartStyle;

            if (state.direction === `left`) {
                newPartStyle = {
                    ...lastPart.style,
                    left: lastPart.style.left + globalC.snakePiece,
                };
            } else if (state.direction === `right`) {
                newPartStyle = {
                    ...lastPart.style,
                    left: lastPart.style.left - globalC.snakePiece,
                };
            } else if (state.direction === `up`) {
                newPartStyle = {
                    ...lastPart.style,
                    top: lastPart.style.left + globalC.snakePiece,
                };
            } else if (state.direction === `down`) {
                newPartStyle = {
                    ...lastPart.style,
                    top: lastPart.style.left - globalC.snakePiece,
                };
            }

            return {
                ...state,
                velocity: state.velocity <= 50
                    ? state.velocity
                    : state.velocity - 50,
                food: {
                    ...state.food,
                    style: {
                        ...state.food.style,
                        left,
                        top,
                    }
                },
                parts: [
                    ...state.parts,
                    {...lastPart, style: {...lastPart.style, ...newPartStyle}},
                ],
            };
        default:
            return state;
    }
}