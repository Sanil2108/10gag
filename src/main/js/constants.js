// API related information
const PRODUCTION_ENV = false;
const PRODUCTION_URL = '';
const DEVELOPMENT_URL = 'http://localhost:5000/api/';
const BASE_URL = (PRODUCTION_ENV) ? PRODUCTION_URL : DEVELOPMENT_URL;

// External URLs
export const LOGIN_USER_URL = () => BASE_URL + 'users/login';
export const CREATE_POST_URL = () => BASE_URL + 'posts/create';
export const NEW_POSTS_URL = () => BASE_URL + 'posts/get/new';
export const HOT_POSTS_URL = () => BASE_URL + 'posts/get/hot';
export const TOP_POSTS_URL = () => BASE_URL + 'posts/get/top';
export const GET_POST_URL = (postId) => BASE_URL + 'posts/get/' + postId
export const GET_USER_URL = (userName) => BASE_URL + 'users/get/' + userName;
export const UPVOTE_POST_URL = (postId) => BASE_URL + 'posts/upvote/' + postId;
export const DOWNVOTE_POST_URL = (postId) => BASE_URL + 'posts/downvote/' + postId;

// Backend response types
export const RESPONSE_TYPE_OK = 'RESPONSE_TYPE_OK';
export const RESPONSE_TYPE_ALERT = 'RESPONSE_TYPE_ALERT';
export const RESPONSE_TYPE_ERROR = 'RESPONSE_TYPE_ERROR';

// TODO: Look into converting these into functions as well
// Internal react router URL constants
export const USER_PAGE_URL = '/user';
export const CREATE_POST_PAGE_URL = '/createPost';
export const SETTINGS_PAGE_URL = '/settings';
export const POST_PAGE_URL = '/post';
export const FRONT_PAGE_URL = '/';

// Store constants
export const USER_KEY = 'user';
export const THEME_KEY = 'theme';
