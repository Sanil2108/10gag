import React, { Component } from 'react'

import {
    NEW_POSTS_URL, POST_PAGE_URL, THEME_KEY, THEMES
} from '../../../constants';
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
        }
    }

    componentDidMount() {
        getStoreInstance().subscribe(THEME_KEY, this.themeChanged.bind(this));
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
        if (this.state.upvoted) {
            this.state.upvoted = false;
            this.state.post.votes -= 1;
            this.updateColorsForDeselectUpvote();
            return;
        }
        if (this.state.post.downvoted) {
            this.state.post.downvoted = false;
            this.state.post.votes += 1;
            this.updateColorsForDeselectDownvote();
        }
        this.state.upvoted = true;
        this.state.post.votes += 1;
        this.updateColorsForSelectUpvote();
    }

    onDownvotePost() {
        if (this.state.downvoted) {
            this.state.downvoted = false;
            this.state.post.votes += 1;
            this.updateColorsForDeselectDownvote();
            return;
        }
        if (this.state.post.upvoted) {
            this.state.post.upvoted = false;
            this.state.post.votes -= 1;
            this.updateColorsForDeselectUpvote();
        }
        this.state.downvoted = true;
        this.state.post.votes -= 1;
        this.updateColorsForSelectDownvote();
    }

    render() {
        return (
            <div key={"post"+this.state.post.id} className="Post" style={this.state.postSummaryStyleObject}>
                <Link to={POST_PAGE_URL + "/" + this.state.post.id}>
                    <h1>
                        {this.state.post.title}<br />
                    </h1>
                </Link>
                <VoteContainer
                    votes={this.state.post.votes}
                    // upvoteColor={this.state.currentColors.UPVOTE_BUTTON_COLOUR}
                    // downvoteColor={this.state.currentColors.DOWNVOTE_BUTTON_COLOUR}
                    // voteTextColor={}
                    onDownvote={this.onDownvotePost.bind(this)}
                    onUpvote={this.onUpvotePost.bind(this)}
                    ></VoteContainer>
                <img src={this.state.post.imageURL} height="200"></img>
            </div>
        )
    }
}

export default PostSummary
