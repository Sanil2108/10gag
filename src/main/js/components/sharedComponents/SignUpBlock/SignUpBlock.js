import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import FilledInput from '@material-ui/core/FilledInput';
import './SignUpBlock.css';
import { Button, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import * as utils from '../../../utils';


export default class SignUpBlock extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            userNameEntered: '',
            emailEntered: '',
            passwordEntered: '',
            emailValid: true,
            userNameValid: true,
            passwordValid: true,
            alertOpen: false,
            alertType: '',
            alertMessage: '',
        };

        this.textField = withStyles(
            {
                root: {
                    fontSize: 12,
                    borderRadius: 2 / 2,
                    backgroundColor: 'rgba(0,0,0,0.04)',
                    '&:hover': {
                        backgroundColor: 'rgba(0,0,0,0.08)',
                    },
                },
                underline: {
                    color: '#fff',
                },
                input: {
                    underline: '#0ff',
                    color: '#fff',
                },
                error: {
                    backgroundColor: 'rgba(255, 0, 0, 0.25)',
                },
                focused: {},
            }
        )(FilledInput)
    }

    async signUpButtonClick() {
        const response = await utils.registerUser(
            this.state.userNameEntered,
            this.state.emailEntered,
            this.state.passwordEntered,
        );
        if (!response.successful) {
            this.setState({
                alertOpen: true,
                alertMessage: response.responseMessage,
                alertType: 'error',
                passwordEntered: '',
            });
        }
        else {
            this.setState({
                alertMessage: 'Sign up successful',
                alertOpen: true,
                alertType: 'success',
                userNameEntered: '',
                passwordEntered: '',
                emailEntered: '',
            });
        }
    }

    updateUserNameValid() {
        const userNameRegex = /(?=.*).{4,}/
        this.setState({
            userNameValid: this.state.userNameEntered.match(userNameRegex) != null,
        });
    }

    updateEmailValid() {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        this.setState({
            emailValid: this.state.emailEntered.match(emailRegex) != null,
        });
    }

    updatePasswordValid() {
        const passwordRegex = /(?=.*\d).{4,}/;
        this.setState({
            passwordValid: this.state.passwordEntered.match(passwordRegex) != null,
        });
    }

    isSignUpButtonEnabled() {
        return this.state.emailEntered && this.state.emailValid &&
            this.state.userNameEntered && this.state.userNameValid &&
            this.state.passwordEntered && this.state.passwordValid;
    }

    render() {
        return (
            <div className="SignUpBlock">

                <this.textField
                    placeholder='Username'
                    variant={'filled'}
                    error={!this.state.userNameValid}
                    fullWidth
                    style={{
                        width: "70%"
                    }}
                    onChange={(e) => {
                        this.setState({userNameEntered: e.target.value})
                        this.updateUserNameValid();
                    }}
                    value={this.state.userNameEntered}
                ></this.textField>
                {this.state.userNameValid}
                <span
                    className="errorMessage"
                    style={{
                        display: ((this.state.userNameValid === true) ? 'none' : 'block')
                    }}
                >
                    Username must be at least 4 characters long
                </span>

                <this.textField
                    placeholder='Email'
                    variant={'filled'}
                    error={!this.state.emailValid}
                    fullWidth
                    style={{
                        marginTop: "10px",
                        width: "70%"
                    }}
                    onChange={(e) => {
                        this.setState({emailEntered: e.target.value})
                        this.updateEmailValid();
                    }}
                    value={this.state.emailEntered}
                ></this.textField>
                
                <span
                    className="errorMessage"
                    style={{
                        display: ((this.state.emailValid === true) ? 'none' : 'block')
                    }}
                >
                    This is not a valid email address
                </span>


                <this.textField
                    placeholder='Password'
                    variant={'filled'}
                    fullWidth
                    error={!this.state.passwordValid}
                    style={{
                        marginTop: "10px",
                        width: "70%"
                    }}
                    inputProps={{
                        type: 'password'
                    }}
                    onChange={(e) => {
                        this.setState({passwordEntered: e.target.value})
                        this.updatePasswordValid();
                    }}
                    value={this.state.passwordEntered}
                ></this.textField>
                
                <span
                    className="errorMessage"
                    style={{
                        display: ((this.state.passwordValid === true) ? 'none' : 'block')
                    }}
                >
                    Password must be at least 4 characters long and include at least one number
                </span>

                <Button
                    onClick={this.signUpButtonClick.bind(this)}
                    disabled={!this.isSignUpButtonEnabled()}
                >
                    Sign up
                </Button>

                <Snackbar open={this.state.alertOpen} autoHideDuration={6000} onClose={() => {this.setState({alertOpen: true})}}>
                    <MuiAlert elevation={6} variant={"filled"} onClose={() => {this.setState({alertOpen: false})}} severity={this.state.alertType}>
                        {this.state.alertMessage}
                    </MuiAlert>
                </Snackbar>
            </div>
        );
    }
}
