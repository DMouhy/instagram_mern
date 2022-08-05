import React from 'react';
import './Header.css';
import { BiLogOut } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import { Link } from 'react-router-dom';
import Search from './Search';
import CreatePost from '../Post/CreatePost';

function Header({ fetch_my_profile_posts, fetch_followingPosts }) {

    function LogOut(){
        localStorage.removeItem('token');
        window.location.reload(false);
    }

    return (
        <div className='header'>
            <div className="header_flex">

                <div className="header_insta_logo"><Link to='/'>Instagram</Link></div>

                <Search />

                <div className="buttons">
                    <CreatePost fetch_my_profile_posts={fetch_my_profile_posts} fetch_followingPosts={fetch_followingPosts} />
                    <Link to='/profile'><CgProfile /></Link>
                    <button onClick={LogOut} ><BiLogOut /></button>
                </div>

            </div>
        </div>
    )
}

export default Header
