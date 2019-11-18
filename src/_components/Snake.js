import React from 'react';
import {store} from "../_helpers";
import snakeActions from "../_actions/snake.actions";

class Snake extends React.Component {

    componentDidMount() {
        console.log(this.props)
        // let id = setInterval(this.move, 1000);
    }

    move = () => {
        const {snake} = this.props;
        let pos = 0;
        let offset = 10;
        let direction = `left`;

        store.dispatch(snakeActions.move(direction, snake.style[direction] + offset));

        // this.setState(prevState => ({
        //     snake: {
        //         ...prevState.snake,
        //         right: prevState.snake.right += offset
        //     }
        // }), () => console.log(this.props.snake))
    };

    render() {
        const {snake} = this.props;
        return (
            <div style={{...snake.style}}>
                snake
            </div>
        );
    }
}

export {Snake}