import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Divider,
} from '@mui/material';
import useStore from '../../store/store';
import PropTypes from 'prop-types';
import { SKILL_LEVELS } from '../../constants';
import KeyValueDropDown from './../KeyValueDropDown';

export default function EditUserDialog({ open, setOpen }) {
  const currentUser = useStore(state => state.currentUser);
  const setCurrentUserSkillId = useStore(state => state.setCurrentUserSkillId);
  const setCurrentUserSkillLevel = useStore(
    state => state.setCurrentUserSkillLevel
  );
  const setCurrentUserAreaId = useStore(state => state.setCurrentUserAreaId);
  const areas = useStore(state => state.areas);
  const votes = useStore(state => state.votes);
  const polls = useStore(state => state.polls);
  const skills = useStore(state => state.skills);
  const skillLevels = SKILL_LEVELS.map((lvl, index) => ({
    id: index + 1,
    name: lvl,
  }));

  const deleteUserCurrentUserVotesForPolls = useStore(
    state => state.deleteUserCurrentUserVotesForPolls
  );

  const [conflictingPolls, setConflictingPolls] = useState([]);
  const [proposedSkill, setProposedSkill] = useState(null);

  const findConflictingPolls = newSkillId => {
    const _conflictingPolls = [];
    polls.forEach(poll => {
      if (
        poll.requiredSkills.length > 0 &&
        !poll.requiredSkills.includes(newSkillId) &&
        votes.findIndex(vote => {
          return vote.pollId == poll.id && vote.userId == currentUser.id;
        }) != -1
      ) {
        _conflictingPolls.push({ id: poll.id, name: poll.name });
      }
    });
    return _conflictingPolls;
  };

  const clearVotesAndChangeSkill = () => {
    deleteUserCurrentUserVotesForPolls(conflictingPolls);
    setCurrentUserSkillId(proposedSkill);
    setConflictingPolls([]);
    setProposedSkill(null);
  };

  return (
    <div>
      <Dialog
        open={conflictingPolls.length > 0}
        onClose={() => setConflictingPolls([])}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Clear conflicting poll votes?'}
        </DialogTitle>
        <DialogContent>
          <p>
            Some of your previous votes are for polls with restricted skills
            that you will no longer be eligible to participate in. Changing your
            skill will clear your votes for the following polls:
          </p>
          <ul>
            <b>
              {conflictingPolls.map(cp => (
                <li key={cp}>{cp.name}</li>
              ))}
            </b>
            .
          </ul>
          <p>
            Please confirm that you want to change your skill and clear these
            votes, or cancel.
          </p>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setProposedSkill(null);
              setConflictingPolls([]);
            }}
          >
            CANCEL
          </Button>
          <Button onClick={clearVotesAndChangeSkill} autoFocus>
            CONFIRM SKILL CHANGE AND CLEAR RESTRICTED VOTES
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>
          Change {currentUser.name}&apos;s Area and Skill
        </DialogTitle>
        <Divider />
        <DialogContent>
          {' '}
          <KeyValueDropDown
            title={'Area'}
            value={currentUser.areaId}
            onChange={event => {
              setCurrentUserAreaId(event.target.value);
            }}
            choices={areas}
          />
          <KeyValueDropDown
            title={'Skill'}
            value={currentUser.skillId}
            onChange={event => {
              setProposedSkill(event.target.value);
              const _conflictingPolls = findConflictingPolls(
                event.target.value
              );

              if (_conflictingPolls.length == 0) {
                setCurrentUserSkillId(event.target.value);
                setProposedSkill(null);
              } else {
                setConflictingPolls(_conflictingPolls);
              }
            }}
            choices={skills}
          />
          <KeyValueDropDown
            title={'Skill Level'}
            value={currentUser.skillLevel}
            onChange={event => {
              setCurrentUserSkillLevel(Number(event.target.value));
            }}
            choices={skillLevels}
          />
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button onClick={() => setOpen(false)}>DONE</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

EditUserDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};
