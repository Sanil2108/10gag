import React, { Component } from 'react'
import './FrontTopPostsDialog.css';
import getStoreInstance from '../../../Store';
import { THEME_KEY, THEMES, POST_PAGE_URL } from '../../../constants';
import ShadowButton from '../../sharedComponents/ShadowButton/ShadowButton';
import { getTopPosts } from '../../../utils';
import { Redirect } from 'react-router-dom';

export class FrontTopPostsDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            topPostDialogStyleObject: {},
            topPostDialogContentStyleObject: {},
            topPostDialogButtonStyle: {},
            posts: [],
        }
    }

    themeChanged(newValue) {
        if (THEMES[newValue].FRONT.TOP_POSTS !== undefined) {
            let topPostDialogStyleObject = {
                background: THEMES[newValue].FRONT.TOP_POSTS.BACKGROUND_COLOR,
            };
            this.setState({
                topPostDialogStyleObject
            });

            let topPostDialogContentStyleObject = {
                background: THEMES[newValue].FRONT.TOP_POSTS.DARK_BACKGROUND_COLOR,
            };
            this.setState({
                topPostDialogContentStyleObject,
            });

            let topPostDialogButtonStyle = {
                backgroundColor: THEMES[newValue].FRONT.TOP_POSTS.DARK_BACKGROUND_COLOR,
                hoverBoxShadow: 'inset 0px 0px 10px 30px ' + THEMES[newValue].FRONT.TOP_POSTS.BACKGROUND_COLOR,
                defaultBoxShadow: 'inset 0px 0px 0px 0px ' + THEMES[newValue].FRONT.TOP_POSTS.BACKGROUND_COLOR,
            }
            this.setState({
                topPostDialogButtonStyle
            })
        }
    }

    componentDidMount() {
        getStoreInstance().subscribe(THEME_KEY, (key, oldValue, newValue) => {
            this.themeChanged(newValue);
        });

        this.themeChanged(getStoreInstance().get(THEME_KEY));
        this.loadTopPosts();
    }

    async loadTopPosts() {
        const posts = await getTopPosts();
        this.setState({posts});
    }

    openPost(postId) {
        this.setState({redirectTo: `${POST_PAGE_URL}/${this.state.posts[postId].id}`})
    }

    render() {
        if (this.state.redirectTo != null) {
            return <Redirect push to={this.state.redirectTo}></Redirect>
        }

        const shadowButtons = [];
        for (let i = 0; i < this.state.posts.length; i += 1) {
            shadowButtons.push(
                <ShadowButton
                    key={"shadowButtons"+i}
                    backgroundColor={this.state.topPostDialogButtonStyle.backgroundColor}
                    hoverBoxShadow={this.state.topPostDialogButtonStyle.hoverBoxShadow}
                    defaultBoxShadow={this.state.topPostDialogButtonStyle.defaultBoxShadow}
                    onClick={this.openPost.bind(this, i)}
                >
                    <div style={{
                        height: '40px',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <span className="FrontTopPost__Points">{this.state.posts[i].votes}</span>
                        <span className="FrontTopPost__Title">{this.state.posts[i].title}</span>
                    </div>
                </ShadowButton>
            );
        }

        return (
            <div style={{"position":"fixed", "width":"22vw"}}>
                <div className="FrontTopPosts" style={this.state.topPostDialogContentStyleObject}>
                    <h1 style={this.state.topPostDialogStyleObject}>Top posts</h1>
                    <div style={{paddingBottom: "20px"}}>
                        {shadowButtons}
                    </div>
                </div>
            </div>
        )
    }
}

export default FrontTopPostsDialog
