import React, { Component } from 'react'
import './UserInformationBlock.css';

import getStoreInstance from '../../../Store';
import { USER_KEY } from '../../../constants';
import { Button } from '@material-ui/core';
import ShadowButton from '../ShadowButton/ShadowButton';

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
            <div>
                You are logged in as {(this.state.user !== null) ? this.state.user.userName : "N/A"}<br>
                </br> with email address {(this.state.user !== null) ? this.state.user.email : "N/A"}
            </div>

            <ShadowButton
                onClick={this.logOutUser.bind(this)}
                backgroundColor={"#555"}
                hoverBoxShadow={"inset 0px 0px 10px 30px #333"}
                defaultBoxShadow={"inset 0px 0px 0px 0px #333"}
            >
                <span>
                    Logout
                </span>
            </ShadowButton>

            {/* <Button onClick={}>
                Logout
            </Button> */}
        </div>
        )
    }
}

export default UserInformationBlock
