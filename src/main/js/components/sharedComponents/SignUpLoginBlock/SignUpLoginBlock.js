import React, { Component } from 'react'

import SignUpBlock from '../SignUpBlock/SignUpBlock';
import LoginBlock from '../LoginBlock/LoginBlock';
import { CSSTransition } from 'react-transition-group';

import './SignUpLoginBlock.css';

const SIGN_UP_TAB = 'SignUpTab';
const LOGIN_TAB = 'LoginTab';

const TRANSITION_TIME = 1000;

export class SignUpLoginBlock extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentUserDialogClass: "",
            currentTab: SIGN_UP_TAB,
        };
    }

    selectLoginTab() {
        if (this.state.currentTab === LOGIN_TAB) {
            return;
        }
        this.setState({
            currentTab: LOGIN_TAB,
        });
    }

    selectSignUpTab() {
        if (this.state.currentTab === SIGN_UP_TAB) {
            return;
        }
        this.setState({
            currentTab: SIGN_UP_TAB,
        });
    }

    render() {

        return (
            <div className={"UserDialog " + this.props.userDialogClass}>
                <span>
                    
                </span>
                <div className="UserDialog__Tabs">
                    <span
                        onClick={this.selectSignUpTab.bind(this)}
                        className={(this.state.currentTab === SIGN_UP_TAB) ? "UserDialog__Tabs--selected" : ""}>
                        Sign Up
                        <span className={(this.state.currentTab === SIGN_UP_TAB) ? "underlineHighlight" : ""}></span>
                    </span>
                    <span
                        onClick={this.selectLoginTab.bind(this)}
                        className={(this.state.currentTab === LOGIN_TAB) ? "UserDialog__Tabs--selected" : ""}>
                        Login
                        <span className={(this.state.currentTab === LOGIN_TAB) ? "underlineHighlight" : ""}></span>
                    </span>
                </div>
                <div style={{flexGrow: "1", position: 'relative'}}>
                    <CSSTransition in={this.state.currentTab === LOGIN_TAB} timeout={TRANSITION_TIME} classNames="LoginTab">
                        <LoginBlock className="LoginBlock"></LoginBlock>
                    </CSSTransition>
                    <CSSTransition in={this.state.currentTab === SIGN_UP_TAB} timeout={TRANSITION_TIME} classNames="SignUpTab">
                        <SignUpBlock className="SignUpBlock"></SignUpBlock>
                    </CSSTransition>
                </div>
                
            </div>
        );
    }
}

export default SignUpLoginBlock
