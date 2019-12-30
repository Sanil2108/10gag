import React, { Component } from 'react'
import * as axios from 'axios';

import { LOGIN_USER_URL, RESPONSE_TYPE_OK } from '../../../constants';

export default class TopBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "sanilkhurana7@gmail.com",
            password: "root",
            currentUser: this.props.currentUser,
            currentTheme: this.props.currentTheme,
        };
    }

    static getDerivedStateFromProps(props, state) {
        const stateChanges = {};

        if (state.currentUser != props.currentUser) {
            stateChanges.currentUser = props.currentUser;
        }
        if (state.currentTheme != props.currentTheme) {
            stateChanges.currentTheme = props.currentTheme;
        }

        if (stateChanges === {}) {
            return null;
        }
        return Object.assign(state, stateChanges);
    }

    loginUser() {
        const loginRequest = {
            "email": this.state.email,
            "password": this.state.password,
        }

        const scope = this;

        axios.post(LOGIN_USER_URL, loginRequest).then((response) => {
            if (response.data.responseType === RESPONSE_TYPE_OK) {
                scope.props.loginUserFunction(scope.state.email, response.data.token.token);
            }
            else {
                console.error(response.data.responseMessage);
            }

        }).catch((error) => {
            console.error(error);
        });
    }

    render() {
        const scope = this;

        return (
            <div>
                I am in top bar and the current user email is {(this.state.currentUser !== null) ? 
                    this.state.currentUser.email : "Null bro."} and the current theme is {this.state.currentTheme} <br />
                Email <input type="text" value={this.state.email} onChange={(e) => {
                    scope.setState({email: e.target.value});
                }} />
                Password <input type="text" value={this.state.password} onChange={(e) => {
                    scope.setState({password: e.target.value});
                }} />
                <button onClick={this.loginUser.bind(this)}>Login</button>
                <button onClick={this.props.logoutUserFunction}>Logout</button>
                <select onChange={(e)=>{this.props.changeThemeFunction(e.target.value)}}>
                    <option value="Theme1">Theme 1</option>
                    <option value="Theme2">Theme 2</option>
                    <option value="Theme3">Theme 3</option>
                    <option value="Theme4">Theme 4</option>
                </select>

                <br />
                <br />
                <br />
                <br />
            </div>
        )
    }
}
