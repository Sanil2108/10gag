import React, { Component } from 'react';
import * as axios from 'axios';

import {
    authenticateUserWithToken,
} from '../../../utils';

export default class createPost extends Component {
    constructor(props) {
        super(props);

        this.state = {
            postTitle: "",
            postURL: "",
        }
    }

    createPost() {
        if (await authenticateUserWithToken()) {

        }
    }

    render() {
        const scope = this;
        return (
            <div>
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
                <button>Create post</button>
                I am in create post
            </div>
        )
    }
}
