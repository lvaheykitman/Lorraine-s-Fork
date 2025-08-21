import React from 'react'
import PropTypes from 'prop-types'
import { Chip } from '@mui/material'

/**
 * Medinah Design System Status Chip Component
 * 
 * Uses MUI Chip with consistent colors and styling
 * Automatically applies correct status colors based on type
 */
function MedinahStatusChip({ status, type = 'default', size = 'small', ...props }) {
  const getChipColor = () => {
    switch (type) {
      case 'success':
        return 'success'
      case 'error':
        return 'error'
      case 'warning':
        return 'warning'
      case 'primary':
        return 'primary'
      default:
        return 'default'
    }
  }

  return (
    <Chip
      label={status}
      color={getChipColor()}
      size={size}
      variant="filled"
      {...props}
    />
  )
}

MedinahStatusChip.propTypes = {
  status: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'error', 'warning', 'primary', 'default']),
  size: PropTypes.oneOf(['small', 'medium'])
}

export default MedinahStatusChip