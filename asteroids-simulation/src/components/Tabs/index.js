import React from 'react';
import { Stack, Box, Typography } from '@mui/material'
import { useState, useEffect, useCallback } from 'react';
import './index.less'

const tabsMap = [
  {
    name: 'Miners',
    id: 1,
    imgUrl: '/assets/images/tab-miner.png',
    imgUrlActive: '/assets/images/tab-miner-active.png'
  },
  {
    name: 'Asteroids',
    id: 2,
    imgUrl: '/assets/images/tab-asteroids.png',
    imgUrlActive: '/assets/images/tab-asteroids-active.png'
  },
  {
    name: 'Planets',
    id: 3,
    imgUrl: '/assets/images/tab-planets.png',
    imgUrlActive: '/assets/images/tab-planets-active.png'
  }
]


function Tabs(props) {
  const { defaultTab, value, onChange } = props

  const [tabValue, setTabValue] = useState(defaultTab || 1)

  const onTabChange = (tab) => {
    setTabValue(tab)
    if (onChange) {
      onChange(tab)
    }
  }

  useEffect(() => {
    setTabValue(value)
  }, [value])

  return (
    <Stack className="A-tabs" flexDirection='row' gap={4}>
      {
        tabsMap.map((item) => (
          <Stack key={item.id} className={`${tabValue === item.id && 'selected'} tab-item`} alignItems='center' justifyContent='center' paddingY='10px' rowGap={1} onClick={() => onTabChange(item.id)}>
            <img src={tabValue === item.id ? item.imgUrlActive : item.imgUrl} alt='miner' />
            <Typography fontSize='12px'>{item.name}</Typography>
          </Stack>
        ))
      }
    </Stack>
  );
}

export default Tabs;