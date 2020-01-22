import React, { Component } from 'react'

import {
    NEW_POSTS_URL, POST_PAGE_URL, THEME_KEY,
} from '../../../constants';
import { Link } from 'react-router-dom';
import VoteContainer from './VoteContainer';

import './PostSummary.css';

export class PostSummary extends Component {
    constructor(props) {
        super(props);

        this.state = {
            themeColors: this.props.themeColors,
            post: this.props.post,
        }

        this.setColors();

        if (!window.frontPostState) {
            window.frontPostState = this.state;
        }
    }

    setColors() {
        this.state.currentColors = {};
        if (this.state.post.upvoted) {
            this.state.currentColors.UPVOTE_BUTTON_COLOUR = this.state.themeColors.UPVOTE_SELECTED;
            this.state.currentColors.DOWNVOTE_BUTTON_COLOUR = this.state.themeColors.DOWNVOTE_DESELECTED;
        }
        else if (this.state.post.downvoted) {
            this.state.currentColors.DOWNVOTE_BUTTON_COLOUR = this.state.themeColors.DOWNVOTE_SELECTED;
            this.state.currentColors.UPVOTE_BUTTON_COLOUR = this.state.themeColors.UPVOTE_DESELECTED;
        }
        else {
            this.state.currentColors.DOWNVOTE_BUTTON_COLOUR = this.state.themeColors.DOWNVOTE_DESELECTED;
            this.state.currentColors.UPVOTE_BUTTON_COLOUR = this.state.themeColors.UPVOTE_DESELECTED;
        }
        
        this.state.currentColors = Object.assign(this.state.currentColors, this.state.themeColors);
    }

    updateColorsForSelectDownvote() {
        this.state.currentColors.DOWNVOTE_BUTTON_COLOUR = this.state.themeColors.DOWNVOTE_SELECTED;
    }

    updateColorsForDeselectDownvote() {
        this.state.currentColors.DOWNVOTE_BUTTON_COLOUR = this.state.themeColors.DOWNVOTE_DESELECTED;
    }

    updateColorsForSelectUpvote() {
        this.state.currentColors.UPVOTE_BUTTON_COLOUR = this.state.themeColors.UPVOTE_SELECTED;
    }

    updateColorsForDeselectUpvote() {
        this.state.currentColors.UPVOTE_BUTTON_COLOUR = this.state.themeColors.UPVOTE_DESELECTED;
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
            <div key={"post"+this.state.post.id} className="Post">
                <Link to={POST_PAGE_URL + "/" + this.state.post.id}>
                    <h1>
                        {this.state.post.title}<br />
                    </h1>
                </Link>
                <VoteContainer
                    votes={this.state.post.votes}
                    upvoteColor={this.state.currentColors.UPVOTE_BUTTON_COLOUR}
                    downvoteColor={this.state.currentColors.DOWNVOTE_BUTTON_COLOUR}
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
