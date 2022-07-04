import React, { Fragment, useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Player } from '../models/player';
import NavBar from './NavBar';
import PlayerDashboard from '../../features/players/dashboard/PlayerDashboard';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';

function App() {
  const[players, setPlayers] = useState<Player[]>([]);
  const[selectedPlayer, setSelectedPlayer] = useState<Player | undefined>(undefined);
  const[editMode, setEditMode] = useState(false);
  const[loading, setLoading] = useState(true);
  const[submitting, setSubmitting] = useState(false);

  useEffect(() => {
    agent.Players.list().then(response => {
      setPlayers(response);
      setLoading(false);
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
    setSubmitting(true);
    if(player.id)
    {
      agent.Players.update(player).then(() => {
        setPlayers([...players.filter(x => x.id !== player.id), player]);
        setSelectedPlayer(player);
        setEditMode(false);
        setSubmitting(false);
      });
    }
    else
    {
      player.id = uuid();
      agent.Players.create(player).then(() => {
        setPlayers([...players, player]);
        setSelectedPlayer(player);
        setEditMode(false);
        setSubmitting(false);        
      });
    }
  }

function handleDeletePlayer(id:string){
  setSubmitting(true);
  agent.Players.delete(id).then(() =>{
    setPlayers([...players.filter(x => x.id !== id)]);
    setSubmitting(false);
  });
}

  if(loading) return <LoadingComponent content='Loading app' />
  
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
          submitting={submitting}
        />
      </Container>
    </>
  );
}

export default App;
