import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import PlayerDashboard from '../../features/players/dashboard/PlayerDashboard';
import { observer } from 'mobx-react-lite';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from '../../features/home/Home';
import PlayerForm from '../../features/players/form/PlayerForm';
import PlayerDetails from '../../features/players/details/PlayerDetails';
import { Fragment } from 'react';

function App() {
  return (
    <Fragment>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/players/*' element={<Players />} />
      </Routes>
    </ Fragment>
  );
}

function Players() {
  const location = useLocation();

  return (
    <>
      <NavBar />
      <Container style={{marginTop: "7em"}}>
        <Routes>          
          <Route path='/' element={<PlayerDashboard />} />
          <Route path=':id' element={<PlayerDetails />} />
          <Route path='create' element={<PlayerForm key={location.key} /> } />
          <Route path='edit/:id' element={<PlayerForm key={location.key} />} />
        </Routes>
      </Container>
    </>
  );
}

export default observer(App);
