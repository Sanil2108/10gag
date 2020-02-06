import React, { Component } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import './SignUpBlock.css';


export default class SignUpBlock extends React.Component {

    constructor(props) {
        super(props);
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

    render() {
        return (
            <div className="SignUpBlock">

                <this.textField
                    placeholder='Email'
                    variant={'filled'}
                    error
                    fullWidth
                    style={{
                        marginTop: "10px",
                        width: "70%"
                    }}
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
                    helperText={'Password must be at least 6 characters'}
                ></this.textField>
            </div>
        );
    }
}
