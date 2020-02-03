import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import './SignUpBlock.css';

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
        margin: theme.spacing(1),
        width: 200,
        },
    },
}));

export default function SignUpBlock () {
    const classes = useStyles();

    return (
        <div className="SignUpBlock">
            {/* <form className={classes.root} noValidate autoComplete="off">
                <TextField id="outlined-basic" label="Outlined" variant="outlined" /> */}
                <span style={{color: "#fff"}}>Hello signup block here</span>
            {/* </form> */}
        </div>
    );
}
