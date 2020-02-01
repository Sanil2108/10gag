import React from 'react'

import { styled } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { filledTextFieldHook } from '@mui-treasury/styles/textField';

export default function StandardTextField() {
    const filledInputStyles = ({ spacing }) => {
        const space = spacing(1); // default = 8;
        return {
            root: {
                fontSize: 16,
                borderRadius: space / 2,
                backgroundColor: 'rgba(0,0,0,0.04)',
                '&:hover': {
                    backgroundColor: 'rgba(0,0,0,0.08)',
                },
            },
            error: {
                backgroundColor: '#fff5f5',
                '&:hover': {
                    backgroundColor: '#ffecec',
                },
                '&$focused': {
                    backgroundColor: '#ffecec',
                },
            },
            focused: {},
        };
    };

    const filledHelperTextStyles = ({ spacing }) => {
        const space = spacing(1); // default = 8;
        return {
            root: {
                lineHeight: '2em',
            },
            contained: {
                marginTop: space / 4,
            },
        };
    };
      

    return (
        <TextField
            label="Title"
            variant="filled"
            fullWidth
            InputProps={{
                disableUnderline: true,
                classes: {
                    root: {
                        fontSize: 16,
                        borderRadius: 2,
                        backgroundColor: 'rgba(0,0,0,0.04)',
                        '&:hover': {
                            backgroundColor: 'rgba(0,0,0,0.08)',
                        },
                    },
                    error: {
                        backgroundColor: '#fff5f5',
                        '&:hover': {
                            backgroundColor: '#ffecec',
                        },
                        '&$focused': {
                            backgroundColor: '#ffecec',
                        },
                    },
                    focused: {},
                },
            }}
            FormHelperTextProps={{
                classes: filledHelperTextStyles,
            }}
        ></TextField>
    )
}
