import React from 'react';
import {connect} from 'react-redux';
import {Snake} from "../_components";

import './App.css';

class App extends React.Component {
    render() {
        return (
            <div>
                <Snake/>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const {
        snake,
    } = state;
    console.log({state})

    return {
        snake,
    };
};

const c = connect(mapStateToProps)(App);
export {c as App};
