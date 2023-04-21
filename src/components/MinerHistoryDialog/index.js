import React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useState, useEffect, useCallback } from 'react';
import { getMinerHistory } from '../../api';
import './index.less'
import { formatTime } from '../../utils'; 

const defaultColumns = [
  {
    title: 'Date',
  },
  {
    title: 'Year',
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
    title: 'Position'
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
  const { open, miner = {}, onClose } = props

  const [rows, setRows] = useState([])

  const handleClose = () => {
    if (onClose) {
      onClose()
    }
  }


  useEffect(() => {
    if (miner.minerId) {
      getMinerHistory({ minerId: miner.minerId }, (result) => {
        const res = result.map(item => ({
          ...item,
          'status': statusMap[item.status] || '- -'
        }))
        setRows(res)
      })
    }
  }, [miner.minerId])

  return (
    <Dialog open={open} maxWidth='md' onClose={handleClose}
      sx={{
        '.MuiDialog-paper': {
          backgroundColor: '#1A1B2F',
        },
        '.MuiTableCell-root': {
          color: '#9499C3',
          borderBottom: '0.5px solid #9499C3'
        }
      }}
    >
      <DialogTitle sx={{ color: '#fff', textAlign: 'center' }}>
        {`History of ${miner.name}`}
        {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
      </DialogTitle>
      <DialogContent>
      <Table sx={{  }} aria-label="simple table">
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
            {rows.length ? rows.slice(0, 10).map((row) => (
              <TableRow
                key={row._id}
              >
                <TableCell component="th" scope="row">
                  {formatTime(row.updatedAt)}
                </TableCell>
                <TableCell>{row.year}</TableCell>
                <TableCell>{row.planet}</TableCell>
                <TableCell>
                  <Typography className={(row.capacity?.current === row.capacity?.max && row.capacity.max !== 0) ? 'active' : ''}>{`${row.capacity?.current}/${row.capacity?.max}`}</Typography>
                </TableCell>
                <TableCell>{row.speed?.travel}</TableCell>
                <TableCell>{row.speed?.mining}</TableCell>
                <TableCell>{`${row.position.x},${row.position.y}`}</TableCell>
                <TableCell>{row.status}</TableCell>
              </TableRow>
            )) : null}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
}

export default MinerTable;