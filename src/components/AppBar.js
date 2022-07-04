import * as React from 'react';
import { AppBar as MUIAppBar } from '@mui/material';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import UserMenu from './UserMenu';

export default function AppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <MUIAppBar position="static">
        <div className="app-bar">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              POLLER
            </Typography>

            <UserMenu />
          </Toolbar>
        </div>
      </MUIAppBar>
    </Box>
  );
}
