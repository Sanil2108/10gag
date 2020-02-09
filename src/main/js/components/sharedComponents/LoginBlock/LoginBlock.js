import React, { Component } from 'react'
import './LoginBlock.css';
import getStoreInstance from '../../../Store';
import {
    GAPI_KEY, USER_KEY
} from '../../../constants';
import { TextField, Button } from '@material-ui/core';
import { authenticateUserWithPassword } from '../../../utils';

export class LoginBlock extends Component {

    constructor(props) {
        super(props);

        this.state = {
            gapiInitialized: false,
            emailEntered: "sanilkhurana7@gmail.com",
            passwordEntered: "root",
        }
    }

    componentDidMount() {
        const gapi = getStoreInstance().get(GAPI_KEY);
        if (gapi === null) {
            getStoreInstance().subscribe(GAPI_KEY, (key, oldValue, newValue) => {
                newValue.load('auth2', () => {
                    let auth2 = newValue.auth2.init({
                        client_id: '156732240229-5dr179koaj2l5uvd2oet8e04h9ir971j.apps.googleusercontent.com',
                        cookiepolicy: 'single_host_origin',
                    });

                    const element = document.querySelector('#google-login-button');
                    auth2.attachClickHandler(
                        element,
                        {},
                        (googleUser) => {
                            console.log(googleUser);
                        },
                        (error) => {
                            console.error(error);
                        },
                    );

                    this.setState({
                        gapiInitialized: true,
                    });
                });
                
            })
        }
    }

    render() {
        return (
            <div style={{color: "#fff"}} className="LoginBlock">
            
                <TextField
                    label="Email"
                    onChange={(event) => {this.setState({emailEntered: event.target.value})}}
                ></TextField>
                <TextField
                    label="Password"
                    onChange={(event) => {this.setState({passwordEntered: event.target.value})}}
                ></TextField>

                <Button onClick={async () => {
                    const authenticationResult = await authenticateUserWithPassword(this.state.emailEntered, this.state.passwordEntered);
                    if (authenticationResult.successful) {
                        getStoreInstance().updateOrCreate(USER_KEY, {
                            email: authenticationResult.email,
                            token: authenticationResult.token,
                            userName: authenticationResult.userName,
                        });
                    }
                    else {
                        alert(authenticationResult.responseMessage);
                        console.error(authenticationResult.responseMessage);
                    }
                }}
                >Login</Button>

                <div className="SignInButtonsContainer">
                    <div className={"GoogleSignInButtonsContainer " + ((this.state.gapiInitialized) ? "GoogleSignInButtonsContainerEnabled" : "GoogleSignInButtonsContainerDisabled")}>
                        <div className="google-sign-in" id="google-login-button">

                        </div>
                    </div>

                    <div className="facebook-sign-in">
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginBlock
