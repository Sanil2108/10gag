import React from 'react';
import './App.css';

import TopBar from '../sharedComponents/TopBar/TopBar';

import Front from '../pages/front/Front';
import Settings from '../pages/settings/Settings';
import User from '../pages/user/User';
import CreatePost from '../pages/createPost/createPost';
import Post from '../pages/post/Post';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

class App extends React.Component {

    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <div className="App">
                <TopBar>
                
                </TopBar>
                <Router>
                <Switch>
                    <Route path="/user/:userName">
                        <User></User>
                    </Route>
                    <Route path="/post/:postId">
                        <Post></Post>
                    </Route>
                    <Route path="/settings">
                        <Settings></Settings>
                    </Route>
                    <Route path="/createPost">
                        <CreatePost></CreatePost>
                    </Route>
                    <Route path="/">
                        <Front></Front>
                    </Route>
                </Switch>
                </Router>
            </div>
        );
    }
}



export default App;
