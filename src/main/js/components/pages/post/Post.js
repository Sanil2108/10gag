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
import PostSummary from '../front/PostSummary';

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
            post,
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

        let post = '';
        let postComments = '';
        if (this.state.post) {
            const commentDivs = [];

            if (this.state.postComments) {
                for (let i = 0; i < this.state.postComments.length; i += 1) {
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
            post = (
                <div style={{
                    position: "absolute",
                    marginTop: "7vh",
                    left: "20%",
                    width: "60%"

                }}>
                    <PostSummary post={this.state.post}></PostSummary>
                    {/* < */}
                    {commentDivs}
                </div>
            )
        }

        return (
            <div>
                <TopBar></TopBar>
                { post }
            </div>
        )
    }
}
