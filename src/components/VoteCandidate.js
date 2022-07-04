import React from 'react';
import Card from '@mui/material/Card';
import VoteControl from './VoteControl';
import { Typography } from '@mui/material';
import PropTypes from 'prop-types';
import useStore from '../store/store';

export default function VoteCandidate({ candidate }) {
  const voteForCandidate = useStore(state => state.voteForCandidate);
  const setErr = useStore(store => store.setErr);
  const getVotes = () =>
    useStore(state => state.getAmountVotedForCandidate)(candidate.id);

  const [amount, setAmount] = React.useState(getVotes());

  const setVotes = event => {
    try {
      voteForCandidate(candidate.id, event.target.value);
      setAmount(event.target.value);
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
      <div className={'candidate-card-internal ' + colorClasses[getVotes()]}>
        <div>
          <Typography variant="h5" component="div">
            {candidate.name}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {candidate.description}
          </Typography>
        </div>
        <div className="candidate-card-internal-controls">
          <VoteControl amount={amount} setVotes={setVotes} />
        </div>
      </div>
    </Card>
  );
}

VoteCandidate.propTypes = {
  candidate: PropTypes.any.isRequired,
};
