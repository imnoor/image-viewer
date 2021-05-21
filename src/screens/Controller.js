import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from '../common/header/Header';
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
                    <Header/>
                    <div className="main-container">
                        <Route exact path='/' render={(props) => <Login {...props} />} />
                        <Route exact path='/home' render={(props) => <Home {...props} />} />
                    </div>
                </Router>
            )
        }
    }

export default Controller;