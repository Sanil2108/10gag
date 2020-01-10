import * as axios from 'axios';

import {
    LOGIN_USER_URL,
    RESPONSE_TYPE_OK,
    GET_USER_URL,
    NEW_POSTS_URL,
    GET_POST_URL,
    UPVOTE_POST_URL,
    DOWNVOTE_POST_URL,
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

export let getPosts = async () => {
    const response = await axios.get(NEW_POSTS_URL(), {});
    if (response.status === 200) {
        if (response.data.responseType === RESPONSE_TYPE_OK) {
            return response.data.posts;
        }
        else {
            console.error(response.data.responseMessage);
            return response.data.responseMessage;
        }
    }
    return false;
}

export let getPost = async (postId)  => {
    const response = await axios.get(GET_POST_URL(postId), {});
    if (response.status === 200) {
        if (response.data.responseType === RESPONSE_TYPE_OK) {
            return response.data.post;
        }
        else {
            console.error(response.data.responseMessage);
            return response.data.responseMessage;
        }
    }
}

// TODO: Refactor other functions to similar
export let sendUpvotePostRequest = async (postId, userEmail, token) => {
    const data = {
        user: {
            email: userEmail,
            token,
        },
    }
    const response = await axios.post(UPVOTE_POST_URL(postId), data);
    if (response.status === 200) {
        if (response.data.responseType === RESPONSE_TYPE_OK) {
            return true;
        }
        else {
            console.error(response.data.responseMessage);
            return false;
        }
    }
    return false;
}

export let sendDownvotePostRequest = async (postId, userEmail, token) => {
    const data = {
        user: {
            email: userEmail,
            token,
        },
    }
    const response = await axios.post(DOWNVOTE_POST_URL(postId), data);
    if (response.status === 200) {
        if (response.data.responseType === RESPONSE_TYPE_OK) {
            return true;
        }
        else {
            console.error(response.data.responseMessage);
            return new Error(response.data.responseMessage);
        }
    }
    return new Error("axios falied");
}

export let validateThemeSelection = (themeName) => {
    // Right now just return true every time
    return true;
}
