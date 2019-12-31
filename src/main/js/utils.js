import * as axios from 'axios';

import {
    LOGIN_USER_URL,
    RESPONSE_TYPE_OK,
} from './constants';

export let authenticateUserWithToken = async (email, token) => {
    const loginRequest = {
        email,
        token: {
            token,
        },
    }

    return await authenticateUser(loginRequest, email);
}

export let authenticateUserWithPassword = async (email, password) => {
    const loginRequest = {
        email,
        password,
    }

    return await authenticateUser(loginRequest, email);
}

let authenticateUser = async (loginRequest, email) => {
    const response = await axios.post(LOGIN_USER_URL, loginRequest);
    if (response.status === 200) {
        if (response.data.responseType === RESPONSE_TYPE_OK) {
            return {token: response.data.token.token, email};
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
}

export let validateThemeSelection = (themeName) => {
    // Right now just return true every time
    return true;
}
