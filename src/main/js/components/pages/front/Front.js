import React, { Component } from 'react'

import * as axios from 'axios';

import {
    NEW_POSTS_URL, POST_PAGE_URL,
} from '../../../constants';
import TopBar from '../../sharedComponents/TopBar/TopBar';
import { Link } from 'react-router-dom';
import { getPosts } from '../../../utils';

export default class Front extends Component {

    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            loadingPosts: true,
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
            postsToRender.push(
                <div key={"post"+post.id}>
                    <Link to={POST_PAGE_URL + "/" + post.id}>{post.title}</Link><br />
                    <img src={post.imageURL} height="200"></img>
                </div>
            )
        }

        return (
            <div>
                <TopBar></TopBar>
                I am in front
                <br />
                Posts - 
                {postsToRender}
            </div>
        )
    }
}
