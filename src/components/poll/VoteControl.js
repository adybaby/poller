import * as React from 'react';
import PropTypes from 'prop-types';
import KeyValueDropDown from '../KeyValueDropDown';
import { VOTES } from '../../constants';

export default function VoteControl({ amount, setVotes, disabled }) {
  return (
    <KeyValueDropDown
      title={'Vote Control'}
      value={amount}
      onChange={setVotes}
      choices={VOTES}
      disabled={disabled}
    />
  );
}

VoteControl.propTypes = {
  amount: PropTypes.number.isRequired,
  setVotes: PropTypes.any.isRequired,
  disabled: PropTypes.bool.isRequired,
};
