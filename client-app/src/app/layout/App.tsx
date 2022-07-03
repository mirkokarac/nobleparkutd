import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Player } from '../models/player';
import NavBar from './NavBar';
import PlayerDashboard from '../../features/players/dashboard/PlayerDashboard';
import {v4 as uuid} from 'uuid';

function App() {
  const[players, setPlayers] = useState<Player[]>([]);
  const[selectedPlayer, setSelectedPlayer] = useState<Player | undefined>(undefined);
  const[editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get<Player[]>('http://localhost:5000/api/players').then(response => {
      setPlayers(response.data);
    })
  }, [])

  function handleSelectPlayer(id: string)
  {
    setSelectedPlayer(players.find(x => x.id === id));
  }

  function handleCancelSelectPlayer()
  {
    setSelectedPlayer(undefined);
  }

  function handleFormOpen(id?: string)
  {
    id ? handleSelectPlayer(id) : handleCancelSelectPlayer();
    setEditMode(true);
  }

  function handleFormClose()
  {
    setEditMode(false);
  }

  function handleCreateOrEditPlayer(player: Player)
  {
    player.id 
      ? setPlayers([...players.filter(x => x.id !== player.id), player])
      : setPlayers([...players, {...player, id:uuid()}]);
      setEditMode(false);
      setSelectedPlayer(player);
  }

function handleDeletePlayer(id:string){
  setPlayers([...players.filter(x => x.id !== id)]);
}

  return (
    <>
      <NavBar openForm={handleFormOpen} />
      <Container style={{marginTop: "7em"}}>
        <PlayerDashboard 
          players={players}
          selectedPlayer={selectedPlayer}
          selectPlayer={handleSelectPlayer}
          cancelSelectPlayer={handleCancelSelectPlayer}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditPlayer}
          deletePlayer={handleDeletePlayer}
        />
      </Container>
    </>
  );
}

export default App;
