import { useState } from 'react';
import { callApi, saveToken } from './api';

export default function Login ({ onLogin }) {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ error, setError ] = useState('');

    async function handleLogin(e) {
        e.preventDefault();
        setError('');
        try {
            const data = await callApi('/auth/login', 'POST', { email, password });
            saveToken(data.token);
            onLogin(data.user);
        } catch (err) { 
            setError(err.message);
        }
    }

    return ( 
        <div>
            <h1>Knitwear Order Tracker</h1>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
            <div>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <div>
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type ="submit">login </button>
            </form>
            { error && <p>{error}</p>}
        </div>
    );
}