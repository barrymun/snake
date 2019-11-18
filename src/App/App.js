import React from 'react';
import {connect} from 'react-redux';
import {Snake} from "../_components";

import './App.css';

class App extends React.Component {
    render() {
        return (
            <div>
                <Snake {...this.props}/>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const {
        snake,
    } = state;

    return {
        snake,
    };
};

const c = connect(mapStateToProps)(App);
export {c as App};
