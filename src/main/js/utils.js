import * as axios from 'axios';

import {
    LOGIN_USER_URL,
    RESPONSE_TYPE_OK,
    GET_USER_URL,
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
    const response = await axios.post(LOGIN_USER_URL(), loginRequest);
    if (response.status === 200) {
        if (response.data.responseType === RESPONSE_TYPE_OK) {
            return {token: response.data.token.token, email, userName: response.data.user.userName};
        }
        else {
            return {responseMessage: response.data.responseMessage};
        }
    }
    else {
        return false;
    }
}

export let getUser = async (userName) => {
    const response = await axios.get(GET_USER_URL(userName));
    if (response.status === 200) {
        if (response.data.responseType === RESPONSE_TYPE_OK) {
            console.log(response.data)
            return response.data.user;
        }
        else {
            console.error(response.data.responseMessage);
            return response.data.responseMessage;
        }
    }
    return false;
}

export let validateThemeSelection = (themeName) => {
    // Right now just return true every time
    return true;
}
