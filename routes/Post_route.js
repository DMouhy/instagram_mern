const express = require('express');
const router = express.Router();
const post_Collection = require('../models/Post_model');
const profile_Collection = require('../models/Profile_model');
const RequiredLogin = require('../middlewares/RequiredLogin');

// Create Post
router.post('/create_post', RequiredLogin, (req, res) => {
    const { image, caption } = req.body;

    if(!image) return res.status(402).json({error: 'Need an Image for the post'})

    profile_Collection.findById(req.user._id)
    .populate('user_profile', 'username')
    .then(myprofile => {
        
        const new_post = new post_Collection({
            posted_by: req.user._id,
            username: myprofile.user_profile.username,
            created_at: new Date().toUTCString(),
            image,
            caption
        })
    
        new_post.save()
        .then(saved_post => res.json({message: 'Post Successfuly Added'}) )
        .catch(err => console.log('createpost: ', err))
    })
})

// Delete Post
router.post('/delete_post', RequiredLogin, (req, res) => {
    const { postId } = req.body;

    if(!postId) return res.status(422).json({noId: 'need a post Id'})

    post_Collection.findById(postId)
    .then(post => {
        if(post.posted_by._id.toString() !== req.user._id.toString()) return res.status(404).json({notYours: 'not able to delete this post'})
        post.remove()
        .then(reslt => res.json({message: 'successfuly deleted'}) )
    })
    .catch(err => res.json({noPost: 'no post with this Id'}) )
} )

//Get SpecificPost
router.post('/post_detail', RequiredLogin, (req, res) => {
    const { postId } = req.body;

    if(!postId) return res.status(422).json({error: 'no postId'})

    post_Collection.findById(postId)
    .then(post => {
        profile_Collection.findById(post.posted_by)
        .populate('user_profile', 'username')
        .populate('comments', 'username picture')
        .then(profile => res.json({
            post,
            user: {
                picture: profile.picture,
                username: profile.user_profile
            }
        }))
        .catch(err => res.status(422).json({error: 'No profile'}) )

    })
    .catch(err => res.status(422).json({error: 'No post'}) )
})

// get all posts
router.get('/all_following_posts', RequiredLogin, (req, res) => {

    profile_Collection.findById(req.user._id)
    .then(myprofile => {

        let following_posts = myprofile.following
        following_posts.push(req.user._id)

        post_Collection.find({ posted_by: { $in : following_posts } })
        .populate('posted_by', 'picture')
        .sort('-created_at')
        .then(post => {
            if(post.length === 0) return res.json({ noFollow: 'follow someone or post!' })
            res.json(post)
        } )
        .catch(err => console.log(err) )

    })
    .catch(err => console.log(err) )

} )

// add Comment
router.put('/add_comment', RequiredLogin, (req, res) => {
    const { postId, comment } = req.body;

    if(!postId || !comment) return res.status(422).json({ error: 'Give all the fields' })

    post_Collection.findByIdAndUpdate(postId, {
        $push: { comments: {
            comment: comment,
            created_at: new Date().toUTCString(),
            posted_by: req.user._id
        } }
    }, { new: true })
    .then(reslt => res.json({ message: 'Message created', reslt }) )
    .catch(err => res.status(422).json({ error: 'No post' }) )

} )

// get All post Comments
router.post('/all_post_comments', (req, res) => {
    const { postId } = req.body;

    if(!postId) return res.status(422).json({error: 'Give all fields'})

    post_Collection.findById(postId)
    .populate('comments.posted_by', 'picture user_profile')
    .then(post => {

        let comments = []
        
        if(post.comments.length === 0) return res.json({ comments })

        post.comments.map((comment, index) => {

            profile_Collection.findById(comment.posted_by._id)
            .populate('user_profile', 'username')
            .then(profile => {

                comments.push({
                    posted_by_username: profile.user_profile.username,
                    commentData: comment
                })

                if(post.comments[index + 1] === undefined){
                    return res.json({comments})
                }
            } )
        })
    })
    .catch(err => res.status(422).json({error: 'no post'}) )

} )

// like a post
router.post('/like_unlike', RequiredLogin, (req, res) => {
    const { postId } = req.body;

    if(!postId) return res.status(422).json({error: 'give all fields'})

    post_Collection.findById(postId)
    .then(post => {
        if(post.likes.includes(req.user._id)){
            post_Collection.findByIdAndUpdate(postId, {
                $pull: { likes: req.user._id }
            }, { new: true })
            .then(reslt => res.json({message: 'successfuly unliked'}))
        }
        else{
            post_Collection.findByIdAndUpdate(postId, {
                $push: { likes: req.user._id }
            }, { new: true })
            .then(reslt => res.json({message: 'successfuly liked'}))
        }
    })
    .catch(err => console.log('no post with this Id'))
} )

// get Likes
router.post('/get_likes', (req, res) => {
    const { postId } = req.body;

    if(!postId) return res.status(422).json({error: 'give all fields'})

    post_Collection.findById(postId)
    .then(post => res.json({ likes: post.likes }) )
    .catch(err => console.log('no post with this Id'))
} )

module.exports = router