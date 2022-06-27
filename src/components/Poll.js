import React from 'react';
import useStore from '../store/store';
import Typography from '@mui/material/Typography';
import VoteCandidate from './VoteCandidate';
import PropTypes from 'prop-types';
import PointsCounter from './PointsCounter';

export default function Poll({ pollId }) {
  const initPoll = useStore(state => state.initPoll);
  initPoll(pollId);
  const poll = useStore(state => state.currentPoll);

  return (
    <div>
      {' '}
      <PointsCounter />
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
    </div>
  );
}

Poll.propTypes = {
  pollId: PropTypes.string.isRequired,
};
