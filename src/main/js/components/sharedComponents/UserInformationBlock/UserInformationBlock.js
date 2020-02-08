import React, { Component } from 'react'
import './UserInformationBlock.css';

import getStoreInstance from '../../../Store';
import { USER_KEY } from '../../../constants';
import { Button } from '@material-ui/core';

export class UserInformationBlock extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null,
        }
    }

    componentDidMount() {
        getStoreInstance().subscribe(USER_KEY, (key, oldUser, newUser) => {
            this.setState({
                user: newUser,
            });
        });


        this.setState({
            user: getStoreInstance().get(USER_KEY),
        });
    }

    logOutUser() {
        getStoreInstance().updateOrCreate(USER_KEY, {email: null, token: null, userName: null});
    }

    render() {
        return (<div className={"UserDialog UserDialog__information " + this.props.userDialogClass}>
            <span>
                email: {(this.state.user !== null) ? this.state.user.email : "N/A"}
                username: {(this.state.user !== null) ? this.state.user.userName : "N/A"}
                token: {(this.state.user !== null) ? this.state.user.token : "N/A"}
            </span>

            <Button onClick={this.logOutUser.bind(this)}>
                Logout
            </Button>
        </div>
        )
    }
}

export default UserInformationBlock
