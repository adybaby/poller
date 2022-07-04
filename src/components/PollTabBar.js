import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import Poll from './Poll';
import PollCharts from './PollCharts';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function PollTabBar() {
  const [tabIndex, setTabIndex] = React.useState(0);

  const handleChange = (event, selectedTabIndex) => {
    setTabIndex(selectedTabIndex);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabIndex} onChange={handleChange} aria-label="Poll tabs">
          <Tab label="POLL" />
          <Tab label="CHARTS" />
        </Tabs>
      </Box>
      {tabIndex == 0 ? <Poll /> : <PollCharts />}
    </Box>
  );
}

TabPanel.propTypes = {
  children: PropTypes.any,
  value: PropTypes.number,
  index: PropTypes.number,
  other: PropTypes.any,
};
