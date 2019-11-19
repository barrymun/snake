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
            {
                style: {
                    ...shared,
                    top: 100,
                    left: 20,
                }
            },
            {
                style: {
                    ...shared,
                    top: 100,
                    left: 0,
                }
            },
        ],
        speed: 1000,  // decrement this to go faster (timeout)
        direction: `right`,
    },
}