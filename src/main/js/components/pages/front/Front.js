import React, { Component } from 'react'

import * as axios from 'axios';

import {
    NEW_POSTS_URL,
} from '../../../constants';

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

    loadPosts() {
        this.setState({loadingPosts: true});

        const scope = this;

        axios.get(NEW_POSTS_URL, {}).then((response) => {
            scope.setState({
                posts: response.data,
            })
        }).catch((error) => {
            console.error(error);
        }).finally(()=>{
            scope.setState({loadingPosts: false})
        })
    }

    render() {
        return (
            <div>
                I am in front
                <br />
                Posts - 
                {JSON.stringify(this.state.loadingPosts)}
                {JSON.stringify(this.state.posts)}
            </div>
        )
    }
}
