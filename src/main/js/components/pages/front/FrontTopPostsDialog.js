import React, { Component } from 'react'
import './FrontTopPostsDialog.css';
import getStoreInstance from '../../../Store';
import { THEME_KEY, THEMES } from '../../../constants';

export class FrontTopPostsDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            topPostDialogStyleObject: {},
            topPostDialogContentStyleObject: {},
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
        }

        if (THEMES[newValue].FRONT.TOP_POSTS !== undefined) {
            let topPostDialogContentStyleObject = {
                background: THEMES[newValue].FRONT.TOP_POSTS.DARK_BACKGROUND_COLOR,
            };
            this.setState({
                topPostDialogContentStyleObject,
            });
        }
    }

    componentDidMount() {
        getStoreInstance().subscribe(THEME_KEY, (key, oldValue, newValue) => {
            this.themeChanged(newValue);
        });

        this.themeChanged(getStoreInstance().get(THEME_KEY));
    }

    render() {
        return (
            <div style={{"position":"fixed", "width":"22vw"}}>
                <div className="FrontTopPosts" style={this.state.topPostDialogContentStyleObject}>
                    <h1 style={this.state.topPostDialogStyleObject}>Top posts</h1>
                    <div style={{paddingRight: "20px", paddingLeft:"20px", paddingBottom: "20px"}}>
                        <div className="FrontTopPost">
                            <span className="FrontTopPost__Points">120</span>
                            <span className="FrontTopPost__Title">Post title 1</span>
                        </div>

                        <div className="FrontTopPost">
                            <span className="FrontTopPost__Points">230</span>
                            <span className="FrontTopPost__Title">Post title 1</span>
                        </div>

                        <div className="FrontTopPost">
                            <span className="FrontTopPost__Points">12</span>
                            <span className="FrontTopPost__Title">Post title 1</span>
                        </div>

                        <div className="FrontTopPost">
                            <span className="FrontTopPost__Points">34</span>
                            <span className="FrontTopPost__Title">Post title 1</span>
                        </div>

                        <div className="FrontTopPost">
                            <span className="FrontTopPost__Points">120</span>
                            <span className="FrontTopPost__Title">Post title 1</span>
                        </div>

                        <div className="FrontTopPost">
                            <span className="FrontTopPost__Points">230</span>
                            <span className="FrontTopPost__Title">Post title 1</span>
                        </div>

                        <div className="FrontTopPost">
                            <span className="FrontTopPost__Points">12</span>
                            <span className="FrontTopPost__Title">Post title 1</span>
                        </div>

                        <div className="FrontTopPost">
                            <span className="FrontTopPost__Points">34</span>
                            <span className="FrontTopPost__Title">Post title 1</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default FrontTopPostsDialog
