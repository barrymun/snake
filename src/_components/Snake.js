import React from 'react';
import {store} from "../_helpers";
import actions from "../_actions/snake.actions";

import "./css/Snake.css";

const right = 'ArrowRight';
const left = 'ArrowLeft';
const down = 'ArrowDown';
const up = 'ArrowUp';
const movementKeys = [right, left, down, up];

class Snake extends React.Component {

    componentDidMount() {
        window.addEventListener('keyup', this.keyUp);
        this.setSnakeInterval();
    }

    startGame = () => {
        store.dispatch(actions.move());
    };

    /**
     *
     */
    setSnakeInterval = () => {
        const {snake} = this.props;

        clearInterval(snake.interval);
        let interval = setInterval(this.startGame, snake.velocity);
        store.dispatch(actions.changeInterval(interval));
    };

    /**
     * ensure to reset the timer after a successful direction update
     * @param e
     * @returns {Promise<void>}
     */
    keyUp = async e => {
        const {snake} = this.props;
        if (!movementKeys.includes(e.key)) return;

        if (e.key === right && snake.direction !== `right` && snake.direction !== `left`) {
            this.setSnakeInterval();
            store.dispatch(actions.changeDirection(`right`));
        } else if (e.key === left && snake.direction !== `right` && snake.direction !== `left`) {
            this.setSnakeInterval();
            store.dispatch(actions.changeDirection(`left`));
        } else if (e.key === up && snake.direction !== `up` && snake.direction !== `down`) {
            this.setSnakeInterval();
            store.dispatch(actions.changeDirection(`up`));
        } else if (e.key === down && snake.direction !== `up` && snake.direction !== `down`) {
            this.setSnakeInterval();
            store.dispatch(actions.changeDirection(`down`));
        }
    };

    createFood = () => {
    };

    render() {
        const {snake} = this.props;

        return (
            <div>
                <div>
                </div>
                <div>
                    {snake.parts.map((o, index) =>
                        <div
                            key={index}
                            className={`snakePart`}
                            style={o.style}
                        />
                    )}
                </div>
            </div>
        );
    }
}

export {Snake}
