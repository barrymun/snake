let shared = {
    position: `absolute`,
};

let part = {
    style: {
        ...shared,
        left: parseInt(window.innerWidth / 2),
        top: parseInt(window.innerHeight / 2),
    }
};

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
    },
}