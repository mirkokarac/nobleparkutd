import { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Player } from '../models/player';
import NavBar from './NavBar';
import PlayerDashboard from '../../features/players/dashboard/PlayerDashboard';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {
  const{playerStore} = useStore();

  const[players, setPlayers] = useState<Player[]>([]);
  const[submitting, setSubmitting] = useState(false);

  useEffect(() => 
  {
    playerStore.loadPlayers();
  }, [playerStore]);

function handleDeletePlayer(id:string){
  setSubmitting(true);
  agent.Players.delete(id).then(() =>{
    setPlayers([...players.filter(x => x.id !== id)]);
    setSubmitting(false);
  });
}

  if(playerStore.loadingInitial) return <LoadingComponent content='Loading app' />
  
  return (
    <>
      <NavBar />
      <Container style={{marginTop: "7em"}}>
        <PlayerDashboard 
          players={playerStore.players}
          deletePlayer={handleDeletePlayer}
          submitting={submitting}
        />
      </Container>
    </>
  );
}

export default observer(App);
