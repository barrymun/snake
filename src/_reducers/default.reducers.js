let shared = {
    position: `absolute`,
};

export default {
    snake: {
        parts: [
            {
                style: {
                    ...shared,
                    top: 100,
                    left: 100,
                }
            },
            {
                style: {
                    ...shared,
                    top: 100,
                    left: 80,
                }
            },
            {
                style: {
                    ...shared,
                    top: 100,
                    left: 60,
                }
            },
            {
                style: {
                    ...shared,
                    top: 100,
                    left: 40,
                }
            },
        ],
        speed: 100,  // decrement this to go faster (timeout)
    },
}