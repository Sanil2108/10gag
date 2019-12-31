import React, { Component } from 'react'

import {
    CREATE_POST_PAGE_URL,
    SETTINGS_PAGE_URL,
    FRONT_PAGE_URL,
    USER_KEY,
    THEME_KEY,
} from '../../../constants';

import {
    authenticateUserWithPassword,
    validateThemeSelection,
} from '../../../utils';

import getStoreInstance from '../../../Store';
import { Link, Redirect } from 'react-router-dom';

export default class TopBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "sanilkhurana7@gmail.com",
            password: "root",
            currentUser: getStoreInstance().get(USER_KEY),
            currentTheme: getStoreInstance().get(THEME_KEY),
            redirectTo: null,
        };
    }

    componentDidMount() {
        const scope = this;
        getStoreInstance().subscribe(USER_KEY, (key, value) => {
            scope.setState({
                currentUser: value,
            })
        });
        getStoreInstance().subscribe(THEME_KEY, (key, value) => {
            scope.setState({
                currentTheme: value,
            })
        });
    }

    async loginUser() {
        const authenticationResult = await authenticateUserWithPassword(
            this.state.email,
            this.state.password,
        );
        if (authenticationResult) {
            getStoreInstance().updateOrCreate(USER_KEY, authenticationResult);
        }
    }

    logoutUser() {
        getStoreInstance().updateOrCreate(USER_KEY, {email: null, token: null});
    }

    changeTheme(event) {
        if (validateThemeSelection(event.target.value)) {
            getStoreInstance().updateOrCreate(THEME_KEY, event.target.value);
        }
    }

    render() {
        if (this.state.redirectTo !== null) {
            return <Redirect push to={this.state.redirectTo}></Redirect>
        }

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
                <button onClick={this.logoutUser.bind(this)}>Logout</button>
                <select onChange={this.changeTheme.bind(this)}>
                    <option value="Theme1">Theme 1</option>
                    <option value="Theme2">Theme 2</option>
                    <option value="Theme3">Theme 3</option>
                    <option value="Theme4">Theme 4</option>
                </select>

                <Link to={CREATE_POST_PAGE_URL}>Create post</Link>&nbsp;&nbsp;
                <Link to={SETTINGS_PAGE_URL}>Settings</Link>&nbsp;&nbsp;
                <Link to={FRONT_PAGE_URL}>Front page</Link>

                <br />
                <br />
                <br />
                <br />
            </div>
        )
    }
}
