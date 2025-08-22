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

const PrintConfiguration = ({ onBack }) => {
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
              height: 400,
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: '#f5f5f5'
            }}
          >
            <Typography color="text.secondary">
              PDF Preview will be displayed here
            </Typography>
          </Paper>
        </Box>
      </Stack>
    </Paper>
  )
}

export default PrintConfiguration
