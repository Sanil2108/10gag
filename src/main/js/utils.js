import * as axios from 'axios';

import {
    LOGIN_USER_URL,
    RESPONSE_TYPE_OK,
} from './constants';

export let authenticateUserWithToken = async (email, token) => {
    const loginRequest = {
        email,
        token,
    }

    return await authenticateUser(loginRequest);
}

export let authenticateUserWithPassword = async (email, password) => {
    const loginRequest = {
        email,
        password,
    }

    return await authenticateUser(loginRequest);
}

let authenticateUser = async (loginRequest) => {
    const response = await axios.post(LOGIN_USER_URL, loginRequest);
    if (response.status === 200) {
        if (response.data.responseType === RESPONSE_TYPE_OK) {
            return {token: response.data.token.token};
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
}
