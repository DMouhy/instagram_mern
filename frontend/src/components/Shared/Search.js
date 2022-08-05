import React, { useState, useEffect } from 'react';
import './Search.css';
import { FiSearch } from 'react-icons/fi';
import BaseUrl from '../../baseUrl';
import { Avatar } from '@material-ui/core';
import Loading from './Loading';
import { Link } from 'react-router-dom';

function Search() {

    const [search_string, set_search_string] = useState('');
    const [profiles, set_profiles] = useState([]);
    const [message, set_message] = useState({
        type: '',
        text: ''
    })
    const [loading, set_loading] = useState(false);

    function set_search(e){
        set_search_string(e.target.value)
    }

    useEffect(() => {
        if(search_string === ''){
            set_message({
                type: '',
                text: ''
            })

            profiles.length = 0
            set_loading(false);
        }  
        else fetch_Search()

    }, [search_string, profiles.length])

    async function fetch_Search(){

        if(search_string !== ''){

            set_loading(true);

            await fetch(`${BaseUrl}/api/search_profile`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({search_string})
            })
            .then(res => res.json())
            .then(res => {
                if(!res.Empty_error && !res.error){
                    set_profiles(res)
                    set_message({
                        type: 'success',
                        message: ''
                    })
                }
                if(res.error){
                    set_message({
                        type: 'error',
                        text: res.error
                    })
                }
                set_loading(false);
            } )

        }

    }

    if(message.type === 'error') {profiles.length = 0}

    return (
        <>
        <div className="search_profile">
            <div className='search_icon' onClick={fetch_Search}>
                {
                  loading ? <Loading /> : <FiSearch />
                }
            </div>

            <input
                onChange={(e) => { set_search(e) } } 
                type="text" 
                placeholder='Search...' 
                value={search_string} 
            />

            <div className={`profile_list ${search_string === '' && 'hide_profile_list'}`}>
                {
                profiles.map(profile => (
                    <Link onClick={() => set_search_string('')} to={`/profile/${profile.profile._id}`} key={profile.profile._id} className="card">
                        <Avatar className='Avatar' src={profile.profile.picture} />
                        <span>{profile.profile.user_profile.username}</span>
                    </Link>
                    ))
                    }
                    {
                    message.type === 'error' && <div className='message'>{message.text}</div>
                }
            </div>

        </div>
        </>
    )
}

export default Search
