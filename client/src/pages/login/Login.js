import React, { useState } from 'react';
import './Login.scss';
import { Link } from 'react-router-dom';
import {axiosClient} from '../../utils/axiosClient';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const result = await axiosClient.post('/auth/login', {
                email,
                password
            });
            console.log(result);
        } catch (error) {
            console.log(error);
        }
 
    }

    return <div className="Login">
        <div className="login-box">
            <h2 className="heading">Login</h2>
            <form onSubmit={handleSubmit}></form>
            <form >
                <label htmlFor='email'>Email</label>
                <input type='email' className='email' id='email' onChange={(e) => setEmail(e.target.value)} />

                <label htmlFor='password'>Password</label>
                <input type='password' className='password' id='password' onChange={(e) => setPassword(e.target.value)} />

                <input type='submit' className='submit'></input>
            </form>
            <p className='subheading'>Do not have an account? <Link to='/signup'>Sign Up</Link></p>
        </div>
    </div>;
}

export default Login;