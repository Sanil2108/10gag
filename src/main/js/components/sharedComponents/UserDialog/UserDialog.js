import React, { Component } from 'react'
import './UserDialog.css';
import { USER_KEY } from '../../../constants';

import getStoreInstance from '../../../Store';
import SignUpBlock from '../SignUpBlock/SignUpBlock';
import LoginBlock from '../LoginBlock/LoginBlock';

const SIGN_UP_TAB = 'SignUpTab';
const LOGIN_TAB = 'LoginTab';

export class UserDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "sanilkhurana7@gmail.com",
            password: "root",
            currentUser: getStoreInstance().get(USER_KEY),
            currentUserDialogClass: "",
            currentTab: SIGN_UP_TAB,
        };
    }

    currentUserChanged(key, newUser) {
        this.setState({
            currentUser: newUser,
        });
    }

    componentDidMount() {
        getStoreInstance().subscribe(USER_KEY, this.currentUserChanged.bind(this));
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

    render() {
        const userDialogVisibilityClass = (this.props.userDialogVisible) ? "UserDialog--show" : "UserDialog--hide"

        let userDialog = '';
        if (this.props.userDialogVisible !== null) {
            if (this.state.currentUser.email === null) {
            }
            else {
            }

            userDialog = (
            <div className={"UserDialog " + userDialogVisibilityClass}>
                <span>
                    
                </span>
                <div className="UserDialog__Tabs">
                    <span className={(this.state.currentTab === SIGN_UP_TAB) ? "UserDialog__Tabs--selected" : ""}>
                        Sign Up
                        <span className={(this.state.currentTab === SIGN_UP_TAB) ? "underlineHighlight" : ""}></span>
                    </span>
                    <span className={(this.state.currentTab === LOGIN_TAB) ? "UserDialog__Tabs--selected" : ""}>
                        Login
                        <span className={(this.state.currentTab === LOGIN_TAB) ? "underlineHighlight" : ""}></span>
                    </span>
                </div>

                {(this.state.currentTab === SIGN_UP_TAB) ? <SignUpBlock></SignUpBlock> : <LoginBlock></LoginBlock>}
            </div>
            );
        }
        else {
        }

        return (
            userDialog
        )
    }
}

export default UserDialog
