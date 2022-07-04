import * as React from 'react';
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import useStore from '../store/store';

export default function PollMenu() {
  const polls = useStore(state => state.polls);
  const initPoll = useStore(state => state.initPoll);
  const currentPoll = useStore(state => state.currentPoll);

  if (typeof currentPoll == 'undefined') {
    initPoll(polls[0].id);
  }

  return (
    <div className="poll-menu">
      <List>
        <ListItem>
          <ListItemText
            primaryTypographyProps={{ fontWeight: 800 }}
            primary="Choose a poll.."
          />
        </ListItem>
        <Divider />
        {polls.map(poll => (
          <ListItem key={poll.id} disablePadding>
            <ListItemButton
              selected={
                typeof currentPoll == 'undefined'
                  ? false
                  : poll.id == currentPoll.id
              }
              onClick={() => {
                initPoll(poll.id);
              }}
            >
              <ListItemText primary={poll.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
}
