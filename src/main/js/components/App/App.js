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
            currentUser: null,
            currentTheme: null,
        }
    }

    loginUser(email, token) {
        this.setState({
            currentUser: {
                email, token,
            }
        })
    }

    logoutUser() {
        this.setState({
            currentUser: null,
        })
    }

    changeTheme(newTheme) {
        this.setState({
            currentTheme: newTheme,
        })
    }

    getUser() {
        return (this.state.currentUser !== null) ?
            this.state.currentUser : new Error("User not logged in");
    }

    render() {
        return (
            <div className="App">
                <TopBar
                    loginUserFunction={this.loginUser.bind(this)}
                    logoutUserFunction={this.logoutUser.bind(this)}
                    changeThemeFunction={this.changeTheme.bind(this)}
                    currentUser={this.state.currentUser}
                    currentTheme={this.state.currentTheme}
                >
                
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
