import React, { useState } from 'react'
import {
  Box,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  IconButton,
  Stack,
  Divider
} from '@mui/material'
import {
  Undo as UndoIcon,
  Redo as RedoIcon,
  RestartAlt as ResetIcon,
  Download as DownloadIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material'

const PrintConfiguration = ({ onBack, athletes }) => {
  const [pageSize, setPageSize] = useState('a4')
  const [orientation, setOrientation] = useState('portrait')
  const [history, setHistory] = useState([{ pageSize: 'a4', orientation: 'portrait' }])
  const [currentStep, setCurrentStep] = useState(0)

  const handlePageSizeChange = (event) => {
    const newPageSize = event.target.value
    setPageSize(newPageSize)
    addToHistory({ pageSize: newPageSize, orientation })
  }

  const handleOrientationChange = (event) => {
    const newOrientation = event.target.value
    setOrientation(newOrientation)
    addToHistory({ pageSize, orientation: newOrientation })
  }

  const addToHistory = (state) => {
    const newHistory = history.slice(0, currentStep + 1)
    newHistory.push(state)
    setHistory(newHistory)
    setCurrentStep(newHistory.length - 1)
  }

  const handleUndo = () => {
    if (currentStep > 0) {
      const prevState = history[currentStep - 1]
      setPageSize(prevState.pageSize)
      setOrientation(prevState.orientation)
      setCurrentStep(currentStep - 1)
    }
  }

  const handleRedo = () => {
    if (currentStep < history.length - 1) {
      const nextState = history[currentStep + 1]
      setPageSize(nextState.pageSize)
      setOrientation(nextState.orientation)
      setCurrentStep(currentStep + 1)
    }
  }

  const handleReset = () => {
    setPageSize('a4')
    setOrientation('portrait')
    setHistory([{ pageSize: 'a4', orientation: 'portrait' }])
    setCurrentStep(0)
  }

  const handleDownload = () => {
    // TODO: Implement PDF download functionality
    console.log('Downloading PDF with:', { pageSize, orientation })
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton onClick={onBack} sx={{ mr: 2 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5">Print Configuration</Typography>
      </Box>

      <Stack spacing={3}>
        {/* Controls */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormControl fullWidth>
            <InputLabel>Page Size</InputLabel>
            <Select
              value={pageSize}
              label="Page Size"
              onChange={handlePageSizeChange}
            >
              <MenuItem value="a4">A4</MenuItem>
              <MenuItem value="letter">Letter</MenuItem>
              <MenuItem value="legal">Legal</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Orientation</InputLabel>
            <Select
              value={orientation}
              label="Orientation"
              onChange={handleOrientationChange}
            >
              <MenuItem value="portrait">Portrait</MenuItem>
              <MenuItem value="landscape">Landscape</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <IconButton 
            onClick={handleUndo}
            disabled={currentStep === 0}
          >
            <UndoIcon />
          </IconButton>
          <IconButton 
            onClick={handleRedo}
            disabled={currentStep === history.length - 1}
          >
            <RedoIcon />
          </IconButton>
          <IconButton onClick={handleReset}>
            <ResetIcon />
          </IconButton>
          <Box sx={{ flex: 1 }} />
          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
            onClick={handleDownload}
          >
            Download PDF
          </Button>
        </Box>

        <Divider />

        {/* Preview */}
        <Box>
          <Typography variant="h6" gutterBottom>Preview</Typography>
          <Paper 
            elevation={0} 
            sx={{ 
              border: '1px solid #e0e0e0',
              p: 2,
              height: 600,
              width: '100%',
              bgcolor: '#ffffff',
              overflow: 'auto',
              transform: orientation === 'landscape' ? 'rotate(90deg)' : 'none',
              transformOrigin: 'center center',
              transition: 'transform 0.3s ease'
            }}
          >
            <Box sx={{ 
              maxWidth: pageSize === 'a4' ? '210mm' : pageSize === 'letter' ? '216mm' : '216mm',
              margin: '0 auto',
              p: 2
            }}>
              <Typography variant="h4" gutterBottom>
                Arizona Cardinals - Roster Overview
              </Typography>
              
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Team Status
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Paper elevation={1} sx={{ p: 2 }}>
                      <Typography variant="h4" color="error">7</Typography>
                      <Typography color="text.secondary">Active Injuries</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={4}>
                    <Paper elevation={1} sx={{ p: 2 }}>
                      <Typography variant="h4" color="error">3</Typography>
                      <Typography color="text.secondary">Active Illness</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={4}>
                    <Paper elevation={1} sx={{ p: 2 }}>
                      <Typography variant="h4" color="error">81%</Typography>
                      <Typography color="text.secondary">Fit-to-play Index</Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </Box>

              <Typography variant="h6" gutterBottom>
                Player Availability by Position
              </Typography>
              <TableContainer component={Paper} elevation={1}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      {Object.keys(positionGroups).map((group) => (
                        <TableCell key={group} align="center">
                          <Typography variant="subtitle2">{group}</Typography>
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      {Object.entries(positionGroups).map(([group, positions]) => (
                        <TableCell key={group} align="center">
                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            {athletes
                              .filter(a => positions.includes(a.position))
                              .map(athlete => (
                                <Chip
                                  key={athlete.id}
                                  label={`${athlete.firstname} ${athlete.lastname}`}
                                  size="small"
                                  color={
                                    athlete.availability_status === 'available' ? 'success' :
                                    athlete.availability_status === 'injured' ? 'warning' : 'error'
                                  }
                                />
                              ))
                            }
                          </Box>
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Paper>
        </Box>
      </Stack>
    </Paper>
  )
}

export default PrintConfiguration
