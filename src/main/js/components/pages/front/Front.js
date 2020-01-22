import React, { Component } from 'react'

import {
    NEW_POSTS_URL, POST_PAGE_URL, THEME_KEY,
} from '../../../constants';
import TopBar from '../../sharedComponents/TopBar/TopBar';
import { Link } from 'react-router-dom';
import { getPosts } from '../../../utils';

import getStoreInstance from '../../../Store';
import * as constants from '../../../constants';

import './Front.css';
import VoteContainer from './VoteContainer';
import PostSummary from './PostSummary';

export default class Front extends Component {

    constructor(props) {
        super(props);

        const currentThemeColors =  constants.THEMES[getStoreInstance().get(THEME_KEY)].FRONT;

        this.state = {
            posts: [],
            loadingPosts: true,
            currentThemeColors: currentThemeColors,
        };
    }

    componentDidMount() {
        this.loadPosts();
    }

    async loadPosts() {
        this.setState({loadingPosts: true});
        
        const posts = await getPosts();
        this.setState({loadingPosts: false});
        if (posts) {
            this.setState({posts})
        }
    }

    render() {
        const postsToRender = [];
        for (let post of this.state.posts) {
            // TODO: Temp
            post = Object.assign(post, {upvoted: false, downvoted: false})
            
            postsToRender.push(
                <PostSummary
                    post={post}
                    themeColors={this.state.currentThemeColors.FRONT_POST}
                >

                </PostSummary>
            )
        }

        return (
            <div className="Front">
                <div className="FrontPostContainer">
                    {/* <TopBar></TopBar> */}
                    <br />
                    {postsToRender}
                </div>
            </div>
        )
    }
}
