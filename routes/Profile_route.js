const express = require('express');
const router = express.Router();
const profile_Collection = require('../models/Profile_model');
const post_Collection = require('../models/Post_model');
const RequiredLogin = require('../middlewares/RequiredLogin');

//Search Profile
router.post('/search_profile', (req, res) => {
    const { search_string } = req.body;

    if(!search_string) return res.status(422).json({Empty_error: 'search Empty'})

    const search_str_Lower = search_string.toLowerCase()

    profile_Collection.find()
    .populate('user_profile', 'username')
    .then(profiles => {
        let profilesFound = []

        profiles.map(profile => {
            const username = profile.user_profile.username.toLowerCase()
            if(username.startsWith(search_str_Lower)){
                return profilesFound.push({profile})
            }
        } )

        if(profilesFound.length === 0){
            return res.status(422).json({error: 'No Result'})
        }
        return res.json(profilesFound)
    } )
    .catch(err => res.status(422).json({error: 'No profile available'}) )
})

//My Profile & posts
router.get('/my_profile_posts', RequiredLogin, (req, res) => {
    profile_Collection.findById(req.user._id)
    .populate('user_profile', 'username email first_name last_name')
    .then(profile => {
        post_Collection.find({ posted_by: profile._id })
        .sort('-created_at')
        .populate('posted_by', 'username')
        .then(posts => {
            return res.json({
                message: 'Success',
                profile,
                posts
            })
        })
    } )
    .catch(err => {
        console.log(err)
        res.status(422).json({error: "Don't have Profile"})
    } )
} )

//my profile Id
router.get('/myProfile', RequiredLogin, (req, res) => {
    profile_Collection.findById(req.user._id)
    .populate('user_profile', 'username')
    .then(myprofile => {
        return res.json({myprofile})
    })
})

// is_My_Profile BOOL
router.post('/is_my_profile', RequiredLogin, (req, res) => {
    const { profile_id } = req.body;

    if(profile_id === req.user._id.toString()) return res.json({message: true, myId: req.user._id})
    if(profile_id !== req.user._id) return res.json({message: false, myId: req.user._id})
})

//X Profiles & posts
router.get('/x_profile_posts/:id', (req, res) => {
    profile_Collection.findOne({ _id: req.params.id })
    .populate('user_profile', 'username email first_name last_name')
    .then(profile => {
        post_Collection.find({ posted_by: profile._id })
        .sort('-created_at')
        .then(posts => {
            return res.json({
                message: 'Success',
                profile,
                posts
            })
        })
        .catch(err => {
            console.log('1: ', err)
            return res.status(422).json({error: 'No Post'})
        } )
    })
    .catch(err => {
        console.log('2: ', err)
        return res.status(422).json({error: `No Profile with: ${req.params.id}`})
    } )
} )

// get all profiles
router.get('/all_profiles', (req, res) => {
    profile_Collection.find()
    .populate('user_profile', 'username')
    .then(profiles => res.json(profiles) )
    .catch(err => res.status(422).json({error: 'no users'}) )
} )

//Change Profile Image
router.put('/change_profile_image', RequiredLogin, (req, res) => {
    const { imageUrl } = req.body;

    if(!imageUrl) return res.status(422).json({message: 'No image'})

    profile_Collection.findByIdAndUpdate(req.user._id, {
        $set: { picture: imageUrl }
    },
    { new: true })
    .then(reslt => res.json({message: 'Successfuly Changed'}))

})

// remove profile_image
router.put('/remove_profile_image', RequiredLogin, (req, res) => {

    profile_Collection.findByIdAndUpdate(req.user._id, {
        $set: { picture: 'https://res.cloudinary.com/dchnmxssq/image/upload/v1601118594/instagram_mern_images/profileimg_sugvm2.png' }
    },
    { new: true })
    .then(reslt => res.json({message: 'Successfuly removed'}))

})

// Follow & Unfollow
router.put('/follow', RequiredLogin, (req, res) => {
    const { profile_id } = req.body;

    if(profile_id === req.user._id) return res.status(422).json({error: "can't follow your profile"})

    if(req.user.following.includes(profile_id)) return res.status(422).json({error: "Already following this profile"}) 

    profile_Collection.findByIdAndUpdate(req.user._id, {
        $push: { following: profile_id }
    }, 
    { new: true })
    .then( reslt => {

        profile_Collection.findByIdAndUpdate(profile_id, {
            $push: { followers: req.user._id }
        }, 
        { new: true })
        .then(reslt => res.json({message: 'Follow Success'}) )
        .catch(err => res.status(422).json({error: "can't find this profile"}) )

    })
    .catch(err => res.status(422).json({error: "can't find your profile"}) )
})

router.put('/unfollow', RequiredLogin, (req, res) => {
    const { profile_id } = req.body;

    if(profile_id === req.user._id) return res.status(422).json({error: "can't unfollow your profile"})

    if(!req.user.following.includes(profile_id)) return res.status(422).json({error: "You are not following this profile"}) 

    profile_Collection.findByIdAndUpdate(req.user._id, {
        $pull: { following: profile_id }
    }, 
    { new: true })
    .then( result => {

        profile_Collection.findByIdAndUpdate(profile_id, {
            $pull: { followers: req.user._id }
        }, 
        { new: true })
        .then(reslt => res.json({message: 'Unfollow Success'}) )
        .catch(err => res.status(422).json({error: "can't find this profile"}) )
    })
    .catch(err => res.status(422).json({error: "can't find your profile"}) )
})

module.exports = router;