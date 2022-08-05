import React, { useState, useEffect } from 'react';
import './Post.css';
import { Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import baseUrl from '../../baseUrl';
import Loading from '../Shared/Loading';
import { BsHeartFill } from 'react-icons/bs';

function Post({ myprofileId, post }) {

    const [comments, set_comments] = useState([])
    const [loading_comments, set_loading_comments] = useState(true);
    const [comment, set_comment] = useState('');

    const [likes, set_likes] = useState([]);
    const [liked, set_liked] = useState(false);

    function Refresh(){
        get_Comments()
        get_likes()

        setTimeout(() => Refresh(), 5000)
    }
    useEffect(() => Refresh(), [])

    useEffect(() => {
        set_loading_comments(true)
        get_Comments()
        get_likes()
    }, [post._id])

    useEffect(() => {
        if(likes) set_liked(likes.includes(myprofileId))
    }, [likes])

    function get_likes(){

        fetch(`${baseUrl}/api/get_likes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ postId: post._id })
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
                 postId: post._id
             })
        })
        .then(res => res.json())
        .then(res => {
            if(res.error){
                localStorage.removeItem('token')
                window.location.reload(false)
            }

            get_likes()
            
        } )
    }

    // fetch post Comments
    function get_Comments(){

        fetch(`${baseUrl}/api/all_post_comments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ postId: post._id })
        })
        .then(res => res.json() )
        .then(res => {
            set_comments(res.comments)
            set_loading_comments(false)
        } )
    }

    // Add Comment
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
                    'postId': post._id,
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
                }
            })
        }
    }

    return (
        <div className='post'>
            <div className="post_username">
                <Avatar className='avatar' src={post.posted_by.picture} />
                <Link to={`/profile/${post.posted_by._id}`}>
                <p>{post.username}</p>
                </Link>
            </div>

            <div className="post_post_img">
                <img src={post.image} alt="#"/>
            </div>

            <div className="post_likes">
                <BsHeartFill onClick={like_unlike} className={`hearth ${liked ? 'liked' : 'notliked'}`} />
                <p><span>{likes.length}</span> likes</p>
            </div>

            <div className="post_caption">
                <Avatar className='avatar' src={post.posted_by.picture} />
                <div className="caption_data">
                    <p>{post.username}</p>
                    <p>{post.caption}</p>
                </div>
            </div>

            {
                loading_comments ? <Loading />
                : (
                    <>
                    { comments.length !== 0 && (
                    <div className="post_comments">
                        {
                            comments.map(comment => (
                                <div key={comment._id} className="comment_card">
                                    <Avatar className='avatar' src={comment.commentData.posted_by.picture} />
                                    <div className="caption_data">
                                        <Link to={`/profile/${comment.commentData.posted_by._id}`}>
                                        <p>{comment.posted_by_username}</p>
                                        </Link>
                                        <p>{comment.commentData.comment}</p>
                                    </div>
                                </div>
                            ) )
                        }
                    </div>
                    )
                    }
                    </>
                )
            }
            
            <form onSubmit={(e) => add_Comment(e)} className="post_add_comment">
                <input onChange={(e) => set_comment(e.target.value)} type="text" value={comment} placeholder='add comment...'  />
            </form>

        </div>
    )
}

export default Post
