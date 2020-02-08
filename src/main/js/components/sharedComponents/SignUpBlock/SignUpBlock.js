import React, { Component } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import './SignUpBlock.css';
import { Button } from '@material-ui/core';
import * as utils from '../../../utils';


export default class SignUpBlock extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            userNameEntered: '',
            emailEntered: '',
            passwordEntered: '',
        };

        this.textField = withStyles(
            {
                root: {
                    fontSize: 12,
                    borderRadius: 2 / 2,
                    backgroundColor: 'rgba(0,0,0,0.04)',
                    '&:hover': {
                        backgroundColor: 'rgba(0,0,0,0.08)',
                    },
                },
                // underline: {
                //     color: '#00ff00',
                //     backgroundColor: '#0000ff',
                // },
                // input: {
                //     color: '#00ff00',
                //     backgroundColor: '#0000ff',
                // },
                // colorSecondary: {
                //     color: '#00ff00',
                //     backgroundColor: '#0000ff',
                // },
                // error: {
                //     backgroundColor: '#fff5f5',
                //     '&:hover': {
                //         backgroundColor: '#ffecec',
                //     },
                //     '&$focused': {
                //         backgroundColor: '#ffecec',
                //     },
                // },
                // focused: {},
            }
        )(TextField)
    }

    async signUpButtonClick() {
        const response = await utils.registerUser(
            this.state.userNameEntered,
            this.state.emailEntered,
            this.state.passwordEntered,
        );
        if (!response.successful) {
            console.error(response.responseMessage);
            // TODO:
            alert(response.responseMessage);
        }
    }

    render() {
        return (
            <div className="SignUpBlock">

                <this.textField
                    placeholder='Username'
                    variant={'filled'}
                    error
                    fullWidth
                    style={{
                        marginTop: "10px",
                        width: "70%"
                    }}
                    onChange={(e) => {this.setState({userNameEntered: e.target.value})}}
                    helperText={'This is not a valid email address'}
                ></this.textField>

                <this.textField
                    placeholder='Email'
                    variant={'filled'}
                    error
                    fullWidth
                    style={{
                        marginTop: "10px",
                        width: "70%"
                    }}
                    onChange={(e) => {this.setState({emailEntered: e.target.value})}}
                    helperText={'This is not a valid email address'}
                ></this.textField>


                <this.textField
                    placeholder='Password'
                    variant={'filled'}
                    fullWidth
                    style={{
                        marginTop: "10px",
                        width: "70%"
                    }}
                    onChange={(e) => {this.setState({passwordEntered: e.target.value})}}
                    helperText={'Password must be at least 6 characters'}
                ></this.textField>

                <Button onClick={this.signUpButtonClick.bind(this)}>
                    Sign up boiii
                </Button>
            </div>
        );
    }
}
