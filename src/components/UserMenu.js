import React from 'react';
import useStore from '../store/store';
import {
  IconButton,
  Menu,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';

export default function UserMenu() {
  const users = useStore(state => state.users);
  const setCurrentUser = useStore(state => state.setCurrentUser);
  const skills = useStore(state => state.skills);
  const areas = useStore(state => state.areas);
  const currentUser = useStore(state => state.currentUser);
  const currentPoll = useStore(state => state.currentPoll);
  const initPoll = useStore(state => state.initPoll);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const selectUser = userId => {
    setCurrentUser(userId);
    initPoll(currentPoll.id);
    setAnchorEl(null);
  };

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <List>
          <ListItem>
            <ListItemText
              primaryTypographyProps={{ fontWeight: 800 }}
              primary="Current User"
            />
          </ListItem>
          <Divider />
          <div className="user-menu-current-user-details">
            <ListItem>
              <ListItemText primary={'Name: ' + currentUser.name} />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={
                  'Area: ' +
                  areas.find(areaRef => areaRef.id == currentUser.areaId).name
                }
              />
            </ListItem>
            {currentUser.skillsLevels.map(skill => (
              <ListItem key={skill.skillId}>
                <ListItemText
                  primary={
                    'Skill: ' +
                    skills.find(skillRef => skillRef.id == skill.skillId).name +
                    ' at Lvl ' +
                    skill.level
                  }
                />
              </ListItem>
            ))}
          </div>
          <Divider />
          <ListItem>
            <ListItemText
              primaryTypographyProps={{ fontWeight: 800 }}
              primary="Switch User.."
            />
          </ListItem>
          <Divider />
        </List>
        {users.map(user => (
          <MenuItem
            key={user.id}
            onClick={() => selectUser(user.id)}
            selected={currentUser.id == user.id}
          >
            {user.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
