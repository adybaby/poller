import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import PropTypes from 'prop-types';

export default function VoteControl({ getVotes, setVotes }) {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="vote-control-input-label">Vote..</InputLabel>
        <Select
          labelId="vote-control-select-label"
          id="vote-control-select"
          value={getVotes()}
          label="Votes"
          onChange={setVotes}
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
  getVotes: PropTypes.any.isRequired,
  setVotes: PropTypes.any.isRequired,
};
