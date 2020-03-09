// API related information
const PRODUCTION_ENV = false;
const PRODUCTION_URL = '';
const DEVELOPMENT_URL = 'http://localhost:5000/api/';
const BASE_URL = (PRODUCTION_ENV) ? PRODUCTION_URL : DEVELOPMENT_URL;

// External URLs
export const LOGIN_USER_URL = () => BASE_URL + 'users/login';
export const CREATE_USER_URL = () => BASE_URL + 'users/register'
export const CREATE_POST_URL = () => BASE_URL + 'posts/create';
export const NEW_POSTS_URL = (page) => BASE_URL + 'posts/get/new/' + page;
export const GET_NUMBER_OF_PAGES = () => BASE_URL + 'posts/get/pagesLength';
export const HOT_POSTS_URL = () => BASE_URL + 'posts/get/hot';
export const TOP_POSTS_URL = () => BASE_URL + 'posts/get/top';
export const GET_POST_URL = (postId) => BASE_URL + 'posts/get/' + postId
export const GET_USER_URL = (userName) => BASE_URL + 'users/get/' + userName;
export const UPVOTE_POST_URL = (postId) => BASE_URL + 'posts/upvote/' + postId;
export const DOWNVOTE_POST_URL = (postId) => BASE_URL + 'posts/downvote/' + postId;
export const GET_TOP_POSTS_URL = () => BASE_URL + 'posts/get/top'
export const CREATE_COMMENT_URL = () => BASE_URL + 'comments/createComment';

export const UPLOAD_TO_IMGUR_URL = 'https://api.imgur.com/3/image';

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
export const GAPI_KEY = 'gapi';

export const THEME_NAMES = {
    OPTIMISTIC_OCEAN: 'Optimistic Ocean',
    FASCINATING_FIRE: 'Fascinating Fire',
    FELICITOUS_FOREST: 'Felicitous Forest',
    MULISH_MOUNTAINS: 'Mulish Mountains',
    SPRY_SAVANNAH: 'Spry Savannah',
    SCINTILLATING_SKYSCRAPERS: 'Scintillating Skyscrapers',
}

