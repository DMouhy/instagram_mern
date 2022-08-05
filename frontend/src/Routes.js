import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './components/Shared/Header';
import MainPage from './pages/MainPage';
import Profile from './pages/Profile';
import XProfile from './components/Profiles/XProfile';
import Loading from './components/Shared/Loading';
import baseUrl from './baseUrl';

function Routes() {

    const [myprofile, set_myprofile] = useState('');
    const [myposts, set_myposts] = useState('');
    const [loading_myprofile, set_loading_myprofile] = useState(true)

    const [posts, set_posts] = useState('');
    const [loading_post, set_loading_post] = useState(true);
    const [have_following, set_have_following] = useState({
        bool: false,
        message: ''
    })

    function Refresh(){
        fetch_followingPosts()

        setTimeout(() => Refresh(), 5000)
    }
    useEffect(() => Refresh(), [])

    useEffect(() => {
        fetch_my_profile_posts()
    }, [myprofile])

    useEffect(() => {
        set_loading_post(true);
        set_have_following({
            bool: false,
            message: ''
        })
        fetch_followingPosts()
    }, [])

    //Fetching my Profiles & posts
    async function fetch_my_profile_posts(){

        await fetch(`${baseUrl}/api/my_profile_posts`, {
            method: 'GET',
            headers: { "Authorization": `Bearer${localStorage.getItem('token')}`  }
        })
        .then(res => res.json())
        .then(res => {
            if(res.error){
                localStorage.removeItem('token');
                window.location.reload(false);
            }
            else{
                set_myposts(res.posts);
                set_myprofile(res.profile);
                set_loading_myprofile(false)
            }
        })
    }

    // fetch following posts
    async function fetch_followingPosts(){

        const  token = localStorage.getItem('token') || '';

        await fetch(`${baseUrl}/api/all_following_posts`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer${token}`
            }
        })
        .then(res => res.json())
        .then(res => {
            if(res.noFollow){
                set_have_following({
                    bool: true,
                    message: res.noFollow
                })
                set_loading_post(false)
            }

            set_posts(res)
            set_loading_post(false)
        })
        .catch(err => console.log(err) )
    }
    
    return (
        <>
        <Header fetch_my_profile_posts={fetch_my_profile_posts} fetch_followingPosts={fetch_followingPosts} />
        <Switch>
            <Route exact path='/' render={() => <MainPage myprofileId={myprofile._id} loading_post={loading_post} posts={posts} have_following={have_following} />} />
            <Route exact path='/profile' render={() => loading_myprofile ? <Loading /> :  <Profile fetchProfiles={fetch_my_profile_posts} profile={myprofile} posts={myposts} /> } />
            <Route exact path='/profile/:id' render={() => <XProfile /> } />
        </Switch>
        </>
    )
}

export default Routes
