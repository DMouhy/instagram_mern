import React, { useState, useEffect } from 'react';
import './MainPage.css';
import baseUrl from '../baseUrl';
import Loading from '../components/Shared/Loading';
import Post from '../components/Post/Post';
import { Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom';

function MainPage({ myprofileId , loading_post, posts, have_following }) {

    const [users, set_users] = useState('');
    const [loading_users, set_loading_users] = useState(true)
    const [is_users, set_is_users] = useState({
        bool: false,
        message: ''
    })

    useEffect(() => {
        set_is_users({
            bool: false,
            message: ''
        })
        set_loading_users(true)
        fetch_all_users()
    }, [])

    function fetch_all_users(){

        fetch(`${baseUrl}/api/all_profiles`, {
            method: 'GET'
        })
        .then(res => res.json())
        .then(res => {
            if(res.error){
                set_is_users({
                    bool: true,
                    message: res.error
                })
                set_loading_users(false)
            }

            set_users(res)
            set_loading_users(false)

        })
        .catch(err => console.log(err))
    }

    return loading_post ? <Loading />
    : (
        <>
        {/* users card */}
        <div className="users_list">
            {
                loading_users ? <Loading />
                : (
                    <>
                    {
                        is_users.bool ? 
                        <div className='no_following'>{is_users.message}</div> 
                        : (
                            <>
                            <p className='users_count'>{users.length} users</p>
                            {
                            users.map(user => (
                                <Link to={`/profile/${user._id}`} key={user._id}>
                               <div key={user._id} className='userCard'>
                                   <Avatar src={user.picture} />

                                   <p>{user.user_profile.username}</p>
                               </div>
                               </Link>
                            ))
                            }
                            </>
                        ) 
                    }
                    </>
                )
            }
        </div>

        {/* posts */}
        {
            have_following.bool ? <div className='no_following'>{have_following.message}</div>
            : (
                <div className="posts">
                    {
                        posts.map(post => (
                            <Post myprofileId={myprofileId} key={post._id} post={post} />
                        ))
                    }
                </div>
            )
        }
        </>
    )
}

export default MainPage
