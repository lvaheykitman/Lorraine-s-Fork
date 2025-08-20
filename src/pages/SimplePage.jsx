import { Box, Typography } from '@mui/material'
import { AthleteForm } from '../components'

function SimplePage({ pageName }) {
  const handleFormSubmit = async (formData) => {
    console.log('Form submitted:', formData)
    // Here you would typically send the data to your API
  }

  // Show the AthleteForm component for the Forms page
  if (pageName === 'Forms') {
    return (
      <Box sx={{ p: 3 }}>
        <AthleteForm onSubmit={handleFormSubmit} mode="create" />
      </Box>
    )
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="body2" color="text.secondary">
        {pageName}
      </Typography>
    </Box>
  )
}

export default SimplePage