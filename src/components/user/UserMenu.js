import React from 'react';
import useStore from '../../store/store';
import EditUserDialog from './EditUserDialog';
import {
  IconButton,
  Button,
  Menu,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
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
  const [showEditUserDialog, setShowEditUserDialog] = React.useState(false);

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

  const handleUserEditMenuClick = () => {
    handleClose();
    setShowEditUserDialog(true);
  };

  return typeof currentUser == 'undefined' ? (
    <div>Loading..</div>
  ) : (
    <div>
      <EditUserDialog
        open={showEditUserDialog}
        setOpen={setShowEditUserDialog}
      />
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <AccountCircle />
        <Typography sx={{ margin: '0 0 0 0.3em' }} variant="button">
          {currentUser.name}
        </Typography>
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
                  (typeof currentUser.areaId == 'undefined'
                    ? 'No area selected'
                    : areas.find(areaRef => areaRef.id == currentUser.areaId)
                        .name)
                }
              />
            </ListItem>

            <ListItem>
              <ListItemText
                primary={
                  'Skill: ' +
                  (typeof currentUser.skillId == 'undefined'
                    ? 'No skill selected'
                    : skills.find(
                        skillRef => skillRef.id == currentUser.skillId
                      ).name +
                      ' (Lvl ' +
                      currentUser.skillLevel +
                      ')')
                }
              />
            </ListItem>

            <ListItem>
              <Button
                sx={{ minHeight: 0, minWidth: 0, padding: 0 }}
                variant="text"
                onClick={handleUserEditMenuClick}
              >
                EDIT
              </Button>
            </ListItem>
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
