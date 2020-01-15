import React, { Component } from 'react'

import {
    CREATE_POST_PAGE_URL,
    SETTINGS_PAGE_URL,
    FRONT_PAGE_URL,
    USER_KEY,
    THEME_KEY,
    THEMES,
} from '../../../constants';

import {
    authenticateUserWithPassword,
    validateThemeSelection,
} from '../../../utils';

import getStoreInstance from '../../../Store';
import { Link, Redirect } from 'react-router-dom';

import './TopBar.css';

import DropDown from '../DropDown/DropDown';

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

        this.currentThemeChangedCallback = this.currentThemeChanged.bind(this);
        this.currentUserChangedCallback = this.currentUserChanged.bind(this);
    }

    currentThemeChanged(key, newTheme) {
        this.setState({
            currentTheme: newTheme,
        });
    }

    currentUserChanged(key, newUser) {
        this.setState({
            currentUser: newUser,
        });
    }

    componentDidMount() {
        const scope = this;
        getStoreInstance().subscribe(USER_KEY, this.currentUserChangedCallback);
        getStoreInstance().subscribe(THEME_KEY, this.currentThemeChangedCallback);
    }

    componentWillUnmount() {
        getStoreInstance().unsubscribe(USER_KEY, this.currentUserChangedCallback);
        getStoreInstance().unsubscribe(THEME_KEY, this.currentThemeChangedCallback);
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

    getThemeDropDownElements() {
        const elements = [];
        const themeNames = Object.keys(THEMES);
        for (let i = 0; i < themeNames.length; i += 1) {
            elements.push(
                <div>
                    {themeNames[i]}
                </div>
            )
        }
    }

    render() {
        if (this.state.redirectTo !== null) {
            return <Redirect push to={this.state.redirectTo}></Redirect>
        }

        const scope = this;

        const allDropDownThemeOptions = ['Theme1', 'Theme2', 'Theme3'];
        const defaultDropDownOption = 'Theme1';

        return (
            <div className="TopBar">
                <DropDown
                    getChildrenElements={this.getThemeDropDownElements.bind(this)}
                    allOptions={allDropDownThemeOptions}
                    defaultOption={defaultDropDownOption}
                ></DropDown>

                I am in top bar and the current user email is {(this.state.currentUser !== null) ? 
                    this.state.currentUser.email : "Null bro."} and the current theme is {this.state.currentTheme}. Also the current username is {(this.state.currentUser !== null) ? 
                        this.state.currentUser.userName : "Null bro."}<br></br>
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

                <Link to={CREATE_POST_PAGE_URL} className="MyLink">
                    <i className="MyMaterialIcon">
                        add
                    </i>
                </Link>&nbsp;&nbsp;
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
