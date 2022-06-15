import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {
  const[players, setPlayers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/players').then(response => {
      console.log(response);
      setPlayers(response.data);
    })
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <ul>
          {players.map((player: any) => (
            <li key={player.id}>{player.firstName}</li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
