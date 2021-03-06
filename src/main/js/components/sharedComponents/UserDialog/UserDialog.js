import React, { Component } from 'react'
import './UserDialog.css';
import { USER_KEY } from '../../../constants';

import getStoreInstance from '../../../Store';
import SignUpLoginBlock from '../SignUpLoginBlock/SignUpLoginBlock';
import UserInformationBlock from '../UserInformationBlock/UserInformationBlock';

export class UserDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            currentUser: getStoreInstance().get(USER_KEY),
        };
    }

    currentUserChanged(key, oldUser, newUser) {
        this.setState({
            currentUser: newUser,
        });
    }

    componentDidMount() {
        getStoreInstance().subscribe(USER_KEY, this.currentUserChanged.bind(this));
    }

    // async loginUser() {
    //     const authenticationResult = await authenticateUserWithPassword(
    //         this.state.email,
    //         this.state.password,
    //     );
    //     console.log(authenticationResult);
    //     if (authenticationResult) {
    //         getStoreInstance().updateOrCreate(USER_KEY, authenticationResult);
    //     }
    // }

    logoutUser() {
        getStoreInstance().updateOrCreate(USER_KEY, {email: null, userName:null, token: null});
    }

    render() {
        const userDialogVisibilityClass = (this.props.userDialogVisible) ? "UserDialog--show" : "UserDialog--hide"

        if (this.state.currentUser.email === null) {
            return <SignUpLoginBlock
                userDialogClass={userDialogVisibilityClass}
            ></SignUpLoginBlock>
        }
        else {
            return <UserInformationBlock
                userDialogClass={userDialogVisibilityClass}
            ></UserInformationBlock>;
        }
    }
}

export default UserDialog
