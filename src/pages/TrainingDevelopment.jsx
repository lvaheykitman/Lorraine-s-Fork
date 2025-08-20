import React from 'react'
import { Box, Typography, Paper } from '@mui/material'
import { FitnessCenterOutlined } from '@mui/icons-material'
import '../styles/design-tokens.css'

function TrainingDevelopment() {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <FitnessCenterOutlined sx={{ fontSize: 32, color: 'var(--color-primary)', mr: 2 }} />
        <Typography variant="h4" sx={{ color: 'var(--color-primary)' }}>
          Training development
        </Typography>
      </Box>
      
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h6" gutterBottom>
          Training development dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Training programs and development tracking will be displayed here.
        </Typography>
      </Paper>
    </Box>
  )
}

export default TrainingDevelopment
