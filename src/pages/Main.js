import React from 'react';
import { Stack, Box } from '@mui/material'
import { useState, useEffect, useCallback } from 'react';
import AsteroidHeader from '../components/AsteroidHeader'
import Tabs from '../components/Tabs'
import MinerTable from '../components/MinerTable'
import AsteroidsTable from '../components/AsteroidsTable';
import PlanetTable from '../components/PlanetTable';


function Main() {
  const [tabValue, setTabValue] = useState(1)

  const onTabChange = (tab) => {
    setTabValue(tab)
  }

  return (
    <Box className="main">
      <AsteroidHeader />
      <Stack direction='row' gap={4} sx={{ height: '100%', minHeight: '100vh' }}>
        {/* left-side */}
        <Stack sx={{ minWidth: 550, flex: 1 }}>
          <Tabs value={tabValue} onChange={onTabChange} />
          {
            tabValue === 1 && <MinerTable />
          }
          {
            tabValue === 2 && <AsteroidsTable />
          }
          {
            tabValue === 3 && <PlanetTable />
          }
        </Stack>
        {/* right-side */}
        <Box sx={{ flex: 1, backgroundImage: `url('assets/images/main-image.png')`, backgroundRepeat: 'no-repeat' }} />
      </Stack>
    </Box>
  );
}

export default Main;