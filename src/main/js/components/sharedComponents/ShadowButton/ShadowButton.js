import React, { Component } from 'react'
import './ShadowButton.css';

import getStoreInstance from '../../../Store';

export class ShadowButton extends Component {

    constructor(props) {
        super(props);

        this.state = {
            mouseOver: false,
        };
    }

    render() {
        return (
            <div
                className={"ShadowButton"}
                onClick={this.props.onClick}
                onMouseOver={() => {this.setState({mouseOver: true})}}
                onMouseOut={() => {this.setState({mouseOver: false})}}
                style={{
                    background: this.props.backgroundColor,
                    boxShadow: ((this.state.mouseOver === true) ? this.props.hoverBoxShadow : this.props.defaultBoxShadow)
                }}
            >
                {this.props.children}
            </div>
        )
    }
}

export default ShadowButton
