import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './home/Home';
import Login from './login/Login';
    class Controller extends Component {

        constructor() {
            super();
            this.state = {
                usernameRequired: "dispNone",
                username: "",
                loginPasswordRequired: "dispNone",
                loginPassword: "",
                registrationSuccess: false,
            }
        }
        render() {
            return (
                <Router>
                    <div className="main-container">
                        <Route exact path='/' render={(props) => <Login {...props} />} />
                        <Route exact path='/home' render={(props) => <Home {...props} />} />
                    </div>
                </Router>
            )
        }
    }

export default Controller;