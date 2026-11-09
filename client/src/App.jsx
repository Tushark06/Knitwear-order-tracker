import { useState } from 'react';
import Login from './Login.jsx';
import { getToken } from './api';

export default function App() {
  const [user, setUser ] = useState(null);
  if(!user) {
    return <Login onLogin = {setUser} />;
  }
  return <h1>Board yahan aayega </h1>
}