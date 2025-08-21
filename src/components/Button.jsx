import React from 'react'
import PropTypes from 'prop-types'
import { Button as MuiButton } from '@mui/material'

/**
 * Medinah Design System Button Component
 * 
 * Uses MUI Button with Medinah design system styling
 * Always uses sentence case text and adheres to brand guidelines
 */
function MedinahButton({ 
  children, 
  variant = 'contained', 
  size = 'small', 
  disabled = false, 
  onClick, 
  type = 'button',
  color = 'primary',
  ...props 
}) {
  return (
    <MuiButton
      variant={variant}
      size={size}
      disabled={disabled}
      onClick={onClick}
      type={type}
      color={color}
      {...props}
    >
      {children}
    </MuiButton>
  )
}

MedinahButton.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['contained', 'outlined', 'text']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  color: PropTypes.oneOf(['primary', 'secondary', 'success', 'error', 'warning', 'info'])
}

export default MedinahButton