import React, { useState, useEffect, useRef } from 'react';
import './PostDetail.css';
import { MdCancel } from 'react-icons/md';
import baseUrl from '../../baseUrl';
import Loading from '../Shared/Loading';
import { Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { BsHeartFill } from 'react-icons/bs';
import { MdDeleteForever } from 'react-icons/md';

function PostDetail({ is_mine, postId, set_postId, fetchProfiles, myId }) {

    const [post, set_post] = useState('');
    const [user, set_user] = useState('');
    const [loading_postData, set_loading_postData] = useState(true);
    const [comment, set_comment] = useState('');
    const [comments, set_comments] = useState([]);
    const [likes, set_likes] = useState([]);
    const [loading_comments, set_loading_comments] = useState(true);

    const [liked, set_liked] = useState(false);

    const [hide_del_val, set_hide_del_val] = useState(true);
    const [loading_del_val, set_loading_del_val] = useState(false);

    function Refresh(){
        get_Comments()
        get_likes()

        setTimeout(() => Refresh(), 5000)
    }
    useEffect(() => Refresh(), [])

    useEffect(() => {
        set_loading_comments(true)
        get_Comments()

        if(postId){
            fetching_postDetail()
            get_likes()
        }
        else return
    }, [postId])

    useEffect(() => {
        if(likes) set_liked(likes.includes(myId))
    }, [likes])

    function fetching_postDetail(){

        set_loading_postData(true)

        fetch(`${baseUrl}/api/post_detail`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                postId
            })
        })
        .then(res => res.json())
        .then(res => {
            if(res.error){
                localStorage.removeItem('token');
                window.location.reload(false);
            }
            else{
                set_post(res.post)
                set_user(res.user)
                set_loading_postData(false)
            }
        })

    }

    // fetch post Comments
    function get_Comments(){

        fetch(`${baseUrl}/api/all_post_comments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ postId })
        })
        .then(res => res.json() )
        .then(res => {
            set_comments(res.comments)
            set_loading_comments(false)
        } )
    }

    function add_Comment(e){

        e.preventDefault()

        if(comment){

            const token = localStorage.getItem('token') || ''
        
            fetch(`${baseUrl}/api/add_comment`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer${token}`
                },
                body: JSON.stringify({
                    'postId': postId,
                    'comment': comment
                })
            })
            .then(res => res.json())
            .then(res => {
                if(res.error){
                    localStorage.removeItem('token')
                    window.location.reload(false)
                }
                else{
                    set_comment('')
                    get_Comments()
                    fetchProfiles()
                }
            })
        }
    }

    function get_likes(){

        fetch(`${baseUrl}/api/get_likes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ postId })
        })
        .then(res => res.json())
        .then(res => set_likes(res.likes) )

    }

    function like_unlike(){

        set_liked(!liked)
        const token = localStorage.getItem('token') || ''

        fetch(`${baseUrl}/api/like_unlike`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer${token}`
             },
             body: JSON.stringify({
                 'postId': postId
             })
        })
        .then(res => res.json())
        .then(res => {
            if(res.error){
                localStorage.removeItem('token')
                window.location.reload(false)
            }

            fetchProfiles()
            get_likes()
            
        } )
    }

    function deletePost(){

        set_loading_del_val(true)
        const token = localStorage.getItem('token') || ''

        fetch(`${baseUrl}/api/delete_post`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer${token}`
            },
            body: JSON.stringify({ postId })
        })
        .then(res => res.json())
        .then(res => {
            if(res.error){
                localStorage.removeItem('token')
                window.location.reload(false)
            }
            console.log(res.message)
            set_loading_del_val(false)
            set_hide_del_val(true)
            set_postId('')
            fetchProfiles()
        })
    }

    return (
        <div className='postDetail_container'>
            
            <div className='cancel_btn' onClick={() => set_postId('')} ><MdCancel /></div>

            <div className="postDetail">
                {   loading_postData ? <Loading />
                    :
                    <>
                        <div className="post_image">
                            <img src={post.image} alt="#"/>
                        </div>

                        <div className="data">
                            <div className="header">
                                <div className="username">
                                    <Avatar className='avatar' src={user.picture} /> <span>{user.username.username}</span>
                                </div>
                                <div className={`delete_post ${!is_mine && 'hide_trash'}`}>
                                    <MdDeleteForever onClick={() => set_hide_del_val(false) } className='trash' />
                                </div>

                                <div className={`delete_validate_container ${hide_del_val && 'hide_del_val' }`}>
                                    <div className="btns">

                                        { loading_del_val ? <Loading />
                                           :(
                                            <>
                                            <p>Sure you want to delete?</p>
                                            <button onClick={deletePost} >Delete</button>
                                            <button onClick={() => set_hide_del_val(true) } >Cancel</button>
                                            </>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className="caption">
                                <Avatar src={user.picture} />
                                <div className="msg">
                                        <p>{user.username.username}</p>
                                        <p>{post.caption}</p>
                                </div>
                            </div>

                            <div className="comments">
                                {
                                    loading_comments ? <Loading />
                                    :
                                    <>
                                    {
                                    comments.length !== 0 ? (
                                        <>
                                        {
                                            comments.map(comment => (
                                                <Link key={comment.commentData._id} to={`/profile/${comment.commentData.posted_by._id}`} >
                                                <div className="comment">
                                                    <Avatar src={comment.commentData.posted_by.picture} />
                                                    <div className="msg">
                                                        <p>{comment.posted_by_username}</p>
                                                        <p>{comment.commentData.comment}</p>
                                                    </div>
                                                </div>
                                                </Link>
                                            ))
                                        }
                                        </>
                                    )
                                    :
                                    <p className='noComment'>No comment available</p>
                                    }
                                    </>
                                }
                            </div>

                            <form onSubmit={(e) => add_Comment(e)} className="add_comment">
                                <input onChange={(e) => set_comment(e.target.value)} type="text" value={comment} placeholder='add comment...'  />
                            </form>

                            <div className="likes">
                                <BsHeartFill onClick={like_unlike} className={`hearth ${liked ? 'liked' : 'notliked'}`} />
                                <p><span>{likes.length}</span> likes</p>
                            </div>

                        </div>
                    </>

                }
            </div>
            
        </div>
    )
}

export default PostDetail
