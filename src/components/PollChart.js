import React from 'react';
import useStore from '../store/store';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import FileSaver from 'file-saver';
import { MenuItem, FormControl, Select, Button } from '@mui/material';

const SKILL_LEVELS = ['Lvl 1', 'Lvl 2', 'Lvl 3', 'Lvl 4'];

const FILTER_TYPES = [
  'All Votes',
  'Broken down by skill',
  'Broken down by Area',
];

const KELLY = [
  '#875692',
  '#F38400',
  '#BE0032',
  '#C2B280',
  '#848482',
  '#008856',
  '#E68FAC',
  '#0067A5',
  '#F99379',
  '#604E97',
  '#F6A600',
  '#B3446C',
  '#DCD300',
  '#882D17',
  '#8DB600',
  '#654522',
  '#E25822',
  '#2B3D26',
];

export default function PollChart() {
  const currentPoll = useStore(state => state.currentPoll);
  const votes = useStore(state => state.votes);
  const users = useStore(state => state.users);
  const areas = useStore(state => state.areas);
  const currentPollVotes = votes.filter(vote => vote.pollId == currentPoll.id);

  const [filterType, setFilterType] = React.useState(FILTER_TYPES[0]);

  function calcTotalVotesForCandidate(candidateId, filter) {
    if (typeof filter == 'undefined') {
      filter = vote => vote;
    }
    return currentPollVotes
      .filter(vote => vote.candidateId == candidateId)
      .filter(filter)
      .reduce((total, vote) => total + vote.amount, 0);
  }

  function calcVotesForCandidateBySkillLevels(candidateId) {
    const result = {};
    SKILL_LEVELS.forEach((skillLevel, index) => {
      result[skillLevel] = calcTotalVotesForCandidate(
        candidateId,
        vote =>
          users.find(user => user.id == vote.userId).skillLevel == index + 1
      );
    });
    return result;
  }

  function calcVotesForCandidateByArea(candidateId) {
    const result = {};
    areas.forEach(area => {
      result[area.name] = calcTotalVotesForCandidate(
        candidateId,
        vote => users.find(user => user.id == vote.userId).areaId == area.id
      );
    });
    return result;
  }

  const data = currentPoll.groups
    .reduce(
      (candidates, group) => [
        ...candidates,
        ...group.candidates.map(candidate => ({
          name: candidate.name,
          votes: calcTotalVotesForCandidate(candidate.id),
          ...calcVotesForCandidateBySkillLevels(candidate.id),
          ...calcVotesForCandidateByArea(candidate.id),
        })),
      ],
      []
    )
    .sort((a, b) => {
      return b.votes - a.votes;
    });

  function setFilter(event) {
    setFilterType(event.target.value);
  }

  function exportToCsv() {
    const chartDataStr = [
      Object.keys(data[0]).join(','),
      ...data.map(dataItem => Object.values(dataItem).join(',')),
    ].join('\n');

    const blob = new Blob([chartDataStr], { type: 'text/plain;charset=utf-8' });
    FileSaver.saveAs(blob, 'poller export - ' + currentPoll.name + '.csv');
  }

  function getBarsForCurrentFilter() {
    switch (filterType) {
      case FILTER_TYPES[0]:
        return <Bar dataKey="votes" stackId="a" fill={KELLY[2]} />;
      case FILTER_TYPES[1]:
        return SKILL_LEVELS.map((level, index) => (
          <Bar key={level} dataKey={level} stackId="a" fill={KELLY[index]} />
        ));
      case FILTER_TYPES[2]:
        return areas.map((area, index) => (
          <Bar
            key={area.id}
            dataKey={area.name}
            stackId="a"
            fill={KELLY[index]}
          />
        ));
    }
  }

  return (
    <div className="chart-container">
      <FormControl fullWidth margin="dense" variant="filled" hiddenLabel>
        <Select
          labelId="filter-type-select-label"
          id="filter-type-select"
          value={filterType}
          label="Filter"
          onChange={setFilter}
        >
          {FILTER_TYPES.map(value => (
            <MenuItem key={value} value={value}>
              {value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button variant="text" onClick={() => exportToCsv()}>
        EXPORT ALL POLL DATA TO CSV
      </Button>

      <ResponsiveContainer width="99%" height={75 * data.length}>
        <BarChart
          layout="vertical"
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 100,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" tickCount={data.length} />
          <Tooltip />
          <Legend />

          {getBarsForCurrentFilter()}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
