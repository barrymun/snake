import React from 'react';
import {store} from "../_helpers";
import actions from "../_actions/snake.actions";

import "./css/Snake.css";

class Snake extends React.Component {

    componentDidMount() {
        const {snake} = this.props;
        console.log({snake})
        let id = setInterval(this.move, snake.speed);
    }

    move = () => {
        let direction = `right`;
        store.dispatch(actions.move(direction));
    };

    render() {
        const {snake} = this.props;
        return (
            <div>
                {snake.parts.map((o, index) =>
                    <div
                        key={index}
                        className={`snakePart`}
                        style={o.style}
                    />
                )}
            </div>
        );
    }
}

export {Snake}