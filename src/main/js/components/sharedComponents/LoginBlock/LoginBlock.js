import React, { Component } from 'react'
import './LoginBlock.css';
import getStoreInstance from '../../../Store';
import {
    GAPI_KEY
} from '../../../constants';

export class LoginBlock extends Component {

    constructor(props) {
        super(props);

        this.state = {
            gapiInitialized: false,
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
                LoginBlock block here

                <div className="SignInButtonsContainer">
                    <p style={{display: "none"}}>
                        This is not a great way, find a better way
                    </p>
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
