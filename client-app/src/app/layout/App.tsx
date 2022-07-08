import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import PlayerDashboard from '../../features/players/dashboard/PlayerDashboard';
import { observer } from 'mobx-react-lite';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from '../../features/home/Home';
import PlayerForm from '../../features/players/form/PlayerForm';
import PlayerDetails from '../../features/players/details/PlayerDetails';

function App() {
  const location = useLocation();

  return (
    <>
      <NavBar />
      <Container style={{marginTop: "7em"}}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/players' element={<PlayerDashboard />} />
          <Route path='/players/:id' element={<PlayerDetails />} />
          <Route path='/players/create' element={<PlayerForm key={location.key} /> } />
          <Route path='/players/edit/:id' element={<PlayerForm key={location.key} />} />
        </Routes>
      </Container>
    </>
  );
}

export default observer(App);
