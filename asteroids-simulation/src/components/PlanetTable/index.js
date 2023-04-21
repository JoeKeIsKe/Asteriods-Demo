import React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Stack from '@mui/material/Stack';
import { useState, useEffect, useCallback } from 'react';
import { getPlanets } from '../../api';
import './index.less'
import { Typography } from '@mui/material';
import MinerCreateDialog from '../MinerCreateDialog'

const defaultColumns = [
  {
    title: 'Name',
  },
  {
    title: 'Miners',
  },
  {
    title: 'Minerals',
  },
  {
    title: '',
  },
]

const statusMap = {
  0: 'Idle',
  1: 'Traveling',
  2: 'Mining',
  3: 'Transferring minerals to planet'
}

function PlanetTable(props) {
  const [rows, setRows] = useState([])
  const [open, setOpen] = useState(false)
  const [planet, setPlanet] = useState({})

  const getList = () => {
    getPlanets({}, (result) => {
      const res = result.map(item => ({
        ...item,
        'status': statusMap[item.status]
      }))
      setRows(res)
    })
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleCreate = (row) => {
    setOpen(true)
    setPlanet(row)
  }

  const handleCreateSubmit = () => {
    getList()
  }

  useEffect(() => {
    getList()
  }, [])

  return (
    <Box>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            {
              defaultColumns.map(item => (
                <TableCell key={item.title}>{item.title}</TableCell>
              ))
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row._id}
            >
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.miners}</TableCell>
              <TableCell>
                <Typography className={(row.minerals >= 1000 && row.minerals !== 0) ? 'active' : ''} fontSize={11}>{`${row.minerals}/1000`}</Typography>
              </TableCell>
              <TableCell>
                <Stack direction='row' alignItems='center' gap='4px' sx={{
                  color: '#00F0FF',
                  cursor: 'pointer'
                }} onClick={() => handleCreate(row)}><img src='/assets/images/create-btn.png' alt='' style={{ width: '10px', height: '10px'}} />Create a miner</Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <MinerCreateDialog open={open} planet={planet} planets={rows} onSubmit={handleCreateSubmit} onClose={handleClose} />
    </Box>
  );
}

export default PlanetTable;