import React, { useState, useEffect } from 'react';
import useStore from '../../../store/store';
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
import { MenuItem, FormControl, Select, Button } from '@mui/material';
import { KELLY_COLORS } from '../../../constants';
import {
  calcChartData,
  getRequiredSkills,
  createFilterTypes,
} from './chartData';
import { exportToCsv } from './fileHandling';

export default function PollChart() {
  const currentPoll = useStore(state => state.currentPoll);
  const votes = useStore(state => state.votes);
  const users = useStore(state => state.users);
  const areas = useStore(state => state.areas);
  const skills = useStore(state => state.skills);

  const [filterType, setFilterType] = useState();
  const [chartFilterTypes, setChartFilterTypes] = useState();
  const [data, setData] = useState();

  useEffect(() => {
    const requiredSkills = getRequiredSkills(currentPoll, votes, users, skills);
    const filterTypes = createFilterTypes(currentPoll, areas, requiredSkills);
    setFilterType(filterTypes[0]);
    setChartFilterTypes(filterTypes);
    setData(calcChartData(currentPoll, votes, areas, users, requiredSkills));
  }, [currentPoll, areas, skills, users, votes]);

  function setFilter(event) {
    setFilterType(
      chartFilterTypes.find(
        filterType => filterType.label == event.target.value
      )
    );
  }

  return typeof data == 'undefined' ? (
    <p>Loading..</p>
  ) : (
    <div className="chart-container">
      <FormControl fullWidth margin="dense" variant="filled" hiddenLabel>
        <Select
          labelId="filter-type-select-label"
          id="filter-type-select"
          value={filterType.label}
          label="Filter"
          onChange={setFilter}
        >
          {chartFilterTypes.map(value => (
            <MenuItem key={value.label} value={value.label}>
              {value.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        variant="text"
        onClick={() => exportToCsv(data, currentPoll.name)}
      >
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

          {filterType.dataKeys.map((dataKey, index) => (
            <Bar
              name={dataKey.name}
              key={dataKey.key}
              dataKey={dataKey.key}
              stackId="a"
              fill={KELLY_COLORS[index]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
