import React, { useState, useEffect } from 'react';
import './Profile.css';
import { Avatar } from '@material-ui/core';
import baseUrl from '../baseUrl';
import Loading from '../components/Shared/Loading';
import { AiFillHeart } from 'react-icons/ai';
import { FaComment } from 'react-icons/fa';
import PostDetail from '../components/Post/PostDetail';

function Profile({ fetchProfiles, posts, profile }) {

    const [is_mine, set_is_mine] = useState(true);
    const [myId, set_myId] = useState('');
    const [change_profile_picture, set_change_profile_picture] = useState(false);
    const [imageUrl, set_imageUrl] = useState('');
    const [profile_image, set_profile_image] = useState('');
    const [image_loading, set_image_loading] = useState(false);
    const [follow_loading,set_follow_loading] = useState(false);

    const [postId, set_postId] = useState('');

    useEffect(() => {
        is_this_profile_ismine()
    }, [is_mine])

    useEffect(() => {

        if(profile_image !== ''){ ImageToCloudinary() }

        if(imageUrl !== ''){ send_ImageUrl() }

    }, [profile_image, imageUrl])

    // know if this profile is mine
    function is_this_profile_ismine(){

        fetch(`${baseUrl}/api/is_my_profile`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                "profile_id": profile._id
            })
        })
        .then(res => res.json())
        .then(res => {
            if(res.error){
                localStorage.removeItem('token');
                window.location.reload(false);
            }
            else{
                set_is_mine(res.message)
                set_myId(res.myId)
            }
        })

    }

    // follow & unfollow
    function handle_follow(){

        set_follow_loading(true);
        
        fetch(`${baseUrl}/api/follow`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                "profile_id": profile._id
            })
        })
        .then(res => res.json())
        .then(res => {
            if(res.error){
                set_follow_loading(false);
                localStorage.removeItem('token');
                window.location.reload(false);
            }
            else{
                fetchProfiles()
                set_follow_loading(false);
            }
        })
    }

    function handle_unfollow(){

        set_follow_loading(true);

        fetch(`${baseUrl}/api/unfollow`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                "profile_id": profile._id
            })
        })
        .then(res => res.json())
        .then(res => {
            if(res.error){
                set_follow_loading(false);
                localStorage.removeItem('token');
                window.location.reload(false);
            }
            else{
                fetchProfiles()
                set_follow_loading(false);
            }
        })
    }

    //Add profile pic to Cloudinary
    function ImageToCloudinary(){

        set_image_loading(true)

        const data = new FormData();
        data.append('file', profile_image);
        data.append('upload_preset', 'instagram_mern_media');
        data.append('cloud_name', 'dchnmxssq');
            
        fetch('https://api.cloudinary.com/v1_1/dchnmxssq/image/upload', {
            method: 'POST',
            body: data
        })
        .then(res => res.json())
        .then(res => {
                set_imageUrl(res.url)
        })
        .catch(err => console.log(err))
    }

    //send the Url to our backend
    function send_ImageUrl(){
            
            fetch(`${baseUrl}/api/change_profile_image`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    "imageUrl": imageUrl
                })
                })
                .then(res => res.json())
                .then(res => {
                    if(res.error){
                        localStorage.removeItem('token')
                        window.location.reload(false)
                    }
                    if(res.message){
                        console.log(res.message)
                        set_change_profile_picture(false)
                        set_image_loading(false)
                        window.location.reload(false)
                    }
        
                })
                .catch(err => console.log(err))
    }

    //remove image
    function remove_profile_image(){

        set_image_loading(true)

        fetch(`${baseUrl}/api/remove_profile_image`, {
            method: 'PUT',
            headers: {
                "Authorization": `Bearer${localStorage.getItem('token')}`
            }
            })
            .then(res => res.json())
            .then(res => {
                if(res.error){
                    localStorage.removeItem('token')
                    window.location.reload(false)
                }
                if(res.message){
                    console.log(res.message)
                    set_change_profile_picture(false)
                    set_image_loading(false)
                    fetchProfiles()
                }
    
            })
            .catch(err => console.log(err))

    }

    //Display
    return (
        <div className='profile'>
            <div className="profile_header_flex">

                <Avatar onClick={() => set_change_profile_picture(true)} className={`profile_avatar ${profile.picture === 'https://res.cloudinary.com/dchnmxssq/image/upload/v1601118594/instagram_mern_images/profileimg_sugvm2.png' && 'default_avatar'} ${!is_mine && 'change_avatar'}`} src={profile.picture} />

                <div className={`change_profile_pic ${ !change_profile_picture && 'hide_pic_modify'}`}>

                    <input onChange={(e) => set_profile_image(e.target.files[0])} type="file" accept='image/*' name="image" id="import_image" />

                    <div className="conatiner">
                        {
                            image_loading ? 
                            <Loading />
                            : (
                                <>
                                <p>Modify profile image</p>
                                <label htmlFor="import_image">Import image</label>
                                { 
                                  profile.picture !== 'https://res.cloudinary.com/dchnmxssq/image/upload/v1601118594/instagram_mern_images/profileimg_sugvm2.png' && <p onClick={remove_profile_image} >Remove image</p>
                                }
                                <p onClick={() => {
                                    set_change_profile_picture(false)
                                }} >Cancel</p>
                                </>
                            )
                        }
                    </div>
                </div>
                
                <div className='profile_data'>

                    <div className="username">{profile.user_profile.username}</div>

                    <ul className="ul_flex">
                        <li>{posts.length} <span>posts</span></li>
                        <li>{profile.following.length} <span>following</span></li>
                        <li>{profile.followers.length} <span>followers</span></li>
                    </ul>

                    {
                        !is_mine && (
                            <div className='btns'>
                                {
                                    profile.followers.includes(myId) ? 
                                    <button onClick={handle_unfollow} className="unfollow_btn">{follow_loading ? <Loading /> : 'unfollow'}</button>
                                    :
                                    <button onClick={handle_follow} className="follow_btn">{follow_loading ? <Loading /> : 'follow'}</button>
                                }
                            </div>
                        )
                    }

                    <div className='full_name'>
                        {`${profile.user_profile.last_name} ${profile.user_profile.first_name}`}
                    </div>

                </div>

            </div>
            
            {/* Posts */}
            <div className="profile_posts">
                {
                    posts.length !== 0 && (
                        posts.map(post => {
                            return (
                                <div key={post._id}>
                                <div className="img_container">
                                    <img src={post.image} alt='#' />
                                    <div onClick={() => {
                                        set_postId(post._id)
                                    } } className="show_likes_comments">
                                        <AiFillHeart/>{post.likes.length} - <FaComment/>{post.comments.length}
                                    </div>
                                </div>
                                </div>
                            )
                        })
                    )
                }
                {   postId !== '' &&
                    <PostDetail
                    myId={myId}
                    is_mine={is_mine}
                    fetchProfiles={fetchProfiles}
                    postId={postId}
                    set_postId={set_postId}
                    />
                }
            </div>
        </div>
    )
}

export default Profile
