import React, { useEffect } from 'react';
import './styles/styles.css';

import AppBar from './components/AppBar';
import useStore from './store/store';
import ErrorDialog from './components/ErrorDialog';
import PollMenu from './components/poll/PollsMenu';
import PollTabBar from './components/poll/PollTabBar';

function App() {
  const setCurrentUser = useStore(state => state.setCurrentUser);
  const users = useStore(state => state.users);

  useEffect(() => {
    setCurrentUser(users[0].id);
  }, []);

  return (
    <React.Fragment>
      <ErrorDialog />
      <AppBar />
      <div className="app">
        <PollMenu />
        <PollTabBar />
      </div>
    </React.Fragment>
  );
}

export default App;
