
import React, { Component } from 'react';
import './Home.css';

// hardcoded the credentials to check as per requiremnt.
class Home extends Component {
    
    constructor() {
        super();
        this.state = {
            someText:"Am Home!"
        }
    }
    render() {
        return (
            <div>{this.state.someText}</div>
        )
    }
}

export default Home;


