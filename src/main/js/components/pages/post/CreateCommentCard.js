import React, { Component } from 'react'
import {
    THEMES,
    THEME_KEY,
    USER_KEY,
} from '../../../constants';

import getStoreInstance from '../../../Store';
import './CreateCommentCard.css';
import ShadowButton from '../../sharedComponents/ShadowButton/ShadowButton';
import { CSSTransition } from 'react-transition-group';
import {
    sendCreateCommentRequest,
} from '../../../utils';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

export class CommentCard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            textareaBackground: '',
            backgroundColor: '',
            currentUser: getStoreInstance().get(USER_KEY),
            firstAction: true,
            commentText: '',
            loading: false,
            alertOpen: false,
            alertMessage: "",
            alertType: "",
        };
    }

    updateWithNewThemeColours(themeName) {
        this.setState({
            textareaBackground: THEMES[themeName].POST.COMMENT_CARD.TEXT_AREA_BACKGROUND_COLOR,
            backgroundColor: THEMES[themeName].POST.COMMENT_CARD.BACKGROUND_COLOR,
        })
    }

    componentDidMount() {
        getStoreInstance().subscribe(THEME_KEY, (key, oldValue, newValue) => {
            this.updateWithNewThemeColours(newValue);
        });

        this.updateWithNewThemeColours(getStoreInstance().get(THEME_KEY));

        getStoreInstance().subscribe(USER_KEY, (key, oldValue, newValue) => {
            this.setState({
                currentUser: newValue,
                firstAction: false,
            })
        });
    }

    async postComment() {
        if (this.state.commentText === '' || this.state.commentText == null) {
            this.setState({
                alertMessage: "You forgot to write something!",
                alertOpen: true,
                alertType: 'error',
            });
            return;
        }

        this.setState({loading: true});
        await sendCreateCommentRequest(
            this.state.commentText,
            getStoreInstance().get(USER_KEY).email,
            getStoreInstance().get(USER_KEY).token,
            this.props.postId,
        );
        this.setState({
            alertOpen: true,
            alertMessage: "Posted your comment",
            alertType: 'success',
        });
        await new Promise((r) => {setTimeout(r, 2000)});

        location.reload();
    }

    render() {
        let shadowButtonInner = <p>Post</p>;
        if (this.state.loading) {
            shadowButtonInner = (
                <>
                    <img src="https://res.cloudinary.com/dezfx8pnt/image/upload/v1611111032/10gag/loading1_gsgfu5.gif"></img>
                    <p style={{visibility: "hidden"}}>Upload</p>
                </>
            )
        }

        return (
            <CSSTransition
                in={this.state.currentUser != null && this.state.currentUser.email != null}
                timeout={500}
                classNames="CreateCommentCard"
            >
                <div
                    className="CreateCommentCard"
                    style={{
                        backgroundColor: this.state.backgroundColor,
                        display: (this.state.firstAction == true && (this.state.currentUser == null || this.state.currentUser.email == null)) ? "none" : ""
                    }}
                >
                    <span className="CreateCommentCard__information">
                        <textarea
                            style={{
                                background: this.state.textareaBackground,
                            }}
                            onChange={(event) => {this.setState({commentText: event.target.value})}}
                            placeholder="Write your comment here!"
                        ></textarea>
                    </span>

                    <ShadowButton
                            onClick={this.postComment.bind(this)}
                            backgroundColor={"#b92929"}
                            hoverBoxShadow={"inset 0px 0px 10px 30px #942020"}
                            defaultBoxShadow={"inset 0px 0px 0px 0px #942020"}
                        >
                        {shadowButtonInner}
                    </ShadowButton>

                    <Snackbar open={this.state.alertOpen} autoHideDuration={6000} onClose={() => {this.setState({alertOpen: false})}}>
                        <MuiAlert elevation={6} variant={"filled"} onClose={() => {this.setState({alertOpen: false})}} severity={this.state.alertType}>
                            {this.state.alertMessage}
                        </MuiAlert>
                    </Snackbar>
                </div>
            </CSSTransition>
        )
    }
}

export default CommentCard
