import React from 'react';
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
  const skills = useStore(state => state.skills);
  const skillLevels = SKILL_LEVELS.map((lvl, index) => ({
    id: index + 1,
    name: lvl,
  }));

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Change {currentUser.name}&apos;s Area and Skill</DialogTitle>
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
            setCurrentUserSkillId(event.target.value);
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
  );
}

EditUserDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};
