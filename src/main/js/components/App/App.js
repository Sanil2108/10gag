import React from 'react';
// import './App.css';

import getStoreInstance from '../../Store';

import TopBar from '../sharedComponents/TopBar/TopBar';
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
} from '../../constants';

import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";

class App extends React.Component {

    constructor(props) {
        super(props);

        // Default values
        getStoreInstance().updateOrCreate('user', {email: null, token: null});
        getStoreInstance().updateOrCreate('theme', null);
    }

    render() {
        return (
            <div className="App">
                <Router>
                <Switch>
                    <Route path={USER_PAGE_URL + "/:userName"}>
                        <User></User>
                    </Route>
                    <Route path={POST_PAGE_URL + "/:postId"}>
                        <Post></Post>
                    </Route>
                    <Route path={SETTINGS_PAGE_URL}>
                        <Settings></Settings>
                    </Route>
                    <Route path={CREATE_POST_PAGE_URL}>
                        <CreatePost></CreatePost>
                    </Route>
                    <Route path={FRONT_PAGE_URL}>
                        <Front></Front>
                    </Route>
                </Switch>
                </Router>
            </div>
        );
    }
}



export default App;
