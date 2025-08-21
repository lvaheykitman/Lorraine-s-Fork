import React from 'react'
import PropTypes from 'prop-types'
import { SvgIcon } from '@mui/material'
import * as MaterialIcons from '@mui/icons-material'

/**
 * Medinah Design System Icon Component
 * 
 * Uses MUI Material Icons with consistent sizing
 * Ensures consistent icon usage across the design system
 */
function MedinahIcon({ icon, size = 'medium', color = 'inherit', ...props }) {
  const IconComponent = MaterialIcons[icon]
  
  const sizeMap = {
    small: 16,
    medium: 20,
    large: 24
  }

  if (!IconComponent) {
    console.warn(`Icon "${icon}" not found in Material Icons`)
    return null
  }

  return (
    <SvgIcon
      component={IconComponent}
      fontSize={size}
      sx={{ 
        width: sizeMap[size], 
        height: sizeMap[size],
        color: color
      }}
      {...props}
    />
  )
}

MedinahIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  color: PropTypes.string
}

export default MedinahIcon