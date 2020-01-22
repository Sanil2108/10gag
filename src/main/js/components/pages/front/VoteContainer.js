import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import './VoteContainer.css';

export default class VoteContainer extends PureComponent {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="VoteContainer">
                <i className="material-icons"
                    onClick={this.props.onUpvote}
                    style={{"color": this.props.upvoteColor}}>
                    keyboard_arrow_up
                </i>
                <div style={{"color": this.props.voteTextColor}}>
                    {this.props.votes}
                </div>
                <i className="material-icons"
                    onClick={this.props.onDownvote}
                    style={{"color": this.props.downvoteColor}}>
                    keyboard_arrow_down
                </i>
            </div>
        )
    }
}
