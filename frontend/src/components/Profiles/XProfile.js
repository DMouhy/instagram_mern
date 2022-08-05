import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Profile from '../../pages/Profile';
import Loading from '../Shared/Loading';
import baseUrl from '../../baseUrl';

function XProfile() {

    const userId = useParams()
    const [Xprofile, set_Xprofile] = useState('');
    const [Xposts, set_Xposts] = useState('');
    const [loading_Xprofile, set_loading_Xprofile] = useState(true);
    const [id_notExist, set_id_notExist] = useState({
        bool: false,
        message: ''
    });

    useEffect(() => {
        set_id_notExist({ bool: false, message: '' })
        set_loading_Xprofile(true)
        fetch_X_profile_posts()
    }, [userId.id])

    //Fetch Someones profiles
    async function fetch_X_profile_posts(){

        await fetch(`${baseUrl}/api/x_profile_posts/${userId.id}`, {
            method: 'GET'
            }
        )
        .then(res => res.json())
        .then(res => {
            if(res.error){
                set_id_notExist({ 
                    bool: true,
                    message: res.error
                 })
                set_loading_Xprofile(false)
            }
            else{
                set_Xposts(res.posts);
                set_Xprofile(res.profile);
                set_loading_Xprofile(false)
                set_id_notExist({ 
                    bool: false,
                    message: ''
                 })
            }
        })
    }

    return (
        <>
        {
        loading_Xprofile ? <Loading /> :  (
           <> 
           { !id_notExist.bool ?
           <Profile fetchProfiles={fetch_X_profile_posts} profile={Xprofile} posts={Xposts} />
           :
           <div>{id_notExist.message}</div>
           }
           </>
        )
        }
        </>
    )
}

export default XProfile
