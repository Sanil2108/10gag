import React, { Component } from 'react'

import getStoreInstance from '../../../Store';
import {
    THEMES,
    THEME_KEY,
} from '../../../constants';

import './ThemeDropDown.css';

export default class ThemeDropDown extends Component {
    constructor(props) {
        super(props);

        this.state = {
            topBarDropDownColors: {},
            currentThemeName: "No theme set",
            dropDownOpen: false,
            dropDownAnimationEnded: false
        };
    }

    componentDidMount() {
        getStoreInstance().subscribe(THEME_KEY, (key, oldTheme, newTheme) => {
            this.setState({
                topBarDropDownColors: THEMES[newTheme].TOPBAR.DROPDOWN,
                currentThemeName: newTheme,
            })
        })
    }

    toggleDropDown() {
        if (this.state.dropDownOpen) {
            this.setState({
                dropDownAnimationEnded: false
            });
        }
        else {
            console.log("Drop down open")
        }

        this.setState({
            dropDownOpen: !this.state.dropDownOpen,
        });
    }

    onDropDownAnimationEnd(event) {
        this.setState({dropDownAnimationEnded: true})
    }

    changeTheme(newTheme) {
        getStoreInstance().updateOrCreate(THEME_KEY, newTheme);
    }

    render() {
        let dropDownDiv = '';
        if (this.state.dropDownOpen) {
            const childrenSpans = [];

            const themes = Object.keys(THEMES)
            for (let i = 0; i < themes.length; i += 1) {
                if (this.state.dropDownAnimationEnded) {
                    childrenSpans.push((
                        <span key={'Theme-'+i} onClick={this.changeTheme.bind(this, themes[i])}>
                            <span
                                className="BackgroundSpan"
                                style={{
                                    backgroundImage: THEMES[themes[i]].TOPBAR.DROPDOWN.BACKGROUND_IMAGE
                                }}
                            ></span>
                            <p>{themes[i]}</p>
                        </span>
                    ));
                }
            }


            dropDownDiv =
            (<div
                className="ExpandedDropDown"
                onAnimationEnd={this.onDropDownAnimationEnd.bind(this)}
            >
                {childrenSpans}
            </div>)
        }
        return (
            <span style={{position: "relative"}}>
                <span
                    className={"ThemeButton" + ((this.state.dropDownOpen) ? " Expanded" : "")}
                    onClick={this.toggleDropDown.bind(this)}>
                    <span className="Background" style={{
                        "backgroundImage": this.state.topBarDropDownColors.BACKGROUND_IMAGE,
                    }}>

                    </span>
                    <span className="ThemeLabelContainer">
                        Theme:
                    </span>
                    <span className="ThemeNameContainer">
                        {this.state.currentThemeName}
                    </span>
                    <img src="https://res.cloudinary.com/dkb1nvu7q/image/upload/v1580044318/download.svg"></img>
                </span>
                {dropDownDiv}
            </span>
        )
    }
}
