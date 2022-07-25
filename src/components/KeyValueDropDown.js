import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import PropTypes from 'prop-types';

export default function KeyValueDropDown({
  title,
  value,
  onChange,
  choices,
  disabled,
}) {
  return (
    <Box sx={{ marginTop: 2, minWidth: 120 }}>
      <FormControl fullWidth disabled={disabled}>
        <InputLabel id={title + '-input-label'}>{title}</InputLabel>
        <Select
          labelId={title + '-select-label'}
          id={title + '-select'}
          value={value}
          label={title}
          onChange={onChange}
        >
          {choices.map(choice => (
            <MenuItem key={choice.id} value={choice.id}>
              {choice.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

KeyValueDropDown.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
  choices: PropTypes.array.isRequired,
  disabled: PropTypes.bool,
};
