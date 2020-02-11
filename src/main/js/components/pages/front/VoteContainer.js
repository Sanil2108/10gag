import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import './VoteContainer.css';

export default class VoteContainer extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            upvoteHovered: false,
            downvoteHovered: false,
        }
    }

    render() {
        return (
            <div className="VoteContainer">
                <i className="material-icons"
                    onClick={this.props.onUpvote}
                    onMouseOver={() => {this.setState({upvoteHovered: true})}}
                    onMouseOut={() => {this.setState({upvoteHovered: false})}}
                    style={{
                        boxShadow: "inset 0px 0px 0px "+((this.state.upvoteHovered) ? 0 : 30)+"px #d32f2f"
                    }}>
                    keyboard_arrow_up
                </i>
                <div style={{
                    color: this.props.voteTextColor,
                    margin: "auto 10px",
                    fontSize: "1.4em",
                    color: "#fff",
                }}>
                    {this.props.votes}
                </div>
                <i className="material-icons"
                    onClick={this.props.onDownvote}
                    onMouseOver={() => {this.setState({downvoteHovered: true})}}
                    onMouseOut={() => {this.setState({downvoteHovered: false})}}
                    style={{
                        boxShadow: "inset 0px 0px 0px "+((this.state.downvoteHovered) ? 0 : 30)+"px #d32f2f"
                    }}>
                    keyboard_arrow_down
                </i>
            </div>
        )
    }
}
