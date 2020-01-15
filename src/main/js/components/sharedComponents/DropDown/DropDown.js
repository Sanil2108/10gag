import React, { Component } from 'react'

import './DropDown.css';

export default class DropDown extends Component {
    constructor(props) {
        super(props);

        this.state = {mouseOver: false};
    }

    onMouseOver(event) {
        this.setState({mouseOver: true});
    }

    onMouseOut(event) {
        this.setState({mouseOver: false});
    }

    render() {
        const childElements = this.props.getChildrenElements();

        return (
            <div className="DropDown" onMouseOver={this.onMouseOver.bind(this)} onMouseOut={this.onMouseOut.bind(this)}>
                {this.props.defaultOption}
                <div className="RotateButton">
                    <i className="MyMaterialIcon">
                        keyboard_arrow_down
                    </i>
                </div>
            </div>
        )
    }
}
