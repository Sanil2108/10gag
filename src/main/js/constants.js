// API URL CONSTANTS
const BASE_URL = 'http://localhost:5000/api/';

export const LOGIN_USER_URL = BASE_URL + 'users/login';

export const NEW_POSTS_URL = BASE_URL + 'posts/get/new';
export const HOT_POSTS_URL = BASE_URL + 'posts/get/hot';
export const TOP_POSTS_URL = BASE_URL + 'posts/get/top';

export const RESPONSE_TYPE_OK = 'RESPONSE_TYPE_OK';

// Internal react router URL constants
export const USER_PAGE_URL = '/user';
export const CREATE_POST_PAGE_URL = '/createPost';
export const SETTINGS_PAGE_URL = '/settings';
export const POST_PAGE_URL = '/post';
export const FRONT_PAGE_URL = '/**';