import React from 'react';
import { Dialog, TextField, InputLabel, Stack, Box, Button, DialogContent, DialogTitle, Typography, Select, MenuItem } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Link from '@mui/material/Link'
import { useState, useEffect, useCallback } from 'react';
import { createMiner } from '../../api';
import './index.less'

const defaultFormInput = {
  name: '',
  carryCapacity: '',
  travelSpeed: '',
  miningSpeed: '',
  planet: '',
  x: 0,
  y: 0
}

function MinerCreate(props) {
  const { open, planet = {}, planets = [], onSubmit, onClose } = props
  const [formInput, setFormInput] = useState(defaultFormInput)
  const [errors, setErrors] = useState(null)
  const [status, setStatus] = useState('processing')

  const handleClose = () => {
    if (onClose) {
      onClose()
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = {
      ...formInput,
      target: formInput.planet,
      targetType: 'Planet',
      status: 0,
      minerals: 0,
      angle: 0,
    }
    createMiner(params, (res) => {
      if (res?._id) {
        setStatus('success')
        // refetch the list data
        if (onSubmit) {
          onSubmit()
        }
      }
      if (res.errors) {
        setErrors(res.errors)
      }
    })
  }

  const handleInput = (e) => {
    const name = e.target.name
    const newValue = e.target.value
    setFormInput((prevState) => ({
      ...prevState,
      [name]: newValue
    }))
  }

  useEffect(() => {
    if (planet._id) {
      setFormInput((prevState) => ({
        ...prevState,
        planet: planet._id
      }))
    }
  }, [planet._id])

  useEffect(() => {
    if (open) {
      setErrors(null)
      setStatus('processing')
      setFormInput({...defaultFormInput, planet: planet._id})
    }
  }, [open, planet._id])

  return (
    <Dialog open={open} maxWidth='md' onClose={handleClose}
      sx={{
        minWidth: 448,
        '.MuiDialog-paper': {
          backgroundColor: '#1A1B2F',
        },
        '.MuiInputLabel-root': {
          color: '#9499C3',
          my: 1,
          fontSize: 11
        },
        '.MuiInputBase-input': {
          backgroundColor: '#242538',
          height: '36px',
          boxSizing: 'border-box',
          padding: '12px',
          color: '#fff'
        },
        '.MuiSelect-select': {
          height: 36
        },
        '.MuiTypography-root': {
          fontSize: 11,
          maxWidth: '125px'
        }
      }}
    >
      <DialogTitle sx={{ color: '#fff', textAlign: 'center' }}>
        { status === 'processing' && <Typography color='#fff' textAlign='center' fontSize={16} fontWeight={700}>Create a miner</Typography>}
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
        {
          status === 'processing' && (
          <>
            <form onSubmit={handleSubmit}>
              <InputLabel>Name</InputLabel>
              <TextField
                name='name'
                error={!!errors?.name?.message}
                label=''
                value={formInput.name}
                sx={{
                  width: 400
                }}
                onChange={handleInput}
              />
              {
                errors?.name?.message && (
                  <Typography color='#EB5757'>{errors?.name?.message}</Typography>
                )
              }
              <InputLabel>Planet</InputLabel>
              <Select name='planet' value={formInput.planet} label='' onChange={handleInput} sx={{
                width: 400
              }}>
                {
                  planets.map(item => (
                    <MenuItem key={item._id} value={item._id}>{item.name}</MenuItem>
                  ))
                }
              </Select>
              <Typography color='#fff' textAlign='center' fontSize={16} fontWeight={700} sx={{ mt: 4, mb: 2 }}>Assign points</Typography>
              <Stack direction='row' gap={2}>
                <Box>
                  <InputLabel>carryCapacity</InputLabel>
                  <TextField
                    name='carryCapacity'
                    label=''
                    error={!!errors?.carryCapacity?.message}
                    value={formInput.carryCapacity}
                    sx={{
                      width: 125
                    }}
                    onChange={handleInput}
                  />
                {
                  errors?.carryCapacity?.message && (
                    <Typography color='#EB5757'>{errors?.carryCapacity?.message}</Typography>
                  )
                }
                </Box>
                <Box>
                  <InputLabel>travelSpeed</InputLabel>
                  <TextField
                    name='travelSpeed'
                    label=''
                    error={!!errors?.travelSpeed?.message}
                    value={formInput.travelSpeed}
                    sx={{
                      width: 125
                    }}
                    onChange={handleInput}
                  />
                  {
                    errors?.travelSpeed?.message && (
                      <Typography color='#EB5757'>{errors?.travelSpeed?.message}</Typography>
                    )
                  }
                </Box>
                <Box>
                  <InputLabel >miningSpeed</InputLabel>
                  <TextField
                    name='miningSpeed'
                    label=''
                    error={!!errors?.miningSpeed?.message}
                    value={formInput.miningSpeed}
                    sx={{
                      width: 125
                    }}
                    onChange={handleInput}
                  />
                  {
                    errors?.miningSpeed?.message && (
                      <Typography color='#EB5757'>{errors?.miningSpeed?.message}</Typography>
                    )
                  }
                </Box>
              </Stack>
              <Stack sx={{ mt: 5 }} direction='row' justifyContent='center'>
              <Button type='submit' sx={{
                width: 90,
                backgroundColor: '#E1E2EF',
                borderRadius: '8px',
                color: '#1A1B2F'
              }}>Save</Button>
            </Stack>
            </form>

          </>
          )
        }
        {
          status === 'success' && (
            <Typography color='#fff' fontSize={16} fontWeight={700} textAlign='center' sx={{ mt: 4, mb: 4 }}>The Miner was successfully created</Typography>
          )
        }
          
      </DialogContent>
    </Dialog>
  );
}

export default MinerCreate;