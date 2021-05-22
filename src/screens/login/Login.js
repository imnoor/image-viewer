
import React, { Component } from 'react';
import './Login.css';
import Header from '../../common/header/Header';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';

// hardcoded the credentials to check as per requiremnt.
const USERNAME = "test";
const PASSWORD = "test";
const ACCESSTOKEN = "8661035776.d0fcd39.39f63ab2f88d4f9c92b0862729ee2784";
class Login extends Component {

    constructor() {
        super();
        this.state = {
            usernameRequired: "dispNone",
            username: "",
            loginPasswordRequired: "dispNone",
            loginPassword: "",
            loggedInFailed: false,
        }
    }
    inputUsernameChangeHandler = (e) => {
        this.setState({ username: e.target.value });
    }

    inputLoginPasswordChangeHandler = (e) => {
        this.setState({ loginPassword: e.target.value });
    }

    loginClickHandler = () => {

        this.state.username === "" ? this.setState({ usernameRequired: "dispBlock" }) : this.setState({ usernameRequired: "dispNone" });
        this.state.loginPassword === "" ? this.setState({ loginPasswordRequired: "dispBlock" }) : this.setState({ loginPasswordRequired: "dispNone" });
        if (this.state.loginPassword === "" || this.state.username === "") {
            return;
        }
        if (this.state.username === USERNAME && this.state.loginPassword === PASSWORD) {
            //Login successful set the access token
            sessionStorage.setItem("access-token", ACCESSTOKEN);
            this.state.loggedInFailed = false;
            //Route towards the home page.
            this.props.history.push('/home');

        } else {
            this.setState({ loggedInFailed: true });
        }

    }

    render() {
        return (
            <div>
                <Header />
                <Card className="login-card" >
                    <div className="login-header">LOGIN</div>
                    <FormControl required>
                        <InputLabel htmlFor="username">Username</InputLabel>
                        <Input id="username" type="text" username={this.state.username} onChange={this.inputUsernameChangeHandler} />
                        <FormHelperText className={this.state.usernameRequired}>
                            <span className="red">required</span>
                        </FormHelperText>
                    </FormControl>
                    <br /><br />
                    <FormControl required>
                        <InputLabel htmlFor="loginPassword">Password</InputLabel>
                        <Input id="loginPassword" type="password" loginpassword={this.state.loginPassword} onChange={this.inputLoginPasswordChangeHandler} />
                        <FormHelperText className={this.state.loginPasswordRequired}>
                            <span className="red">required</span>
                        </FormHelperText>
                    </FormControl>
                    <br /><br />
                    {this.state.loggedInFailed === true &&
                        <FormControl>
                            <span className="red">Incorrect username and/or password</span>
                        </FormControl>
                    }
                    <Button variant="contained" color="primary" onClick={this.loginClickHandler}>LOGIN</Button>
                </Card>
            </div>
        )
    }
}

export default Login;


