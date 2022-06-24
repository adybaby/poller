import React from 'react';
import Card from '@mui/material/Card';
import VoteControl from './VoteControl';
import { Typography } from '@mui/material';
import PropTypes from 'prop-types';
import useStore from '../store/store';

export default function VoteCandidate({ candidate }) {
  const amount = useStore(state => state.getAmountVotedForCandidate)(
    candidate.id
  );

  return (
    <Card className="candidate-card">
      <div
        className={
          amount != 0
            ? 'candidate-card-internal-has-votes'
            : 'candidate-card-internal-no-votes'
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
          <VoteControl candidate={candidate} amount={amount} />
        </div>
      </div>
    </Card>
  );
}

VoteCandidate.propTypes = {
  candidate: PropTypes.any.isRequired,
};
