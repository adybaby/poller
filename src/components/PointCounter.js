import React from 'react';
import { Typography, Button, Dialog, Alert, AlertTitle } from '@mui/material';
import useStore from '../store/store';

export default function PointCounter() {
  const pointsSpent = useStore(state => state.pointsSpent);
  const [infoOpen, setInfoOpen] = React.useState(false);

  function MsgB() {
    return (
      <Dialog open={infoOpen}>
        <Alert
          severity="info"
          onClose={() => {
            setInfoOpen(false);
          }}
        >
          <AlertTitle>Quadratic Voting</AlertTitle>
          <p>
            To vote on an item once costs one point. To vote on the same item
            twice costs four points. To vote on the same item three times costs
            nine points, and to vote on the same item four times costs sixteen
            points. I.e. The cost to vote for an item is the number of votes for
            that item squared.
          </p>
          <p>
            For example, with sixteen points you could vote once for sixteen
            different items, you could vote for the same item four times, or any
            other combination - so long as you don&apos;t use up more than
            sixteen votes for the poll in total.
          </p>
        </Alert>
      </Dialog>
    );
  }

  return (
    <div>
      <MsgB />
      <div className="point-counter-card">
        <div
          className={
            'point-counter-card-internal ' +
            (pointsSpent == 16 ? 'all-points-spent' : '')
          }
        >
          <Typography variant="h5" component="div">
            Points remaining: {16 - pointsSpent}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {16 - pointsSpent == 0
              ? 'You have spent all 16 points on this poll.  To vote for more items, reduce the number of votes on others.'
              : 'You have spent ' +
                pointsSpent +
                ' points of a maximum of 16.  You can spend ' +
                (16 - pointsSpent) +
                ' more point' +
                (16 - pointsSpent > 1 ? 's' : '') +
                ' on this poll.'}
          </Typography>
          <div>
            <Button variant="outlined" onClick={() => setInfoOpen(true)}>
              HOW DO POINTS WORK?
            </Button>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
