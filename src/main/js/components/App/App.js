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
} from '../../constants';

import './App.css';

import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";

class App extends React.Component {

    constructor(props) {
        super(props);

        // Default values
        getStoreInstance().updateOrCreate(USER_KEY, {
            email: null,
            token: null,
            userName: null,
            upvotedPostsIds: [],
            downvotedPostsIds: [],
        });
        getStoreInstance().updateOrCreate(THEME_KEY, THEME_NAMES.FASCINATING_FIRE);
        getStoreInstance().updateOrCreate(GAPI_KEY, null);

        getStoreInstance().subscribe(THEME_KEY, this.themeChanged.bind(this));

        // TODO: Temp
        window.storeInstance = getStoreInstance();

        this.baseTheme = createMuiTheme();

        this.themeChanged(THEME_KEY, null, getStoreInstance().get(THEME_KEY));
    }

    componentDidMount() {
        document.body.onload = () => {
            getStoreInstance().updateOrCreate(GAPI_KEY, window.gapi);
        }
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
