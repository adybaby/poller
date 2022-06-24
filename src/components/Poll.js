import React from 'react';
import useStore from '../store/store';
import Typography from '@mui/material/Typography';
import VoteCandidate from './VoteCandidate';
import PropTypes from 'prop-types';

export default function Poll({ pollId }) {
  const poll = useStore(state => state.polls).find(poll => poll.id == pollId);
  return (
    <div className="poll-container">
      <div className="poll-title">
        <Typography variant="h3" key={poll.id}>
          {poll.name}
        </Typography>
      </div>
      <div className="poll-description">
        <Typography key={poll.id}>{poll.description}</Typography>
      </div>
      {poll.groups.map(group => (
        <div className="poll-group-header" key={group.id}>
          <Typography variant="h4">{group.name}</Typography>
          {group.candidates.map(candidate => (
            <VoteCandidate key={candidate.id} candidate={candidate} />
          ))}
        </div>
      ))}
    </div>
  );
}

Poll.propTypes = {
  pollId: PropTypes.string.isRequired,
};
