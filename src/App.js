import React from 'react';
import './styles/styles.css';
import Poll from './components/Poll';
import AppBar from './components/AppBar';
import { CssBaseline } from '@mui/material';
import useStore from './store/store';
import ErrorDialog from './components/ErrorDialog';

function App() {
  const setCurrentUser = useStore(state => state.setCurrentUser);
  const users = useStore(state => state.users);
  setCurrentUser(users[0].id);

  return (
    <React.Fragment>
      <ErrorDialog />
      <CssBaseline />

      <AppBar />
      <div className="app">
        <Poll pollId="CP" />
      </div>
    </React.Fragment>
  );
}

export default App;
