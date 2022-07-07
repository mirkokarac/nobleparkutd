import { useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import PlayerDashboard from '../../features/players/dashboard/PlayerDashboard';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {
  const{playerStore} = useStore();

  useEffect(() => 
  {
    playerStore.loadPlayers();
  }, [playerStore]);

  if(playerStore.loadingInitial) return <LoadingComponent content='Loading app' />
  
  return (
    <>
      <NavBar />
      <Container style={{marginTop: "7em"}}>
        <PlayerDashboard />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/players' element={<PlayerDashboard />} />
          <Route path='/players/create' element={<PlayerForm />} />
        </Routes>
      </Container>
    </>
  );
}

export default observer(App);
