import React, { Component } from 'react'

import {
    NEW_POSTS_URL, POST_PAGE_URL, THEME_KEY, THEMES
} from '../../../constants';
import TopBar from '../../sharedComponents/TopBar/TopBar';
import { Link } from 'react-router-dom';
import { getPosts } from '../../../utils';

import getStoreInstance from '../../../Store';
import * as constants from '../../../constants';

import './Front.css';
import VoteContainer from './VoteContainer';
import PostSummary from './PostSummary';
import FrontTopPostsDialog from './FrontTopPostsDialog';

export default class Front extends Component {

    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            loadingPosts: true,
            frontStyleObject: {},
        };
    }

    componentDidMount() {
        this.loadPosts();

        getStoreInstance().subscribe(THEME_KEY, this.themeChanged.bind(this));
    }

    async loadPosts() {
        this.setState({loadingPosts: true});
        
        const posts = await getPosts();
        this.setState({loadingPosts: false});
        if (posts) {
            this.setState({posts})
        }
    }

    themeChanged(key, oldValue, newValue) {
        console.log(newValue);
        const frontStylingInformation = THEMES[newValue].FRONT;

        const tempFrontStyleObject = {};
        if (frontStylingInformation.BACKGROUND_COLOR) {
            tempFrontStyleObject.backgroundColor = frontStylingInformation.BACKGROUND_COLOR;
        }
        if (frontStylingInformation.OPACITY) {
            tempFrontStyleObject.opacity = frontStylingInformation.OPACITY;
        }
        this.setState({frontStyleObject: tempFrontStyleObject});
    }

    render() {
        const postsToRender = [];
        for (let post of this.state.posts) {
            // TODO: Temp
            post = Object.assign(post, {upvoted: false, downvoted: false})
            
            postsToRender.push(
                <PostSummary post={post}>
                </PostSummary>
            )
        }

        return (
            <div className="Front">
                <TopBar></TopBar>
                <div className="ContentContainer">
                    <div className="FrontPostContainer" style={this.state.frontStyleObject}>
                        <br />
                        {postsToRender}
                    </div>
                    <div className="FrontSideBar" style={this.state.frontStyleObject}>
                        <FrontTopPostsDialog></FrontTopPostsDialog>
                    </div>
                </div>
            </div>
        )
    }
}
