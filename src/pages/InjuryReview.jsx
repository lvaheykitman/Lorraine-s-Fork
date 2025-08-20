import React from 'react'
import { Box, Typography, Paper } from '@mui/material'
import { LocalHospitalOutlined } from '@mui/icons-material'
import '../styles/design-tokens.css'

function InjuryReview() {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <LocalHospitalOutlined sx={{ fontSize: 32, color: 'var(--color-primary)', mr: 2 }} />
        <Typography variant="h4" sx={{ color: 'var(--color-primary)' }}>
          Injury review
        </Typography>
      </Box>
      
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h6" gutterBottom>
          Injury review dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Detailed injury analysis and reporting will be displayed here.
        </Typography>
      </Paper>
    </Box>
  )
}

export default InjuryReview
