import React from 'react';
import Card from '@mui/material/Card';
import VoteControl from './VoteControl';
import { Typography } from '@mui/material';
import PropTypes from 'prop-types';
import useStore from '../store/store';

export default function VoteCandidate({ candidate }) {
  const [amount, setAmount] = React.useState(
    useStore(state => state.getAmountVotedForCandidate)(candidate.id)
  );

  const voteForCandidate = useStore(state => state.voteForCandidate);

  const getVotes = () => amount;

  const setVotes = event => {
    setAmount(event.target.value);
    voteForCandidate(candidate.id, event.target.value);
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
      <div className={'candidate-card-internal ' + colorClasses[amount]}>
        <div>
          <Typography variant="h5" component="div">
            {candidate.name}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {candidate.description}
          </Typography>
        </div>
        <div className="candidate-card-internal-controls">
          <VoteControl getVotes={getVotes} setVotes={setVotes} />
        </div>
      </div>
    </Card>
  );
}

VoteCandidate.propTypes = {
  candidate: PropTypes.any.isRequired,
};
