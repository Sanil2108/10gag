import React, { Component } from 'react'
import './LoginBlock.css';
import getStoreInstance from '../../../Store';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
    GAPI_KEY, USER_KEY
} from '../../../constants';
import { TextField, Button, Snackbar } from '@material-ui/core';
import { authenticateUserWithPassword } from '../../../utils';
import FilledInput from '@material-ui/core/FilledInput';
import MuiAlert from '@material-ui/lab/Alert';

export class LoginBlock extends Component {

    constructor(props) {
        super(props);

        this.state = {
            gapiInitialized: false,
            emailEntered: "",
            passwordEntered: "",
            emailValid: true,
            alertOpen: false,
            alertType: '',
            alertMessage: '',
        }

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

    updateEmailValid() {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        this.setState({
            emailValid: this.state.emailEntered.match(emailRegex) != null,
        });
    }

    updateGapi(newGapi) {
        newGapi.load('auth2', () => {
            let auth2 = newGapi.auth2.init({
                client_id: '156732240229-5dr179koaj2l5uvd2oet8e04h9ir971j.apps.googleusercontent.com',
                cookiepolicy: 'single_host_origin',
            });

            const element = document.querySelector('#google-login-button');
            auth2.attachClickHandler(
                element,
                {},
                (googleUser) => {
                    console.log(googleUser.getAuthResponse().id_token);

                },
                (error) => {
                    console.error(error);
                },
            );

            this.setState({
                gapiInitialized: true,
            });
        });
    }

    componentDidMount() {
        const gapi = getStoreInstance().get(GAPI_KEY);
        if (gapi === null) {
            getStoreInstance().subscribe(GAPI_KEY, (key, oldValue, newValue) => {
                this.updateGapi(newValue);
            });
        }
        else {
            this.setState({gapiInitialized: true});
            this.updateGapi(gapi);
        }
    }

    async loginButtonClick() {
        const authenticationResult = await authenticateUserWithPassword(this.state.emailEntered, this.state.passwordEntered);
        if (authenticationResult.successful) {
            getStoreInstance().updateOrCreate(USER_KEY, {
                email: authenticationResult.email,
                token: authenticationResult.token,
                userName: authenticationResult.userName,
                upvotedPostsIds: authenticationResult.upvotedPostsIds,
                downvotedPostsIds: authenticationResult.downvotedPostsIds,
            });

            this.setState({
                alertType: 'success',
                alertMessage: 'Login successful',
                alertOpen: true,
            })
        }
        else {
            this.setState({
                alertType: 'error',
                alertMessage: authenticationResult.responseMessage,
                alertOpen: true,
            })
        }
    }

    loginButtonEnabled() {
        return this.state.passwordEntered !== '' && this.state.passwordEntered != null &&
            this.state.emailEntered !== '' && this.state.emailEntered != null &&
            this.state.emailValid;
    }

    render() {
        return (
            <div style={{color: "#fff"}} className="SignUpBlock">
            
                <this.textField
                    label="Email"
                    placeholder={'Email'}
                    variant={'filled'}
                    value={this.state.emailEntered}
                    fullWidth
                    style={{
                        marginTop: "10px",
                        width: "70%"
                    }}
                    onChange={(event) => {
                        this.setState({emailEntered: event.target.value})
                        this.updateEmailValid();
                    }}
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
                    label="Password"
                    placeholder={'Password'}
                    variant={'filled'}
                    fullWidth
                    value={this.state.passwordEntered}
                    style={{
                        marginTop: "10px",
                        width: "70%"
                    }}
                    inputProps={{
                        type: 'password'
                    }}
                    onChange={(event) => {
                        this.setState({passwordEntered: event.target.value})
                    }}
                ></this.textField>

                <div className="SignInButtonsContainer">
                    <div className={"GoogleSignInButtonsContainer " + ((this.state.gapiInitialized) ? "GoogleSignInButtonsContainerEnabled" : "GoogleSignInButtonsContainerDisabled")}>
                        <div className="google-sign-in" id="google-login-button">

                        </div>
                    </div>
                </div>

                <Button
                    disabled={!this.loginButtonEnabled()}
                    onClick={this.loginButtonClick.bind(this)}
                >Login</Button>

                <Snackbar open={this.state.alertOpen} autoHideDuration={6000} onClose={() => {this.setState({alertOpen: true})}}>
                    <MuiAlert elevation={6} variant={"filled"} onClose={() => {this.setState({alertOpen: false})}} severity={this.state.alertType}>
                        {this.state.alertMessage}
                    </MuiAlert>
                </Snackbar>
            </div>
        )
    }
}

export default LoginBlock
