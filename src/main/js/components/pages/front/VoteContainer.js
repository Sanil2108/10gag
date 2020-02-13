import React, { PureComponent } from 'react'
import './VoteContainer.css';

import getStoreInstance from '../../../Store';
import { THEMES, THEME_KEY, USER_KEY } from '../../../constants';

export default class VoteContainer extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            upvoteHovered: false,
            downvoteHovered: false,
            userLoggedIn: getStoreInstance().get(USER_KEY).email != null,
        };
    }

    themeChanged(newThemeName) {
        this.setState({
            upvoteButtonDeselectedColor: THEMES[newThemeName].FRONT.POST_SUMMARY.UPVOTE_BUTTON_DESELECTED_COLOR,
            upvoteButtonSelectedColor: THEMES[newThemeName].FRONT.POST_SUMMARY.UPVOTE_BUTTON_SELECTED_COLOR,
            downvoteButtonDeselectedColor: THEMES[newThemeName].FRONT.POST_SUMMARY.DONWVOTE_BUTTON_DESELECTED_COLOR,
            downvoteButtonSelectedColor: THEMES[newThemeName].FRONT.POST_SUMMARY.DONWVOTE_BUTTON_SELECTED_COLOR,
            voteTextColor: THEMES[newThemeName].FRONT.POST_SUMMARY.VOTE_TEXT_COLOR,
            voteBoxShadowColor: THEMES[newThemeName].FRONT.POST_SUMMARY.VOTE_BOX_SHADOW_COLOR,
        });
    }

    componentDidMount() {
        this.themeChanged(getStoreInstance().get(THEME_KEY));
        getStoreInstance().subscribe(THEME_KEY, (key, oldValue, newValue) => {
            this.themeChanged(newValue);
        });

        getStoreInstance().subscribe(USER_KEY, (key, oldValue, newValue) => {
            if (newValue.email == null) {
                this.setState({userLoggedIn: false});
            }
            else {
                this.setState({userLoggedIn: true});
            }
        })
    }

    render() {
        const scope = this;

        return (
            <div className="VoteContainer">
                <i className="material-icons"
                    onClick={(event) => {
                        if (this.state.userLoggedIn) {
                            scope.props.onUpvote();
                        }
                    }}
                    onMouseOver={() => {
                        if (this.state.userLoggedIn) {
                            this.setState({upvoteHovered: true});
                        }
                    }}
                    onMouseOut={() => {this.setState({upvoteHovered: false})}}
                    style={{
                        boxShadow: "inset 0px 0px 0px "+((this.state.upvoteHovered) ? 0 : 30)+"px "+this.state.voteBoxShadowColor,
                        color: ((this.props.upvoteSelected) ? this.state.upvoteButtonSelectedColor : this.state.upvoteButtonDeselectedColor)
                    }}>
                    keyboard_arrow_up
                </i>
                <div style={{
                    color: this.state.voteTextColor,
                    margin: "auto 10px",
                    fontSize: "1.5em",
                }}>
                    {this.props.votes}
                </div>
                <i className="material-icons"
                    onClick={(event) => {
                        if (this.state.userLoggedIn) {
                            scope.props.onDownvote();
                        }
                    }}
                    onMouseOver={() => {
                        if (this.state.userLoggedIn) {
                            this.setState({downvoteHovered: true});
                        }
                    }}
                    onMouseOut={() => {this.setState({downvoteHovered: false})}}
                    style={{
                        boxShadow: "inset 0px 0px 0px "+((this.state.downvoteHovered) ? 0 : 30)+"px "+this.state.voteBoxShadowColor,
                        color: ((this.props.downvoteSelected) ? this.state.downvoteButtonSelectedColor : this.state.downvoteButtonDeselectedColor)
                    }}>
                    keyboard_arrow_down
                </i>
            </div>
        )
    }
}
