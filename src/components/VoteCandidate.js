import React from 'react';
import Card from '@mui/material/Card';
import VoteControl from './VoteControl';
import { Typography } from '@mui/material';
import PropTypes from 'prop-types';
import useStore from '../store/store';

export default function VoteCandidate({ candidate, voteIndex }) {
  const voteForCandidate = useStore(state => state.voteForCandidate);
  const setErr = useStore(store => store.setErr);
  const currentVotes = useStore(state => state.currentVotes);

  const setVotes = event => {
    try {
      voteForCandidate(voteIndex, candidate.id, event.target.value);
    } catch (err) {
      setErr(err);
    }
  };

  const colorClasses = [
    '',
    'one-vote',
    'two-votes',
    'three-votes',
    'four-votes',
  ];

  return (
    <Card className="candidate-card">
      <div
        className={
          'candidate-card-internal ' + colorClasses[currentVotes[voteIndex]]
        }
      >
        <div>
          <Typography variant="h5" component="div">
            {candidate.name}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {candidate.description}
          </Typography>
        </div>
        <div className="candidate-card-internal-controls">
          <VoteControl amount={currentVotes[voteIndex]} setVotes={setVotes} />
        </div>
      </div>
    </Card>
  );
}

VoteCandidate.propTypes = {
  candidate: PropTypes.any.isRequired,
  voteIndex: PropTypes.number.isRequired,
};
