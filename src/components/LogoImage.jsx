import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Typography } from '@mui/material'
import { getOrganizationLogo, getTeamLogo } from '../utils/assetManager'

/**
 * Logo Image Component with fallback handling
 * 
 * Uses MUI components for consistent styling
 * Displays organization or team logos with proper fallbacks
 */
function LogoImage({ 
  type = 'organization',
  logoId = 'organization-logo',
  league = 'premier-league',
  alt = '',
  width = 'auto',
  height = 32,
  showFallback = true,
  ...props 
}) {
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  // Get appropriate logo source
  const getLogoSrc = () => {
    switch (type) {
      case 'team':
        return getTeamLogo(logoId, league)
      case 'organization':
      default:
        return getOrganizationLogo(logoId)
    }
  }

  const logoSrc = getLogoSrc()

  const handleImageError = () => {
    setImageError(true)
  }

  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  // Fallback placeholder
  const renderFallback = () => {
    if (!showFallback) return null

    return (
      <Box
        sx={{
          width: '100%',
          height: '100%',
          bgcolor: 'grey.100',
          borderRadius: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid',
          borderColor: 'grey.300'
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: 'text.secondary',
            fontWeight: 500,
            textAlign: 'center',
            px: 0.5
          }}
        >
          {type === 'team' ? 'TEAM' : 'LOGO'}
        </Typography>
      </Box>
    )
  }

  // Loading placeholder
  const renderLoading = () => (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'grey.100',
        borderRadius: 1
      }}
    >
      <Typography variant="caption" color="text.secondary">
        ...
      </Typography>
    </Box>
  )

  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: width,
        height: height,
        position: 'relative'
      }}
      {...props}
    >
      {imageError ? (
        renderFallback()
      ) : (
        <>
          <Box
            component="img"
            src={logoSrc}
            alt={alt || `${type} logo`}
            onError={handleImageError}
            onLoad={handleImageLoad}
            sx={{
              maxWidth: '100%',
              maxHeight: '100%',
              width: 'auto',
              height: 'auto',
              opacity: imageLoaded ? 1 : 0,
              transition: 'opacity 0.2s ease'
            }}
          />
          {!imageLoaded && renderLoading()}
        </>
      )}
    </Box>
  )
}

LogoImage.propTypes = {
  type: PropTypes.oneOf(['organization', 'team']),
  logoId: PropTypes.string,
  league: PropTypes.string,
  alt: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  showFallback: PropTypes.bool
}

export default LogoImage