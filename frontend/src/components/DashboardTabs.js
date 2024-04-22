import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import DashboardOverviewCards from './DashboardOverviewCards';
import RoleChangeRequest from './DashboardRoleChangeReq';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <section
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box component={'section'} sx={{ pt: 2 }}>
          {children}
        </Box> 
      )}
    </section>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function DashboardTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }} component={'article'}>
      <Box component={'section'} sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Overview" {...a11yProps(0)} />
          <Tab label="Role Change Requests" {...a11yProps(1)} />
          <Tab label="Users" {...a11yProps(2)} />
          <Tab label="Reports" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <DashboardOverviewCards />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <RoleChangeRequest />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Users
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        Reports
      </CustomTabPanel>
    </Box>
  );
}