import React, { Component } from 'react'
import './UserDialog.css';
import { USER_KEY } from '../../../constants';

import getStoreInstance from '../../../Store';
import SignUpLoginBlock from '../SignUpLoginBlock/SignUpLoginBlock';

export class UserDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "sanilkhurana7@gmail.com",
            password: "root",
            currentUser: getStoreInstance().get(USER_KEY),
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

        if (this.state.currentUser.email === null) {
            return <SignUpLoginBlock
                userDialogClass={userDialogVisibilityClass}
            ></SignUpLoginBlock>
        }
        else {
            return '';
        }
    }
}

export default UserDialog
