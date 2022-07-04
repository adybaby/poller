import React from 'react';
import useStore from '../store/store';

export default function StateDisplay() {
  const state = useStore();

  console.log(state);

  return (
    <div>
      <p>{state.votes.length}</p>
    </div>
  );
}
