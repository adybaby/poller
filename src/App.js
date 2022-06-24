import React from 'react';
import './styles/styles.css';
//import Button from '@mui/material/Button';
import Poll from './components/Poll';
import AppBar from './components/AppBar';
import { CssBaseline } from '@mui/material';

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar />
      <div className="app">
        <Poll pollId="CP" />
      </div>
    </React.Fragment>
  );
}

export default App;
