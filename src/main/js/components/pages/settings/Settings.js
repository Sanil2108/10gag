import React, { Component } from 'react'

import getStoreInstance from '../../../Store';
import { USER_KEY } from '../../../constants';
import { getUser } from '../../../utils';
import TopBar from '../../sharedComponents/TopBar/TopBar';

export default class Settings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentUser: null,
        };

        this.userChangedCallback = this.userChanged.bind(this);
    }

    userChanged(key, newUser) {
        this.updateWithUser(newUser.userName);
    }

    async updateWithUser(userName) {
        console.log(userName);
        const getUserResult = await getUser(userName);
        console.log(getUserResult);
        this.setState({
            user: (getUserResult) ? getUserResult : null,
        })
    }

    componentDidMount() {
        this.updateWithUser();

        getStoreInstance().subscribe(USER_KEY, this.userChangedCallback);
    }

    componentWillUnmount() {
        getStoreInstance().unsubscribe(USER_KEY, this.userChangedCallback);
    }

    render() {
        return (
            <div>
                <TopBar></TopBar>
                I am in settings
                The user name is {(this.state.user != null) ? this.state.user.userName : "Null bro"} and user email is {(this.state.user != null) ? this.state.user.email : "Null bro2"}
            </div>
        )
    }
}
