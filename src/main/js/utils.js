import * as axios from 'axios';
import * as AWS from 'aws-sdk';

import {
    LOGIN_USER_URL,
    RESPONSE_TYPE_OK,
    GET_USER_URL,
    NEW_POSTS_URL,
    GET_POST_URL,
    UPVOTE_POST_URL,
    DOWNVOTE_POST_URL,
    UPLOAD_TO_IMGUR_URL,
    CREATE_USER_URL,
    CREATE_COMMENT_URL,
    GET_NUMBER_OF_PAGES,
    GET_TOP_POSTS_URL,
    S3_KEY,
    S3_BUCKET_NAME,
} from './constants';
import getStoreInstance from './Store';

// TODO: Security risk
const CLIENT_ID = 'a7ea9abc8fd85ac';

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
            return {
                successful: true,
                token: response.data.token.token,
                email,
                userName: response.data.user.userName,
                upvotedPostsIds: response.data.upvotedPostsIds,
                downvotedPostsIds: response.data.downvotedPostsIds,
            };
        }
        else {
            return {successful: false, responseMessage: response.data.responseMessage};
        }
    }
    else {
        return {successful: false};
    }
}

export let registerUser = async (userName, email, password) => {
    const createUserRequest = { userName, email, password };
    const response = await axios.post(CREATE_USER_URL(), createUserRequest);
    if (response.status === 200) {
        if (response.data.responseType === RESPONSE_TYPE_OK) {
            console.log(response.data);
            return {successful: true};
        }
        else {
            console.error(response.data.responseMessage);
            return {successful: false, responseMessage: response.data.responseMessage};
        }
    }
    return {successful: false, responseMessage: 'Network error'};
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

export let getPosts = async (page) => {
    const response = await axios.get(NEW_POSTS_URL(page), {});
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

export let uploadImageToS3 = async (base64, title) => {
    const S3 = getStoreInstance().get(S3_KEY);

    const file = dataURLtoFile(base64, 'someFile.png');
    const upload = new AWS.S3.ManagedUpload({
        params: {
            Bucket: S3_BUCKET_NAME,
            // Key: 'someFile.png',
            Key: title.replace(/ /g, '') + getRandomString(40) + '.png',
            Body: file,
            ACL: "public-read"
        }
    });

    const result = await upload.promise();

    return result.Location;
}

function getRandomString(length) {
    const allowedValues = [...Array('Z'.charCodeAt(0) - 'A'.charCodeAt(0) + 1).keys()].map(i => i + 'A'.charCodeAt(0))
    allowedValues.push(...[...Array('z'.charCodeAt(0) - 'a'.charCodeAt(0) + 1).keys()].map(i => i + 'a'.charCodeAt(0)))
    allowedValues.push(...[...Array('9'.charCodeAt(0) - '0'.charCodeAt(0) + 1).keys()].map(i => i + '0'.charCodeAt(0)))

    let string = '';

    for (let i = 0; i < length; i += 1) {
        const randomInt = parseInt(Math.random() * allowedValues.length)
        string += String.fromCharCode(allowedValues[randomInt]);
    }

    return string;
}

function dataURLtoFile(dataUrl, filename) {
    var arr = dataUrl.split(','),
        // mime = arr[0].match(/:(.*?);/)[1],
        mime = 'image/png',
        bstr = atob(dataUrl), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
        
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    
    return new File([u8arr], filename, {type:mime});
}

export let uploadImageToImgur = async (base64, title) => {
    const data = {
        type: "base64",
        name: title,
        title,
        image: base64,
    };
    const config = {
        headers: {
            'Authorization': 'Client-ID ' + CLIENT_ID,
            'Access-Control-Request-Method': 'POST',
            'Access-Control-Request-Headers': 'authorization',
            Accept: 'application/json'
        }
    };

    const response = await axios.post(UPLOAD_TO_IMGUR_URL, data, config);
    if (response.status === 200) {
        return response.data.data.link;
    }
    else {
        console.error(response.statusText);
        return false;
    }
}

export let getTopPosts = async () => {
    const response = await axios.get(GET_TOP_POSTS_URL());
    if (response.status === 200) {
        if (response.data.responseType == RESPONSE_TYPE_OK) {
            return response.data.posts;
        }
        else {
            console.error(response.data.responseMessage);
            return null;
        }
    }
}

export let getNumberOfPages = async () => {
    const response = await axios.get(GET_NUMBER_OF_PAGES());
    if (response.status === 200) {
        if (response.data.responseType == RESPONSE_TYPE_OK) {
            return parseInt(response.data.pageLength);
        }
        else {
            console.error(response.data.responseMessage);
            return null;
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

export let sendCreateCommentRequest = async (commentText, userEmail, token, postId) => {
    const data = {
        post: {
            id: postId,
        },
        comment: {
            text: commentText,
        },
        user: {
            email: userEmail,
            token,
        },
    };

    const response = await axios.post(CREATE_COMMENT_URL(), data);
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
