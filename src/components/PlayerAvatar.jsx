import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Avatar, Tooltip } from '@mui/material'
import { getPlayerImage } from '../utils/assetManager'

/**
 * Player Avatar Component with automatic fallback to initials
 * 
 * Uses MUI Avatar with automatic fallback to initials
 * Handles missing player images gracefully
 */
function PlayerAvatar({ 
  playerId, 
  playerName = '', 
  size = 'medium', 
  showTooltip = false,
  ...props 
}) {
  const [imageError, setImageError] = useState(false)

  // Size mapping to MUI Avatar sizes
  const sizeMap = {
    small: 32,
    medium: 40,
    large: 64,
    xlarge: 96
  }

  // Generate initials from player name
  const generateInitials = (name) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2) || '?'
  }

  // Get image source
  const imageSrc = getPlayerImage(playerId, playerName)

  const handleImageError = () => {
    setImageError(true)
  }

  const avatarContent = (
    <Avatar
      src={!imageError && imageSrc ? imageSrc : undefined}
      alt={playerName}
      sx={{
        width: sizeMap[size] || sizeMap.medium,
        height: sizeMap[size] || sizeMap.medium,
        bgcolor: 'primary.main',
        fontSize: size === 'small' ? '0.75rem' : size === 'large' ? '1.25rem' : '1rem',
        fontWeight: 600
      }}
      onError={handleImageError}
      {...props}
    >
      {generateInitials(playerName)}
    </Avatar>
  )

  if (showTooltip) {
    return (
      <Tooltip title={playerName} arrow>
        {avatarContent}
      </Tooltip>
    )
  }

  return avatarContent
}

PlayerAvatar.propTypes = {
  playerId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  playerName: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
  showTooltip: PropTypes.bool
}

export default PlayerAvatar