import React from 'react'
import { Container } from '@material-ui/core';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Home from './Components/Home/Home';
import Auth from './Components/Auth/Auth';
import PostDetails from './Components/PostDetails/PostDetails';
import { GoogleOAuthProvider } from '@react-oauth/google';
// import { AUTH } from './constants/actionTypes';
// import { useSelector } from 'react-redux';

const App = () => {
    const user = JSON.parse(localStorage.getItem('profile'))
    return (
        <GoogleOAuthProvider clientId='577957096569-t7cgcllj3a8kjkv84m3brnhjp5coqtr5.apps.googleusercontent.com'>
            <BrowserRouter>
                <Container maxidth="xl">
                    <Navbar />
                    <Switch>
                        <Route path="/" exact component={() => <Redirect to='/posts' />}/>
                        <Route path='/posts' exact component={Home}/>
                        <Route path='/posts/search' exact component={Home}/>
                        <Route path='/posts/:id' component={PostDetails}/>
                        <Route path="/auth" exact component={() => (!user ? <Auth/> : <Redirect to="/posts"/>)}/>
                    </Switch>
                </Container>
            </BrowserRouter>
        </GoogleOAuthProvider>
    )
}

export default App