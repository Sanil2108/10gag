import React, { Component } from 'react'
import TopBar from '../../sharedComponents/TopBar/TopBar'
import {
    getPost,
    sendUpvotePostRequest,
    sendDownvotePostRequest,
} from '../../../utils';
import getStoreInstance from '../../../Store';
import {
    USER_KEY
} from '../../../constants';
import './Post.css';

export default class Post extends Component {

    constructor(props) {
        super(props);

        this.state = {
            postId: props.match.params.postId,
            voting: false,
            upvoted: false,
            downvoted: false,
        }
    }

    async updateWithCurrentPost() {
        const post = await getPost(this.state.postId);
        this.setState({
            postTitle: post.title,
            postVotes: post.votes,
            postImageURL: post.imageURL,
            postComments: post.comments,
        });

        console.log(this.state.post);
    }

    componentDidMount() {
        this.updateWithCurrentPost();
    }

    async downvotePost() {
        this.setState({voting: true});
        // TODO: Check if user is not logged in
        const user = getStoreInstance().get(USER_KEY);
        const downvoted = await sendDownvotePostRequest(
            this.state.postId,
            user.email,
            user.token,
        );
        this.setState({voting: false});
        if (downvoted instanceof Error) {
            console.error(downvoted)
        }
        else {
            if (this.state.downvoted) {
                this.setState({downvoted: false, postVotes: this.state.postVotes + 1})
            }
            else if (this.state.upvoted) {
                this.setState({upvoted: false, downvoted: true, postVotes: this.state.postVotes - 2})
            }
            else {
                this.setState({downvoted: true, postVotes: this.state.postVotes - 1})
            }
        }
    }

    async upvotePost() {
        this.setState({voting: true});
        // TODO: Check if user is not logged in
        const user = getStoreInstance().get(USER_KEY);
        const upvoted = await sendUpvotePostRequest(
            this.state.postId,
            user.email,
            user.token,
        );
        this.setState({voting: false});
        if (upvoted instanceof Error) {
            console.error(upvoted)
        }
        else {
            if (this.state.upvoted) {
                this.setState({upvoted: false, postVotes: this.state.postVotes - 1})
            }
            else if (this.state.downvoted) {
                this.setState({upvoted: true, downvoted: false, postVotes: this.state.postVotes + 2})
            }
            else {
                this.setState({upvoted: true, postVotes: this.state.postVotes + 1})
            }
        }
    }

    render() {
        const commentDivs = [];

        console.log(this.state)

        if (this.state.postComments !== undefined) {
            for (let i = 0; i < this.state.postComments.length; i += 1) {
                console.log(this.state.postComments)
                commentDivs.push(
                    <div key={"comment"+i} style={{border: "1px solid black"}}>
                        {this.state.postComments[i].points + '\t' + this.state.postComments[i].originalPoster.userName + '\t' + this.state.postComments[i].text}
                    </div>
                )
            }
        }

        let voteDivText = '';
        if (this.state.upvoted) {
            voteDivText = 'upvoted';
        }
        else if (this.state.downvoted) {
            voteDivText = 'downvoted';
        }

        return (
            <div>
                <TopBar></TopBar>
                I am in post {this.state.postId}
                <h2>{(this.state.postTitle !== undefined) ? this.state.postTitle : "Loading"}</h2><br />
                <div style={{ border: "1px solid black" }} onClick={this.upvotePost.bind(this)}>
                    Upvote
                </div>
                <div style={{ border: "1px solid black" }} onClick={this.downvotePost.bind(this)}>
                    Downvote
                </div>
                <div style={{ border: "1px solid green" }}>
                    {voteDivText}
                </div>
                <img src={(this.state.postImageURL !== undefined) ? this.state.postImageURL : "Empty"} style={{height: "100px"}}></img><br />
                votes: {(this.state.postVotes !== undefined) ? this.state.postVotes : 0}

                { commentDivs }
                
            </div>
        )
    }
}
