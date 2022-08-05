import React, { useState, useEffect } from 'react';
import './CreatePost.css';
import { BiImageAdd } from 'react-icons/bi';
import { MdCancel } from 'react-icons/md'
import baseUrl from '../../baseUrl';
import Loading from '../Shared/Loading';

function CreatePost({ fetch_my_profile_posts, fetch_followingPosts }) {

    const [hide_CreatePost, set_hide_CreatePost] = useState(true);
    const [previewImage, set_previewImage] = useState('');
    const [postImage, set_postImage] = useState('');
    const [postCaption, set_postCaption] = useState('');
    const [ImageUrl, set_ImageUrl] = useState('');
    const [loading_postImage, set_loading_postImage] = useState(false)

    useEffect(() => {
        if(ImageUrl){
            fetch(`${baseUrl}/api/create_post`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    'image': ImageUrl,
                    'caption': postCaption
                })
            })
            .then(res => res.json())
            .then(res => {
                if(res.error){
                    localStorage.removeItem('token')
                    window.location.reload(false)
                }
                else{
                    set_ImageUrl('')
                    set_postCaption('')
                    set_postImage('')
                    set_previewImage('')
                    set_loading_postImage(false)
                    set_hide_CreatePost(true)
                    fetch_my_profile_posts()
                    fetch_followingPosts()
                }
            })
        }
    }, [ImageUrl])

    function addImageTo_Cloudinary(){

        if(postImage){
            set_loading_postImage(true)

            const data = new FormData();
            data.append('file', postImage);
            data.append('upload_preset', 'instagram_mern_media');
            data.append('cloud_name', 'dchnmxssq');

            fetch('https://api.cloudinary.com/v1_1/dchnmxssq/image/upload', {
                method: 'POST',
                body: data
            })
            .then(res => res.json())
            .then(res => set_ImageUrl(res.url) )
            .catch(err => console.log(err) )
        }
        
    }
    
    return (
        <>
        <button>
            <BiImageAdd onClick={() => set_hide_CreatePost(false)} />
        </button>

        <div className={`addpost_container ${hide_CreatePost && 'hide_CreatePost'}`}>
            {
                !loading_postImage && (
                    <button onClick={() => {
                        set_previewImage('')
                        set_postImage('')
                        set_postCaption('')
                        set_hide_CreatePost(true)
                    }} ><MdCancel /></button>
                )
            }

            <div className="add_post">

                <input onChange={(e) => {
                    
                    set_postImage(e.target.files[0])
                    const reader = new FileReader();
                    reader.readAsDataURL(e.target.files[0])
                    reader.onloadend = () => {
                        set_previewImage(reader.result);
                    }
                    
                }} type="file" accept='image/*' name='image' id='import_postImage' />

                <div className="title">Add new Post</div>

                {
                    previewImage !== '' ? (
                        <>
                        {
                            loading_postImage ? (
                                <>
                                <Loading />
                                <div className='wait'>Loading your image...</div>
                                </>
                            )
                            :
                            <>
                            <img src={previewImage} alt="#"/>
                            <input onChange={(e) => set_postCaption(e.target.value)} className="add_caption" type='text' value={postCaption} placeholder='Caption...' />
                            <button onClick={addImageTo_Cloudinary}>Create</button>
                            </>
                        }
                        </>
                    )
                    :
                    <label htmlFor='import_postImage' >Import image</label>
                }

            </div>

        </div>
        </>
    )
}

export default CreatePost
