import React from 'react';
import { Dialog, Alert, AlertTitle } from '@mui/material';
import useStore from '../store/store';

export default function ErrorDialog() {
  const setErr = useStore(state => state.setErr);
  const err = useStore(state => state.err);
  return (
    <Dialog open={err != ''}>
      <Alert
        severity="error"
        onClose={() => {
          setErr('');
        }}
      >
        <AlertTitle>Not enough points for that vote</AlertTitle>
        {err}
      </Alert>
    </Dialog>
  );
}
