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
            topBarClass: "",
            topBarColors: {},
        };

        this.currentThemeChangedCallback = this.currentThemeChanged.bind(this);
        this.currentUserChangedCallback = this.currentUserChanged.bind(this);
    }

    currentThemeChanged(key, oldTheme, newTheme) {
        this.setState({
            currentTheme: newTheme,
            topBarColors: THEMES[newTheme].TOPBAR,
        });
    }

    currentUserChanged(key, newUser) {
        this.setState({
            currentUser: newUser,
        });
    }

    componentDidMount() {
        getStoreInstance().subscribe(USER_KEY, this.currentUserChangedCallback);
        getStoreInstance().subscribe(THEME_KEY, this.currentThemeChangedCallback);

        document.addEventListener("wheel", (event) => {
            if (document.body.scrollTop === 0) {
                return;
            }
            if (event.deltaY < 0) {
                this.setState({topBarClass: " TopBar--show"});
            }
            else if (event.deltaY > 0) {
                this.setState({topBarClass: " TopBar--hide"});
            }
        });
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
        console.log(themeNames);
        for (let i = 0; i < themeNames.length; i += 1) {
            elements.push(
                <div>
                    {themeNames[i]}
                </div>
            )
        }
        return elements;
    }

    render() {
        if (this.state.redirectTo !== null) {
            return <Redirect push to={this.state.redirectTo}></Redirect>
        }

        const scope = this;

        const allDropDownThemeOptions = ['Theme1', 'Theme2', 'Theme3'];
        const defaultDropDownOption = 'Theme1';

        return (
            <div className={"TopBar" + this.state.topBarClass}>
                <span className="LeftPaneContainer">
                    <DropDown></DropDown>
                </span>
                <span className="LogoContainer">
                    <Link to={FRONT_PAGE_URL}>
                        9GAG++
                    </Link>
                </span>
                <span className="RightPaneContainer">

                    <span className="RotateButton RightPaneButton">
                        <Link to={CREATE_POST_PAGE_URL} className="RightPaneButton__Link">
                            <img src="https://res.cloudinary.com/dkb1nvu7q/image/upload/v1580033150/plus.svg"></img>
                        </Link>
                    </span>
                    <span className="RotateButton RightPaneButton">
                        <Link to={SETTINGS_PAGE_URL} className="RightPaneButton__Link">
                            <img src="https://res.cloudinary.com/dkb1nvu7q/image/upload/v1580033152/gear_1.svg"></img>
                        </Link>
                    </span>

                    <span className="RightPaneButton">
                        <Link to={SETTINGS_PAGE_URL} className="RightPaneButton__Link">
                            <img src="https://res.cloudinary.com/dkb1nvu7q/image/upload/v1580042222/user_1.svg"></img>
                        </Link>
                    </span>

                </span>
            </div>
        )
    }
}
