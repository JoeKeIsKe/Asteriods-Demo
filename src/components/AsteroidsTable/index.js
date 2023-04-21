import React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useState, useEffect, useCallback } from 'react';
import './index.less'
import MinerHistoryDialog from '../MinerHistoryDialog'

import socket from '../../model/socket'

const defaultColumns = [
  {
    title: 'Name',
  },
  {
    title: 'Minerals',
  },
  {
    title: 'Current miner',
  },
  {
    title: 'Position',
  },
]

function AsteroidsTable(props) {
  const [rows, setRows] = useState([])
  const [open, setOpen] = useState(false)
  const [miner, setMiner] = useState({})

  const handleClose = () => {
    setOpen(false)
  }

  const initWebSocket = useCallback(() => {
    socket.on('tick', (data) => {
      const { asteroids = [] } = data;
      const res = Array.from(asteroids)
      setRows(res) 
    })
  }, [])

  useEffect(() => {
    initWebSocket()
  }, [initWebSocket])

  useEffect(() => {
    // getAsteroids({}, (result) => {
    //   const res = result.map(item => ({
    //     ...item,
    //     'status': statusMap[item.status]
    //   }))
    //   setRows(res)
    // })
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
              <TableCell>{row.minerals}</TableCell>
              <TableCell>{row.target?.currentMiner}</TableCell>
              <TableCell>{`${row.position.x},${row.position.y}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <MinerHistoryDialog open={open} miner={miner} onClose={handleClose} />
    </Box>
  );
}

export default AsteroidsTable;