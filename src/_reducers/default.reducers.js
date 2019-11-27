/**
 *
 * @param x
 * @returns {number}
 */
function roundDimensions(x) {
    let remainder = x % 20;
    return x - remainder;
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
console.log({food})

export default {
    snake: {
        gameOver: false,
        interval: null,  // controlling the acceleration
        parts: [
            part,
            {...part, style: {...part.style, left: part.style.left - 20}},
            {...part, style: {...part.style, left: part.style.left - 40}},
            {...part, style: {...part.style, left: part.style.left - 60}},
            {...part, style: {...part.style, left: part.style.left - 80}},
        ],
        velocity: 1000,  // decrement this to go faster (timeout)
        direction: `right`,
        food,
    },
}