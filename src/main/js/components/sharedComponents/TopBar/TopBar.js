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

import ThemeDropDown from '../ThemeDropDown/ThemeDropDown';
import UserDialog from '../UserDialog/UserDialog';

export default class TopBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            currentUser: getStoreInstance().get(USER_KEY),
            currentTheme: getStoreInstance().get(THEME_KEY),
            redirectTo: null,
            topBarClass: "",
            topBarColors: {},
            userDialogVisible: false,
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

    // TODO: oldUser would come first
    currentUserChanged(key, oldUser, newUser) {
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

    changeTheme(event) {
        if (validateThemeSelection(event.target.value)) {
            getStoreInstance().updateOrCreate(THEME_KEY, event.target.value);
        }
    }

    toggleUserDialog() {
        this.setState({userDialogVisible: !this.state.userDialogVisible});
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
        return elements;
    }

    render() {
        if (this.state.redirectTo !== null) {
            return <Redirect push to={this.state.redirectTo}></Redirect>
        }

        let userDialog = '';
        if (this.state.userDialogVisible) {
            userDialog = <UserDialog userDialogVisible={this.state.userDialogVisible}></UserDialog>
        }

        return (
            <div
                className={"TopBar" + this.state.topBarClass}
                style={{
                    "--box-shadow-color": this.state.topBarColors.SHADOW_COLOR
                }}
            >
                <span className="LeftPaneContainer">
                    <ThemeDropDown></ThemeDropDown>
                </span>
                <span className="LogoContainer">
                    <Link to={FRONT_PAGE_URL}>
                        10Gag
                    </Link>
                </span>
                <span className="RightPaneContainer">

                    <span className="RotateButton RightPaneButton">
                        <Link to={CREATE_POST_PAGE_URL} className="RightPaneButton__Link">
                            <img src="https://res.cloudinary.com/dezfx8pnt/image/upload/v1611111277/10gag/add-white-18dp_bsprss.svg"></img>
                        </Link>
                    </span>
                    <span className="RotateButton RightPaneButton">
                        <Link to={SETTINGS_PAGE_URL} className="RightPaneButton__Link">
                            <img src="https://res.cloudinary.com/dezfx8pnt/image/upload/v1611111279/10gag/settings-white-18dp_szldko.svg"></img>
                        </Link>
                    </span>

                    <span>
                        <span className="RightPaneButton">
                            <Link to="#" className="RightPaneButton__Link" onClick={this.toggleUserDialog.bind(this)}>
                                <img src="https://res.cloudinary.com/dezfx8pnt/image/upload/v1611111281/10gag/person-white-18dp_wgurbf.svg"></img>
                            </Link>
                        </span>
                        {userDialog}
                    </span>

                </span>
            </div>
        )
    }
}
