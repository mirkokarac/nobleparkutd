import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';
import { Player } from '../models/player';

function App() {
  const[players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    axios.get<Player[]>('http://localhost:5000/api/players').then(response => {
      setPlayers(response.data);
    })
  }, [])

  return (
    <div>
      <Header as='h2' icon='users' content='Players' />
        <List>
          {players.map(player => (
            <List.Item key={player.id}>{player.firstName}</List.Item>
          ))}
        </List>
    </div>
  );
}

export default App;
