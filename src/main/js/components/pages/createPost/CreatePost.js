import React, { Component } from 'react';
import * as axios from 'axios';

import {
    authenticateUserWithToken,
    uploadImageToImgur,
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
import { Button, TextField } from '@material-ui/core';

import jss from 'jss'
import preset from 'jss-preset-default'
import { withStyles } from '@material-ui/core/styles';

jss.setup(preset())

export default class createPost extends Component {
    constructor(props) {
        super(props);

        this.state = {
            postTitle: "",
            postURL: "",
            uploadDialogStyles: {},
            uploadDialogTitleStyles: {},
            uploadButtonComponent: withStyles({
                root: {},
                label: {},
            })(Button),
            textFieldComponent: withStyles({
                root: {
                    fontSize: 40,
                    borderRadius: 2,
                    backgroundColor: 'rgba(0,0,0,0.04)',
                    '&:hover': {
                        backgroundColor: 'rgba(0,0,0,0.08)',
                    },
                },
            })(TextField),
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

    changeTheme(newValue) {
        const uploadDialogStyles = THEMES[newValue].CREATE_POST.CREATE_POST_DIALOG;
        // TODO: Replace with one setState call
        this.setState({uploadDialogStyles : {
            background: uploadDialogStyles.BACKGROUND_COLOR,
        }});

        this.setState({uploadDialogTitleStyles: {
            background: uploadDialogStyles.TITLE_BACKGROUND_COLOR,
            color: uploadDialogStyles.TITLE_TEXT_COLOR,
        }});

        this.setState({
            uploadButtonComponent: withStyles({
                root: {
                    backgroundColor: uploadDialogStyles.BUTTON_BACKGROUND,
                },
                label: {
                    color: uploadDialogStyles.BUTTON_TEXT_COLOR,
                }
            })(Button),
        })
    }

    componentDidMount() {
        this.changeTheme(getStoreInstance().get(THEME_KEY));

        getStoreInstance().subscribe(THEME_KEY, (key, oldValue, newValue) => {
            this.changeTheme(newValue);
        });
    }

    handleTitleChange(event) {
        this.setState({postTitle: event.target.value})
    }

    newFileUpload() {
        const file = document.getElementById('file-uploader').files[0];
        const title = this.state.postTitle;

        const reader = new FileReader();
        const scope = this;
        reader.addEventListener("load", async function () {
            let b64String =
                reader.result.slice(reader.result.indexOf("base64") + ("base64").length, reader.result.length);
            const response = await uploadImageToImgur(b64String, title);
            scope.setState({imageURL: response.data.link});
            scope.createPost()
            if (response === false) {
                alert('Something went wrong');
            }
            else {

            }
        }, false);
        reader.readAsDataURL(file);
    }

    render() {
        return (
            <div>
                <TopBar></TopBar>
                <div className="UploadDialog" style={this.state.uploadDialogStyles}>
                    <h1>
                        Upload image
                    </h1>
                    <form>
                        <this.state.textFieldComponent
                            onChange={this.handleTitleChange.bind(this)}
                            label="Title"
                            variant="filled">
                        </this.state.textFieldComponent>

                        <input type="file" id="file-uploader" accept="image/*">
                        </input>
                    </form>

                    <this.state.uploadButtonComponent
                        onClick={this.newFileUpload.bind(this)}
                        variant="contained"
                    >
                        Upload
                    </this.state.uploadButtonComponent>
                </div>
            </div>
        )
    }
}
