import React from 'react'
import { Box, Typography, Paper } from '@mui/material'
import { NotificationsOutlined } from '@mui/icons-material'


function Notifications() {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <NotificationsOutlined sx={{ fontSize: 32, color: 'primary.main', mr: 2 }} />
        <Typography variant="h4" sx={{ color: 'primary.main' }}>
          Notifications
        </Typography>
      </Box>
      
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h6" gutterBottom>
          Notifications center
        </Typography>
        <Typography variant="body1" color="text.secondary">
          System notifications and alerts will be displayed here.
        </Typography>
      </Paper>
    </Box>
  )
}

export default Notifications
