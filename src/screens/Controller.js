import React, { Component } from 'react';
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
                    </div>
                </Router>
            )
        }
    }

export default Controller;