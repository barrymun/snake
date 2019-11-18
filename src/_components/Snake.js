import React from 'react';

class Snake extends React.Component {

    state = {
        snake: {
            position: `absolute`,
            right: 0,
        },
    };

    componentDidMount() {
        // let id = setInterval(this.move, 1000);
    }

    move = () => {
        let pos = 0;
        let offset = 10;

        this.setState(prevState => ({
            snake: {
                ...prevState.snake,
                right: prevState.snake.right += offset
            }
        }), () => console.log(this.state.snake))
    };

    render() {
        const {snake} = this.state;
        console.log({snake})

        return (
            <div style={{...snake}}>
                snake
            </div>
        );
    }
}

export {Snake}