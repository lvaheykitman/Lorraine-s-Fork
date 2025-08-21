import React from 'react'
import PropTypes from 'prop-types'
import { Card as MuiCard, CardContent, CardHeader, Typography } from '@mui/material'

/**
 * Medinah Design System Card Component
 * 
 * Uses MUI Card with Medinah design system styling
 * Includes consistent spacing, colors, and layout
 */
function MedinahCard({ title, children, subtitle, action, ...props }) {
  return (
    <MuiCard {...props}>
      {title && (
        <CardHeader
          title={title}
          subtitle={subtitle}
          action={action}
          titleTypographyProps={{ variant: 'h6' }}
          subtitleTypographyProps={{ variant: 'body2' }}
        />
      )}
      <CardContent>
        {children}
      </CardContent>
    </MuiCard>
  )
}

MedinahCard.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  children: PropTypes.node.isRequired,
  action: PropTypes.node
}

export default MedinahCard