import React, { useRef } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useState, useEffect, useCallback } from 'react';
import { apiUrl, getMinersList } from '../../api';
import './index.less'
import { Typography } from '@mui/material';
import MinerHistoryDialog from '../MinerHistoryDialog'

import socket from '../../model/socket'

const defaultColumns = [
  {
    title: 'Name',
  },
  {
    title: 'Planet',
  },
  {
    title: 'carryCapacity',
  },
  {
    title: 'travelSpeed',
  },
  {
    title: 'miningSpeed',
  },
  {
    title: 'Position',
  },
  {
    title: 'Status'
  }
]

const statusMap = {
  0: 'Idle',
  1: 'Traveling',
  2: 'Mining',
  3: 'Transferring minerals to planet'
}

function MinerTable(props) {
  const [rows, setRows] = useState([])
  const [open, setOpen] = useState(false)
  const [miner, setMiner] = useState({})

  const handleClick = (row) => {
    setOpen(true)
    setMiner({
      name: row.name,
      minerId: row._id,
    })
  }

  const handleClose = () => {
    setOpen(false)
  }

  const initWebSocket = useCallback(() => {
    socket.on('tick', (data) => {
      const { miners = [] } = data;
      const res = Array.from(miners)
      setRows(res) 
    })
  }, [])

  useEffect(() => {
    initWebSocket()
  }, [initWebSocket])

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
                <TableCell component="th" scope="row">
                  <Typography sx={{ color: '#fff', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => handleClick(row)}>{row.name}</Typography>
                </TableCell>
                <TableCell>{row.planet?.name}</TableCell>
                <TableCell>
                  <Typography className={(row.minerals === row.carryCapacity && row.carryCapacity !== 0) ? 'active' : ''}>{`${row.minerals}/${row.carryCapacity}`}</Typography>
                </TableCell>
                <TableCell>{row.travelSpeed}</TableCell>
                <TableCell>{row.miningSpeed}</TableCell>
                <TableCell>{row.miningSpeed}</TableCell>
                <TableCell>{statusMap[row.status]}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <MinerHistoryDialog open={open} miner={miner} onClose={handleClose} />
    </Box>
  );
}

export default MinerTable;