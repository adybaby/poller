import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import PropTypes from 'prop-types';
import useStore from '../store/store';

export default function VoteControl({ candidate, amount }) {
  const [votes, setVotes] = React.useState(amount);

  const handleChange = event => {
    setVotes(event.target.value);
    useStore(state => state.voteForCandidate(candidate.id, event.target.value));
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="vote-control-input-label">Vote..</InputLabel>
        <Select
          labelId="vote-control-select-label"
          id="vote-control-select"
          value={votes}
          label="Votes"
          onChange={handleChange}
        >
          <MenuItem value={0}>0</MenuItem>
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

VoteControl.propTypes = {
  candidate: PropTypes.any.isRequired,
  amount: PropTypes.number.isRequired,
};
