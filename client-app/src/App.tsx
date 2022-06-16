import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';

function App() {
  const[players, setPlayers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/players').then(response => {
      console.log(response);
      setPlayers(response.data);
    })
  }, [])

  return (
    <div>
      <Header as='h2' icon='users' content='Players' />
        <List>
          {players.map((player: any) => (
            <List.Item key={player.id}>{player.firstName}</List.Item>
          ))}
        </List>
    </div>
  );
}

export default App;
