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
    FRONT_PAGE_URL,
} from '../../../constants';

import getStoreInstance from '../../../Store';
import TopBar from '../../sharedComponents/TopBar/TopBar';

import './CreatePost.css';
import { Button, TextField, Snackbar } from '@material-ui/core';

import jss from 'jss'
import preset from 'jss-preset-default'
import { withStyles } from '@material-ui/core/styles';
import ShadowButton from '../../sharedComponents/ShadowButton/ShadowButton';
import {DropzoneArea} from 'material-ui-dropzone'
import MuiAlert from '@material-ui/lab/Alert';
import { Redirect } from 'react-router-dom';

jss.setup(preset())

export default class createPost extends Component {
    constructor(props) {
        super(props);

        this.state = {
            imageData: null,
            loading: false,
            alertType:"",
            alertMessage: "",
            alertOpen: false,
            imageFile: null,
            postTitle: "",
            imageURL: "",
            redirectTo: null,
            uploadDialogStyles: {},
            uploadDialogTitleStyles: {},
            uploadFileButtonStyles: {},
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
        if (await authenticateUserWithToken(user.email, user.token)) {
            const createPostRequest = {
                user: {
                    email: user.email,
                    token: user.token,
                },
                post: {
                    title: this.state.postTitle,
                    imageURL: this.state.imageURL,
                }
            };

            const response = await axios.post(CREATE_POST_URL(), createPostRequest);

            if (response.status === 200) {
                if (response.data.responseType === RESPONSE_TYPE_OK) {
                    this.setState({alertOpen: true, alertMessage: "Post uploaded!", alertType: "success", redirectTo: FRONT_PAGE_URL});
                }
                else {
                    this.setState({alertOpen: true, alertMessage: response.data.responseMessage, alertType: "error"});
                }
            }
            this.setState({loading: false});
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

        this.setState({uploadFileButtonStyles: {
            backgroundColor: uploadDialogStyles.UPLOAD_FILE_BUTTON_DARK_BACKGROUND_COLOR,
            hoverBoxShadow: 'inset 0px 0px 10px 30px ' + uploadDialogStyles.UPLOAD_FILE_BUTTON_BACKGROUND_COLOR,
            defaultBoxShadow: 'inset 0px 0px 0px 0px ' + uploadDialogStyles.UPLOAD_FILE_BUTTON_BACKGROUND_COLOR,
        }});
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

    postNewImage() {
        // Assertions
        const user = getStoreInstance().get(USER_KEY);
        if (user == null || user.email == null) {
            this.setState({alertOpen: true, alertMessage: "You are not logged in!", alertType: "error"});
            return;
        }
        if (this.state.imageFile === null) {
            this.setState({alertOpen: true, alertMessage: "You forgot to upload something!", alertType: "error"});
            return;
        }
        if (this.state.postTitle === "" || this.state.postTitle === null) {
            this.setState({alertOpen: true, alertMessage: "You forgot to write a title!", alertType: "error"});
            return;
        }

        this.setState({loading: true});

        const file = this.state.imageFile;
        const title = this.state.postTitle;

        const reader = new FileReader();
        const scope = this;
        reader.addEventListener("load", async function () {
            let b64String =
                reader.result.slice(reader.result.indexOf("base64,") + ("base64,").length, reader.result.length);
            const response = await uploadImageToImgur(b64String, title);
            if (!response) {
                scope.setState({alertOpen: true, alertMessage: "Something went wrong. Please try again later", loading: false});
            }
            else {
                scope.setState({imageURL: response.data.link});
                scope.createPost();
            }
        }, false);
        reader.readAsDataURL(file);
    }

    render() {
        if (this.state.redirectTo != null) {
            return <Redirect push to={this.state.redirectTo}></Redirect>
        }

        let shadowButtonInner = (
            <p>Upload</p>
        );
        if (this.state.loading) {
            shadowButtonInner = (
                <>
                    <img src="https://res.cloudinary.com/dkb1nvu7q/image/upload/v1581182739/loading1.gif"></img>
                    <p style={{visibility: "hidden"}}>Upload</p>
                </>
            )
        }

        // TODO: Rename
        let fileUploadOrImage = '';
        if (this.state.imageData != null) {
            // fileUploadOrImage = <img
            //     className="PreviewImage PreviewImage--show"
            //     src={this.state.imageData}
            // />
        }
        else {
            fileUploadOrImage = (
                <DropzoneArea
                    showPreviewsInDropzone={false}
                    acceptedFiles={["image/*"]}
                    filesLimit={1}
                    maxFileSize={2000000}
                    dropzoneText={"Drop files or click here"}
                    onChange={(files) => {
                        this.setState({imageFile: files[0]})

                        const reader = new FileReader();
                        reader.addEventListener('load', () => {
                            this.setState({imageData: reader.result});
                        });
                        reader.readAsDataURL(files[0]);
                    }}
                ></DropzoneArea>
            );
        }

        return (
            <div>
                <TopBar></TopBar>
                <div className="UploadDialog" style={this.state.uploadDialogStyles}>
                    <h1 style={this.state.headingStyles}>
                        Upload image
                    </h1>

                    <this.state.textFieldComponent
                        onChange={this.handleTitleChange.bind(this)}
                        label="Title"
                        variant="filled"
                        size="small"
                        fullWidth
                    >
                    </this.state.textFieldComponent>
                    <div className="PreviewImageContainer">
                        <img
                            src={(this.state.imageData == null) ? "#" : this.state.imageData}
                            className={"PreviewImage " + ((this.state.imageData == null) ? "PreviewImage--hidden" : "PreviewImage--show")}
                        ></img>
                    </div>
                    {fileUploadOrImage}
                    <ShadowButton
                        onClick={this.postNewImage.bind(this)}
                        backgroundColor={this.state.uploadFileButtonStyles.backgroundColor}
                        hoverBoxShadow={this.state.uploadFileButtonStyles.hoverBoxShadow}
                        defaultBoxShadow={this.state.uploadFileButtonStyles.defaultBoxShadow}
                    >
                        {shadowButtonInner}
                    </ShadowButton>
                </div>

                <Snackbar open={this.state.alertOpen} autoHideDuration={6000} onClose={() => {this.setState({alertOpen: false})}}>
                    <MuiAlert elevation={6} variant={"filled"} onClose={() => {this.setState({alertOpen: false})}} severity={this.state.alertType}>
                        {this.state.alertMessage}
                    </MuiAlert>
                </Snackbar>
            </div>
        )
    }
}
