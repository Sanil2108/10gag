import React from 'react';
// import './App.css';

import getStoreInstance from '../../Store';

import Front from '../pages/front/Front';
import Settings from '../pages/settings/Settings';
import User from '../pages/user/User';
import CreatePost from '../pages/createPost/CreatePost';
import Post from '../pages/post/Post';

import {
    USER_PAGE_URL,
    POST_PAGE_URL,
    SETTINGS_PAGE_URL,
    CREATE_POST_PAGE_URL,
    FRONT_PAGE_URL,
    USER_KEY,
    THEME_KEY,
    THEME_NAMES,
    THEMES,
    GAPI_KEY,
    AWS_REGION,
    IDENTITY_POOL_ID,
    S3_BUCKET_NAME,
    S3_API_VERSION,
    S3_KEY,
} from '../../constants';

import './App.css';

import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";

import * as AWS from 'aws-sdk';

class App extends React.Component {

    constructor(props) {
        super(props);

        this.initStore();

        getStoreInstance().subscribe(THEME_KEY, this.themeChanged.bind(this));

        this.baseTheme = createMuiTheme();

        this.themeChanged(THEME_KEY, null, getStoreInstance().get(THEME_KEY));
    }

    initStore() {
        if (getStoreInstance().get(USER_KEY) == null) {
            getStoreInstance().updateOrCreate(USER_KEY, {
                email: null,
                token: null,
                userName: null,
                upvotedPostsIds: [],
                downvotedPostsIds: [],
            });
        }
        else {
            getStoreInstance().sync(USER_KEY);
        }
        if (getStoreInstance().get(THEME_KEY) == null) {
            getStoreInstance().updateOrCreate(THEME_KEY, THEME_NAMES.FASCINATING_FIRE);
        }
        else {
            getStoreInstance().sync(THEME_KEY);
        }
        getStoreInstance().updateOrCreate(GAPI_KEY, null);
    }

    componentDidMount() {
        document.body.onload = () => {
            getStoreInstance().updateOrCreate(GAPI_KEY, window.gapi);
        }

        this.initializeAWS();
    }

    initializeAWS() {
        // TODO: Temp
        window.AWS = AWS;

        AWS.config.update({
            region: AWS_REGION,
            credentials: new AWS.CognitoIdentityCredentials({
                IdentityPoolId: IDENTITY_POOL_ID
            })
        });

        const s3 = new AWS.S3({
            apiVersion: S3_API_VERSION,
            params: { Bucket: S3_BUCKET_NAME }
        });
        getStoreInstance().updateOrCreate(S3_KEY, s3, null, false);
    }

    themeChanged(key, oldValue, newValue) {
        const body = THEMES[newValue].BODY;
        if (body.BACKGROUND_IMAGE) {
            document.body.style.background = body.BACKGROUND_IMAGE;
        }
        else if (body.BACKGROUND_COLOR) {
            document.body.style.backgroundColor = body.BACKGROUND_COLOR;
        }
    }

    render() {
        return (
            <ThemeProvider theme={this.baseTheme}>
                <div className="App">
                    <Router>
                        <Switch>
                            <Route path={USER_PAGE_URL + "/:userName"}>
                                <User></User>
                            </Route>
                            <Route path={POST_PAGE_URL + "/:postId"} component={Post}>
                            </Route>
                            <Route path={SETTINGS_PAGE_URL}>
                                <Settings></Settings>
                            </Route>
                            <Route path={CREATE_POST_PAGE_URL}>
                                <CreatePost></CreatePost>
                            </Route>
                            <Route path={FRONT_PAGE_URL + "10gag/:page"} component={Front}>
                            </Route>
                            <Route path={FRONT_PAGE_URL + "10gag/"} component={Front}>
                            </Route>
                            <Route path={FRONT_PAGE_URL + ":page"} component={Front}>
                            </Route>
                            <Route path={FRONT_PAGE_URL} component={Front}>
                            </Route>
                        </Switch>
                    </Router>
                </div>
            </ThemeProvider>
        );
    }
}



export default App;
