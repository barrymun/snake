import React from 'react';
import {store} from "../_helpers";
import actions from "../_actions/snake.actions";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import DialogContent from "@material-ui/core/DialogContent";
import Fab from "@material-ui/core/Fab";
import ArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import ArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import ArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import ArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';

import "./css/Snake.css";

const right = 'ArrowRight';
const left = 'ArrowLeft';
const down = 'ArrowDown';
const up = 'ArrowUp';
const movementKeys = [right, left, down, up];

class Snake extends React.Component {

    componentDidMount() {
        // register events
        window.addEventListener('keyup', this.keyUp);

        this.setSnakeInterval();
    }

    componentWillUnmount() {
        // de-register events
        window.removeEventListener('keyup', this.keyUp);
    }

    UNSAFE_componentWillUpdate(nextProps, nextState, nextContext) {
        // console.log(this.props.snake.steps === nextProps.snake.steps)
        if (this.props.snake.steps === nextProps.snake.steps) return;
        // console.log(nextProps.snake === this.props.snake)
        // console.log({nextProps})

        // checking for collision with the food
        let flag = false;
        let collisionCheck = nextProps.snake.parts[0].style.left === nextProps.snake.food.style.left
            && nextProps.snake.parts[0].style.top === nextProps.snake.food.style.top;
        if (collisionCheck) flag = true;

        // consume the food if the flag has been set
        if (flag) store.dispatch(actions.consumeFood());
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
        if (!movementKeys.includes(e.key)) return;
        await this.handleMoveLogic(e.key);
    };

    onClickFab = async direction => {
        await this.handleMoveLogic(direction);
    };

    handleMoveLogic = async arrowDir => {
        const {snake} = this.props;

        if (arrowDir === right && snake.direction !== `right` && snake.direction !== `left`) {
            this.setSnakeInterval();
            store.dispatch(actions.changeDirection(`right`));
        } else if (arrowDir === left && snake.direction !== `right` && snake.direction !== `left`) {
            this.setSnakeInterval();
            store.dispatch(actions.changeDirection(`left`));
        } else if (arrowDir === up && snake.direction !== `up` && snake.direction !== `down`) {
            this.setSnakeInterval();
            store.dispatch(actions.changeDirection(`up`));
        } else if (arrowDir === down && snake.direction !== `up` && snake.direction !== `down`) {
            this.setSnakeInterval();
            store.dispatch(actions.changeDirection(`down`));
        }
    };

    reset = () => {
        store.dispatch(actions.resetGame());
        this.setSnakeInterval();
    };

    render() {
        const {snake} = this.props;

        return (
            <div>
                <div className={`scoreBoard`}>
                    Score: {snake.score}
                </div>

                <div>
                    <Dialog
                        fullWidth
                        open={snake.gameOver}
                    >
                        <DialogContent>
                            Game over!
                        </DialogContent>
                        <DialogActions>
                            <Button
                                color="secondary"
                                onClick={this.reset}
                            >
                                Reset game
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>

                <div>
                    {snake.parts.map((o, index) =>
                        <div
                            key={index}
                            style={o.style}
                            className={`snakePart`}
                        />
                    )}
                </div>

                <div
                    style={{...snake.food.style}}
                    className={`snakeFood`}
                />

                <div className={`mobileDirectionalKeys`}>
                    <div className={`arrowUp`}>
                        <Fab
                            color="primary"
                            size="small"
                            onClick={() => this.onClickFab(up)}
                        >
                            <ArrowUpIcon/>
                        </Fab>
                    </div>
                    <div className={`arrowDown`}>
                        <Fab
                            color="primary"
                            size="small"
                            onClick={() => this.onClickFab(down)}
                        >
                            <ArrowDownIcon/>
                        </Fab>
                    </div>
                    <div className={`arrowLeft`}>
                        <Fab
                            color="primary"
                            size="small"
                            onClick={() => this.onClickFab(left)}
                        >
                            <ArrowLeftIcon/>
                        </Fab>
                    </div>
                    <div className={`arrowRight`}>
                        <Fab
                            color="primary"
                            size="small"
                            onClick={() => this.onClickFab(right)}
                        >
                            <ArrowRightIcon/>
                        </Fab>
                    </div>
                </div>
            </div>
        );
    }
}

export {Snake}
