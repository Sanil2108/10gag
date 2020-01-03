import React, { Component } from 'react';
import * as axios from 'axios';

import {
    authenticateUserWithToken,
} from '../../../utils';

import {
    USER_KEY,
    CREATE_POST_URL,
    RESPONSE_TYPE_OK,
} from '../../../constants';

import getStoreInstance from '../../../Store';
import TopBar from '../../sharedComponents/TopBar/TopBar';

export default class createPost extends Component {
    constructor(props) {
        super(props);

        this.state = {
            postTitle: "",
            postURL: "",
        }
    }

    async createPost() {
        let user = getStoreInstance().get(USER_KEY);
        if (user === null) {
            // TODO: Throw proper error here. No user logged in
            console.error("CreatePost - No user logged in.");
            return;
        }
        if (await authenticateUserWithToken(user.email, user.token)) {
            const createPostRequest = {
                user,
                post: {
                    title: this.state.postTitle,
                    imageURL: this.state.postURL,
                }
            };

            const response = await axios.post(CREATE_POST_URL(), createPostRequest);

            if (response.status === 200) {
                if (response.data.responseType === RESPONSE_TYPE_OK) {
                    console.log("Post created!");
                }
                else {
                    console.error(response.data.responseMessage);
                }
            }
        }
    }

    render() {
        const scope = this;
        return (
            <div>
                <TopBar></TopBar>
                Title: <input
                    type="text"
                    value={this.state.postTitle}
                    onChange={(e) => {scope.setState({postTitle: e.target.value})}}
                ></input><br />
                URL: <input
                    type="text"
                    value={this.state.postURL}
                    onChange={(e) => {scope.setState({postURL: e.target.value})}}
                ></input><br />
                <button onClick={this.createPost.bind(this)}>Create post</button>
                I am in create post
            </div>
        )
    }
}
