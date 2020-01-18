import Keyframes from '@keyframes/core';

import React, { Component } from 'react'

import './DropDown.css';

export default class DropDown extends Component {
    constructor(props) {
        super(props);

        this.state = { mouseOver: false, canAnimate: true, };

        this.childContainerRef = React.createRef();
    }

    onMouseOver(event) {
        this.setState({ mouseOver: true });

        window.childContainerRef = this.childContainerRef;

        const totalHeight = 0;
        for (let i = 0; i < this.childContainerRef.current.children; i += 1) {
            totalHeight += this.childContainerRef.current.children[i].offsetHeight;
        }
        console.log(totalHeight);
    }

    onMouseOut(event) {
        // this.setState({ mouseOver: false });
    }

    render() {
        let childElements;
        // if (this.state.mouseOver) {
            childElements = this.props.getChildrenElements();
        // }

        const tempClass =  (this.state.mouseOver && this.state.canAnimate) ? "DropDown_Expanding" : "DropDown_Contracting";

        const childElementsContainer = (
            <div ref={this.childContainerRef} className = {(this.state.mouseOver && this.state.canAnimate) ? "DropDown_Expanding" : "DropDown_Contracting"}>
                {childElements}
            </div>
        );

        if (this.childContainerRef.current) {
            // console.log(this.childContainerRef.current);
            // console.log(this.childContainerRef.)
            window.childContainerRef = this.childContainerRef;

            const totalHeight = 0;
            for (let i = 0; i < this.childContainerRef.current.children; i += 1) {
                totalHeight += this.childContainerRef.current.children[i].offsetHeight;
            }

            window.totalHeight = totalHeight;


            // Keyframes.define({
            //     name: 'expand',
            //     from: {
            //         height: '0px',
            //     },
            //     to: {
            //         height: totalHeight + 'px',
            //     }
            // });
        }
        if (this.childContainerRef.current){
            console.log(this.childContainerRef.current.offsetHeight)

        }

        // TODO: Dont bind shit here bro
        return (
            <div>
                <div className={"DropDown " + tempClass} onMouseOver={this.onMouseOver.bind(this)} onMouseOut={this.onMouseOut.bind(this)}>
                    {this.props.defaultOption}
                    <div className="RotateButton">
                        <i className="MyMaterialIcon">
                            keyboard_arrow_down
                        </i>
                    </div>
                    {childElementsContainer}
                </div>
            </div>
        )
    }
}
