import globalC from "../_constants/global.constants";

/**
 *
 * @param n
 * @returns {number}
 */
function roundDimensions(n) {
    return n - (n % globalC.snakePiece);
}

let sharedStyle = {
    position: `absolute`,
};

let part = {
    style: {
        ...sharedStyle,
        left: roundDimensions(parseInt(window.innerWidth / 2)),
        top: roundDimensions(parseInt(window.innerHeight / 2)),
    }
};

let food = {
    style: {
        ...sharedStyle,
        left: roundDimensions(parseInt(window.innerWidth / 4) * 3),
        top: roundDimensions(parseInt(window.innerHeight / 4)),
    },
};

export default {
    snake: {
        steps: 0,
        gameOver: false,
        interval: null,  // controlling the acceleration
        parts: [
            part,
            {...part, style: {...part.style, left: part.style.left - globalC.snakePiece}},
            {...part, style: {...part.style, left: part.style.left - (globalC.snakePiece * 2)}},
            {...part, style: {...part.style, left: part.style.left - (globalC.snakePiece * 3)}},
            {...part, style: {...part.style, left: part.style.left - (globalC.snakePiece * 4)}},
        ],
        velocity: 1000,  // decrement this to go faster (timeout)
        direction: `right`,
        food,
    },
}