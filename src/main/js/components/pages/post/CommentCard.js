import React, { Component } from 'react'
import {
    THEMES,
    THEME_KEY,
} from '../../../constants';

import getStoreInstance from '../../../Store';
import './CommentCard.css';

export class CommentCard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            commentCardColors: this.updateWithNewThemeColours(
                getStoreInstance().get(THEME_KEY)
            ),
        };
    }

    updateWithNewThemeColours(themeName) {
        return THEMES[themeName].POST.COMMENT_CARD
    }

    componentDidMount() {
        getStoreInstance().subscribe(THEME_KEY, (key, oldValue, newValue) => {
            this.updateWithNewThemeColours(newValue);
        });
    }

    render() {
        return (
            <div
                className="CommentCard"
                style={{
                    backgroundColor: this.state.commentCardColors.BACKGROUND_COLOR,
                    color: this.state.commentCardColors.TEXT_COLOR,
                }}
            >
                {/* <span className="CommentCard__VoteContainer">
                    <i className="material-icons">
                        keyboard_arrow_up
                    </i>
                    <span>20</span>
                    <i className="material-icons">
                        keyboard_arrow_down
                    </i>
                </span> */}
                <span className="CommentCard__information">
                    <span className="CommentCard__text">{this.props.text}</span>
                    <span className="CommentCard__username">{this.props.userName}</span>
                </span>
            </div>
        )
    }
}

export default CommentCard
