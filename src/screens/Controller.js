import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './home/Home';
import Login from './login/Login';
import Profile from './profile/Profile';
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
                        <Route exact path='/profile' render={(props) => <Profile {...props} />} />
                    </div>
                </Router>
            )
        }
    }

export default Controller;