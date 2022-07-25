import React, { useEffect, useState } from 'react';
import useStore from '../../store/store';
import Typography from '@mui/material/Typography';
import VoteCandidate from './VoteCandidate';
import PointCounter from './PointCounter';

export default function Poll() {
  const currentUser = useStore(state => state.currentUser);
  const currentPoll = useStore(state => state.currentPoll);
  const skills = useStore(state => state.skills);
  const [allowedToVote, setAllowedToVote] = useState(true);

  var voteIndex = 0;

  useEffect(() => {
    if (typeof currentPoll != 'undefined') {
      setAllowedToVote(
        currentPoll.requiredSkills.length == 0 ||
          currentPoll.requiredSkills.includes(currentUser.skillId)
      );
    }
  }, [currentUser, currentPoll]);

  return typeof currentPoll == 'undefined' ? (
    <div>Loading..</div>
  ) : (
    <div>
      {currentPoll.requiredSkills.length == 0 ? null : (
        <div className="vote-restrictions-banner">
          <Typography variant="h4">
            {allowedToVote
              ? 'This vote is restricted'
              : 'You cannot vote in this poll'}
          </Typography>
          <Typography sx={{ marginTop: 1 }} variant="h6">
            {currentPoll.requiredSkills.length == 1
              ? 'You need to have the ' +
                skills.find(skill => skill.id == currentPoll.requiredSkills[0])
                  .name +
                ' skill to vote in this poll.'
              : 'You need to have one of the following skills to vote in this poll: ' +
                currentPoll.requiredSkills
                  .map(
                    skillId => skills.find(skill => skill.id == skillId).name
                  )
                  .join(', ') +
                '. '}
          </Typography>
        </div>
      )}
      <div className="poll-container">
        <div className="poll-title">
          <Typography variant="h3" key={currentPoll.id}>
            {currentPoll.name}
          </Typography>
        </div>
        <div className="poll-description">
          <Typography key={currentPoll.id}>
            {currentPoll.description}
          </Typography>
        </div>
        {currentPoll.groups.map(group => (
          <div className="poll-group-header" key={group.id}>
            <Typography variant="h4">{group.name}</Typography>
            {group.candidates.map(candidate => (
              <VoteCandidate
                key={candidate.id}
                candidate={candidate}
                voteIndex={voteIndex++}
                disabled={!allowedToVote}
              />
            ))}
          </div>
        ))}
      </div>
      {allowedToVote ? <PointCounter /> : null}
    </div>
  );
}
