import { useState } from 'react';
import Login from './Login.jsx';
import { getToken } from './api';
import Board from './Board.jsx';

export default function App() {
  const [user, setUser ] = useState(null);
  if(!user) {
    return <Login onLogin = {setUser} />;
  }
  return <Board />;
}