export const THEMES = {
    [THEME_NAMES.OPTIMISTIC_OCEAN]:{
        TOPBAR: {
            SHADOW_COLOR: "#abcded",
            DROPDOWN: {
                BACKGROUND_IMAGE: 'url(https://res.cloudinary.com/dkb1nvu7q/image/upload/v1579714883/landscape-photograph-of-body-of-water-1001682.jpg)',
            }
        },
        FRONT: {
            POST_SUMMARY: {
                BACKGROUND_COLOR: "#0288d1",
            },
            OPACITY: 1,
        },
        BODY: {
            BACKGROUND_IMAGE: 'url(https://res.cloudinary.com/dkb1nvu7q/image/upload/v1579714883/landscape-photograph-of-body-of-water-1001682.jpg)',
            BACKGROUND_COLOR: '#ff0000',
        }
    },

    [THEME_NAMES.FASCINATING_FIRE]:{
        TOPBAR: {
            SHADOW_COLOR: "rgba(255,0,0,.2)",
            DROPDOWN: {
                BACKGROUND_IMAGE: 'url(https://res.cloudinary.com/dkb1nvu7q/image/upload/v1575470467/Z6kdWmA.jpg)',
            },
        },
        FRONT: {
            POST_SUMMARY: {
                BACKGROUND_COLOR: "#d32f2f",
                UPVOTE_BUTTON_SELECTED_COLOR: "#ffffff",
                UPVOTE_BUTTON_DESELECTED_COLOR: "#9a0007",
                DONWVOTE_BUTTON_SELECTED_COLOR: "#ffffff",
                DONWVOTE_BUTTON_DESELECTED_COLOR: "#9a0007",
                VOTE_TEXT_COLOR: "#9a0007",
                VOTE_BOX_SHADOW_COLOR: "#d32f2f",
            },
            TOP_POSTS: {
                BACKGROUND_COLOR: "#d32f2f",
                POST_TITLE_COLOR: "#ffffff",
                POST_VOTES_COLOR: "#ffffff",
                DARK_BACKGROUND_COLOR: "#9a0007",
            },
            PAGE_SELECTION: {
                UNSELECTED_COLOR: "#d32f2f",
                SELECTED_COLOR: "#9a0007",
            },
            OPACITY: 1,
        },
        CREATE_POST: {
            CREATE_POST_DIALOG: {
                BACKGROUND_COLOR: "#d32f2f",
                TITLE_BACKGROUND_COLOR: "#9a0007",
                TITLE_TEXT_COLOR: "#ffffff",
                BUTTON_BACKGROUND: "#9a0007",
                BUTTON_TEXT_COLOR: "#ffffff",
                UPLOAD_FILE_BUTTON_BACKGROUND_COLOR: "9a0007",
            }
        },
        POST: {
            COMMENT_CARD: {
                BACKGROUND_COLOR: "#d32f2f",
                TEXT_COLOR: "#fff",
                TEXT_AREA_BACKGROUND_COLOR: "#9a0007",
            },
        },
        BODY: {
            BACKGROUND_IMAGE: 'url(https://res.cloudinary.com/dkb1nvu7q/image/upload/v1575470467/Z6kdWmA.jpg)',
            BACKGROUND_COLOR: '#ff0000',
        }
    },

    [THEME_NAMES.FELICITOUS_FOREST]:{
        TOPBAR: {
            SHADOW_COLOR: "rgba(255,255,255,.2)",
            DROPDOWN: {
                BACKGROUND_IMAGE: 'url(https://res.cloudinary.com/dkb1nvu7q/image/upload/v1580057659/a9a83efe190ed9660b27be8047b94edd.jpg)',
            },
        },
        FRONT: {
            POST_SUMMARY: {
                BACKGROUND_COLOR: "#3b8e3f", // Light
                UPVOTE_BUTTON_SELECTED_COLOR: "#ffffff",
                UPVOTE_BUTTON_DESELECTED_COLOR: "#00701a", // Dark
                DONWVOTE_BUTTON_SELECTED_COLOR: "#ffffff",
                DONWVOTE_BUTTON_DESELECTED_COLOR: "#00701a", // Dark
                VOTE_TEXT_COLOR: "#00701a", // Dark
                VOTE_BOX_SHADOW_COLOR: "#3b8e3f", // Light
            },
            TOP_POSTS: {
                BACKGROUND_COLOR: "#3b8e3f", // Light
                POST_TITLE_COLOR: "#ffffff",
                POST_VOTES_COLOR: "#ffffff",
                DARK_BACKGROUND_COLOR: "#00701a", // Dark
            },
            OPACITY: 1,
        },
        CREATE_POST: {
            CREATE_POST_DIALOG: {
                BACKGROUND_COLOR: "#3b8e3f", // Light
                TITLE_BACKGROUND_COLOR: "#00701a", // Dark
                TITLE_TEXT_COLOR: "#ffffff",
                BUTTON_BACKGROUND: "#00701a", // Dark
                BUTTON_TEXT_COLOR: "#ffffff",
                UPLOAD_FILE_BUTTON_BACKGROUND_COLOR: "00701a", // Dark
            }
        },
        POST: {
            COMMENT_CARD: {
                BACKGROUND_COLOR: "#3b8e3f", // Light
                TEXT_COLOR: "#fff",
                TEXT_AREA_BACKGROUND_COLOR: "#00701a", // Dark
            },
        },
        BODY: {
            BACKGROUND_IMAGE: 'url(https://res.cloudinary.com/dkb1nvu7q/image/upload/v1580057659/a9a83efe190ed9660b27be8047b94edd.jpg)',
            BACKGROUND_COLOR: '#ff0000',
        }
    },

    [THEME_NAMES.MULISH_MOUNTAINS]:{
        TOPBAR: {
            SHADOW_COLOR: "rgba(255,255,255,.2)",
            DROPDOWN: {
                BACKGROUND_IMAGE: 'url(https://res.cloudinary.com/dkb1nvu7q/image/upload/v1580057978/22121.jpg)',
            },
        },
        FRONT: {
            POST_SUMMARY: {
                BACKGROUND_COLOR: "#c2185b", // Light
                UPVOTE_BUTTON_SELECTED_COLOR: "#ffffff",
                UPVOTE_BUTTON_DESELECTED_COLOR: "#8c0032", // Dark
                DONWVOTE_BUTTON_SELECTED_COLOR: "#ffffff",
                DONWVOTE_BUTTON_DESELECTED_COLOR: "#8c0032", // Dark
                VOTE_TEXT_COLOR: "#8c0032", // Dark
                VOTE_BOX_SHADOW_COLOR: "#c2185b", // Light
            },
            TOP_POSTS: {
                BACKGROUND_COLOR: "#c2185b", // Light
                POST_TITLE_COLOR: "#ffffff",
                POST_VOTES_COLOR: "#ffffff",
                DARK_BACKGROUND_COLOR: "#8c0032", // Dark
            },
            OPACITY: 1,
        },
        CREATE_POST: {
            CREATE_POST_DIALOG: {
                BACKGROUND_COLOR: "#c2185b", // Light
                TITLE_BACKGROUND_COLOR: "#8c0032", // Dark
                TITLE_TEXT_COLOR: "#ffffff",
                BUTTON_BACKGROUND: "#8c0032", // Dark
                BUTTON_TEXT_COLOR: "#ffffff",
                UPLOAD_FILE_BUTTON_BACKGROUND_COLOR: "8c0032", // Dark
            }
        },
        POST: {
            COMMENT_CARD: {
                BACKGROUND_COLOR: "#c2185b", // Light
                TEXT_COLOR: "#fff",
                TEXT_AREA_BACKGROUND_COLOR: "#8c0032", // Dark
            },
        },
        BODY: {
            BACKGROUND_IMAGE: 'url(https://res.cloudinary.com/dkb1nvu7q/image/upload/v1580057978/22121.jpg)',
            BACKGROUND_COLOR: '#ff0000',
        }
    },

    [THEME_NAMES.SPRY_SAVANNAH]:{
        TOPBAR: {
            SHADOW_COLOR: "rgba(255,255,255,.2)",
            DROPDOWN: {
                BACKGROUND_IMAGE: 'url(https://res.cloudinary.com/dkb1nvu7q/image/upload/v1580057956/342588.jpg)',
            },
        },
        FRONT: {
            POST_SUMMARY: {
                BACKGROUND_COLOR: "#e64a19", // Light
                UPVOTE_BUTTON_SELECTED_COLOR: "#ffffff",
                UPVOTE_BUTTON_DESELECTED_COLOR: "#ac0800", // Dark
                DONWVOTE_BUTTON_SELECTED_COLOR: "#ffffff",
                DONWVOTE_BUTTON_DESELECTED_COLOR: "#ac0800", // Dark
                VOTE_TEXT_COLOR: "#ac0800", // Dark
                VOTE_BOX_SHADOW_COLOR: "#e64a19", // Light
            },
            TOP_POSTS: {
                BACKGROUND_COLOR: "#e64a19", // Light
                POST_TITLE_COLOR: "#ffffff",
                POST_VOTES_COLOR: "#ffffff",
                DARK_BACKGROUND_COLOR: "#ac0800", // Dark
            },
            OPACITY: 1,
        },
        CREATE_POST: {
            CREATE_POST_DIALOG: {
                BACKGROUND_COLOR: "#e64a19", // Light
                TITLE_BACKGROUND_COLOR: "#ac0800", // Dark
                TITLE_TEXT_COLOR: "#ffffff",
                BUTTON_BACKGROUND: "#ac0800", // Dark
                BUTTON_TEXT_COLOR: "#ffffff",
                UPLOAD_FILE_BUTTON_BACKGROUND_COLOR: "ac0800", // Dark
            }
        },
        POST: {
            COMMENT_CARD: {
                BACKGROUND_COLOR: "#e64a19", // Light
                TEXT_COLOR: "#fff",
                TEXT_AREA_BACKGROUND_COLOR: "#ac0800", // Dark
            },
        },
        BODY: {
            BACKGROUND_IMAGE: 'url(https://res.cloudinary.com/dkb1nvu7q/image/upload/v1580057956/342588.jpg)',
            BACKGROUND_COLOR: '#ff0000',
        }
    },

    [THEME_NAMES.SCINTILLATING_SKYSCRAPERS]:{
        TOPBAR: {
            SHADOW_COLOR: "rgba(255,0,0,.2)",
            DROPDOWN: {
                BACKGROUND_IMAGE: 'url(https://res.cloudinary.com/dkb1nvu7q/image/upload/v1580057625/187680.jpg)',
            },
        },
        FRONT: {
            POST_SUMMARY: {
                BACKGROUND_COLOR: "#d32f2f",
            },
            OPACITY: 1,
        },
        BODY: {
            BACKGROUND_IMAGE: 'url(https://res.cloudinary.com/dkb1nvu7q/image/upload/v1580057625/187680.jpg)',
            BACKGROUND_COLOR: '#ff0000',
        }
    },
}
