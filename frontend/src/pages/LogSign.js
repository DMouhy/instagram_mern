import React, { useState } from 'react';
import './LogSign.css';
import baseUrl from '../baseUrl';

function LogSign() {

    const [formSwitcher, set_formSwitcher] = useState(false);
    const [loading, set_loading] = useState(false);
    const [message, set_message] = useState({
        type: '',
        text: ''
    });
    const [loginValues, set_loginValues] = useState({
        email: '',
        password: ''
    });
    const [registerValues, set_registerValues] = useState({
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        re_password: ''
    });

    //change login & register Values
    function Change_loginValues(e){
        set_loginValues({...loginValues, [e.target.name]: e.target.value})
    }
    function Change_registerValues(e){
        set_registerValues({...registerValues, [e.target.name]: e.target.value})
    }

    // Submiting Forms
    function Submiting_Login(e){
        e.preventDefault()
        set_loading(true)

        fetch(`${baseUrl}/api/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginValues)
        })
        .then(res => res.json())
        .then(res => {
            if(res.error) {
                console.log(res.error)
                set_message({type: 'error', text: res.error})
                setTimeout(() =>  set_message({type: '', text: ''}), 4000)
                set_loading(false)
            }
            else {
                console.log(res)
                set_message({type: 'success', text: res.message})
                setTimeout(() =>  set_message({type: '', text: ''}), 4000)
                set_loginValues({
                    email: '',
                    password: ''
                })
                localStorage.setItem('token', res.token)
                window.location.reload(false)
                set_loading(false)
            }
        } )

    } 

    function Submiting_Register(e){
        e.preventDefault()
        set_loading(true)

        fetch(`${baseUrl}/api/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(registerValues)
        })
        .then(res => res.json())
        .then(res => {
            if(res.error) {
                console.log(res.error)
                set_message({type: 'error', text: res.error})
                setTimeout(() =>  set_message({type: '', text: ''}), 4000)
                set_loading(false)
            }
            else {
                set_message({type: 'success', text: res.message})
                setTimeout(() =>  set_message({type: '', text: ''}), 4000)
                set_loginValues({
                    email: registerValues.email,
                    password: registerValues.password
                })
                set_formSwitcher(false)
                set_registerValues({
                    username: '',
                    first_name: '',
                    last_name: '',
                    email: '',
                    password: '',
                    re_password: ''
                })
                set_loading(false)
            }
        } )

    }
    
    return (
        <>
        <div className="logSign">

            <div className="FormContainer">
                <div className="insta_logo">Instagram</div>
                
                <div className={`${message.type === 'error' ? 'message_error' : '' }${message.type === 'success' ? 'message_success' : '' }`} >{message.text}</div>

                <form onSubmit={(e) => Submiting_Login(e)} className={`login_form ${formSwitcher && 'hide'}`} >
                    <input onChange={(e) => Change_loginValues(e)} name='email' type="email" placeholder='Your email...' value={loginValues.email} />
                    <input onChange={(e) => Change_loginValues(e)} name='password' type="password" placeholder='Your password...' value={loginValues.password} />
                    <button className={`${loading && 'button_loading'}`} type='submit' >{ loading ? 'Login...' : 'Login'}</button>
                </form>

                <form onSubmit={(e) => Submiting_Register(e)} className={`signup_form ${!formSwitcher && 'hide'}`} >
                    <input onChange={(e) => Change_registerValues(e)} name='username' type="text" placeholder='Your username...' value={registerValues.username} />
                    <input onChange={(e) => Change_registerValues(e)} name='first_name' type="text" placeholder='Your first name...' value={registerValues.first_name} />
                    <input onChange={(e) => Change_registerValues(e)} name='last_name' type="text" placeholder='Your last name...' value={registerValues.last_name} />
                    <input onChange={(e) => Change_registerValues(e)} name='email' type="email" placeholder='Your email...' value={registerValues.email} />
                    <input onChange={(e) => Change_registerValues(e)} name='password' type="password" placeholder='Your password...' value={registerValues.password} />
                    <input onChange={(e) => Change_registerValues(e)} name='re_password' type="password" placeholder='Rewrite password...' value={registerValues.re_password} />
                    <button className={`${loading && 'button_loading'}`} type='submit' >{ loading ? 'Reistering...' : 'Reister'}</button>
                </form>

            </div>

            <div className="form_switcher">
                <p>{formSwitcher ? 'Already a user ?' : 'New user ?'} <span onClick={() => set_formSwitcher(!formSwitcher)} >{formSwitcher ? 'Login' : 'Register'}</span> </p>
            </div>

        </div>

        <footer>
            <ul>
                <li><a href="/">A PROPOS</a></li>
                <li><a href="/">AIDE</a></li>
                <li><a href="/">API</a></li>
                <li><a href="/">LANGUAGE</a></li>
                <li><p>&copy; 2020 INSTAGRAM_Clone</p></li>
            </ul>
        </footer>
        </>
    )
}

export default LogSign
