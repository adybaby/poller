import React from 'react';
import useStore from '../store/store';
import Typography from '@mui/material/Typography';
import VoteCandidate from './VoteCandidate';
import PointCounter from './PointCounter';

export default function Poll() {
  const currentPoll = useStore(state => state.currentPoll);
  var voteIndex = 0;

  return (
    <div>
      <div className="poll-container">
        <div className="poll-title">
          <Typography variant="h3" key={currentPoll.id}>
            {currentPoll.name}
          </Typography>
        </div>
        <div className="poll-description">
          <Typography key={currentPoll.id}>
            {currentPoll.description}
          </Typography>
        </div>
        {currentPoll.groups.map(group => (
          <div className="poll-group-header" key={group.id}>
            <Typography variant="h4">{group.name}</Typography>
            {group.candidates.map(candidate => (
              <VoteCandidate
                key={candidate.id}
                candidate={candidate}
                voteIndex={voteIndex++}
              />
            ))}
          </div>
        ))}
      </div>
      <PointCounter />
    </div>
  );
}
