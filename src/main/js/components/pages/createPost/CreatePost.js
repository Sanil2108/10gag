import React, { Component } from 'react';
import * as axios from 'axios';

import {
    authenticateUserWithToken,
} from '../../../utils';

import {
    USER_KEY,
    CREATE_POST_URL,
    RESPONSE_TYPE_OK,
    THEME_KEY,
    THEMES,
} from '../../../constants';

import getStoreInstance from '../../../Store';
import TopBar from '../../sharedComponents/TopBar/TopBar';

import './CreatePost.css';
import StandardTextField from '../../sharedComponents/StandardTextField/StandardTextField';

export default class createPost extends Component {
    constructor(props) {
        super(props);

        this.state = {
            postTitle: "",
            postURL: "",
            uploadDialogStyles: {},
            uploadDialogTitleStyles: {},
        }

        window.temp = this;
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

    componentDidMount() {
        getStoreInstance().subscribe(THEME_KEY, (key, oldValue, newValue) => {
            const uploadDialogStyles = THEMES[newValue].CREATE_POST.CREATE_POST_DIALOG;
            console.log(uploadDialogStyles);
            this.setState({uploadDialogStyles : {
                background: uploadDialogStyles.BACKGROUND_COLOR,
            }});

            this.setState({uploadDialogTitleStyles: {
                background: uploadDialogStyles.TITLE_BACKGROUND_COLOR,
                color: uploadDialogStyles.TITLE_TEXT_COLOR,
            }});
        })
    }

    render() {
        return (
            <div>
                <TopBar></TopBar>
                <div className="UploadDialog" style={this.state.uploadDialogStyles}>
                    <div className="UploadDialogTitle" style={this.state.uploadDialogTitleStyles}>
                        Upload image
                    </div>
                    <form>
                        <StandardTextField></StandardTextField>
                        {/* <TextField classes="MyTextField"></TextField> */}
                    </form>
                </div>
            </div>
        )
    }
}
