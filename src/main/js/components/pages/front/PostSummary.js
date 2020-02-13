import React, { Component } from 'react'

import {
    NEW_POSTS_URL, POST_PAGE_URL, THEME_KEY, THEMES, USER_KEY
} from '../../../constants';
import {
    sendUpvotePostRequest,
    sendDownvotePostRequest,
} from '../../../utils';
import { Link } from 'react-router-dom';
import VoteContainer from './VoteContainer';
import getStoreInstance from '../../../Store';

import './PostSummary.css';

export class PostSummary extends Component {
    constructor(props) {
        super(props);

        this.state = {
            post: this.props.post,
            postSummaryStyleObject: {},
        };

        window.postSummary = this;
    }

    componentDidMount() {
        getStoreInstance().subscribe(THEME_KEY, this.themeChanged.bind(this));
        getStoreInstance().subscribe(USER_KEY, this.userChanged.bind(this));

        this.themeChanged(THEME_KEY, null, getStoreInstance().get(THEME_KEY));
        this.userChanged(USER_KEY, null, getStoreInstance().get(USER_KEY));
    }

    userChanged(key, oldValue, newUser) {
        if (newUser == null || newUser.email == null) {
            this.setState({
                upvoted: false,
                downvoted: false,
            })
            return;
        }
        console.log(newUser);
        this.setState({
            upvoted: newUser.upvotedPostsIds.indexOf(this.state.post.id) !== -1,
            downvoted: newUser.downvotedPostsIds.indexOf(this.state.post.id) !== -1,
        })
    }

    themeChanged(key, oldValue, newValue) {
        const postSummaryStylingInformation = THEMES[newValue].FRONT.POST_SUMMARY;

        const tempPostSummaryStyleObject = {};
        if (postSummaryStylingInformation.BACKGROUND_COLOR) {
            tempPostSummaryStyleObject.backgroundColor = postSummaryStylingInformation.BACKGROUND_COLOR;
        }
        this.setState({postSummaryStyleObject: tempPostSummaryStyleObject});
    }

    onUpvotePost() {
        sendUpvotePostRequest(
            this.props.post.id,
            getStoreInstance().get(USER_KEY).email,
            getStoreInstance().get(USER_KEY).token,
        );
        if (this.state.upvoted) {
            this.setState({
                upvoted: false,
                post: Object.assign(this.state.post, {votes: this.state.post.votes - 1}),
            });
            return;
        }
        if (this.state.downvoted) {
            this.setState({
                downvoted: false,
                post: Object.assign(this.state.post, {votes: this.state.post.votes + 1}),
            });
        }
        this.setState({
            upvoted: true,
            post: Object.assign(this.state.post, {votes: this.state.post.votes + 1}),
        });
    }

    onDownvotePost() {
        sendDownvotePostRequest(
            this.props.post.id,
            getStoreInstance().get(USER_KEY).email,
            getStoreInstance().get(USER_KEY).token,
        );
        if (this.state.downvoted) {
            this.setState({
                downvoted: false,
                post: Object.assign(this.state.post, {votes: this.state.post.votes + 1}),
            });
            return;
        }
        if (this.state.upvoted) {
            this.setState({
                upvoted: false,
                post: Object.assign(this.state.post, {votes: this.state.post.votes - 1}),
            });
        }
        this.setState({
            downvoted: true,
            post: Object.assign(this.state.post, {votes: this.state.post.votes - 1}),
        });
    }

    render() {
        return (
            <div key={"post"+this.state.post.id} className="Post" style={this.state.postSummaryStyleObject}> 
                <Link to={POST_PAGE_URL + "/" + this.state.post.id}>
                    <h1>
                        {this.state.post.title}<br />
                    </h1>
                    <img src={this.state.post.imageURL} height="200"></img>
                </Link>
                <VoteContainer
                    votes={this.state.post.votes}
                    onDownvote={this.onDownvotePost.bind(this)}
                    onUpvote={this.onUpvotePost.bind(this)}
                    upvoteSelected={this.state.upvoted}
                    downvoteSelected={this.state.downvoted}
                ></VoteContainer>
            </div>
        )
    }
}

export default PostSummary
