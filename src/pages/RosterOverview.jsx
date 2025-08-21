import React, { useState } from 'react'
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
  Paper,
  Divider
} from '@mui/material'
import {
  LocalHospitalOutlined,
  SickOutlined,
  FitnessCenterOutlined,
  TrendingUpOutlined,
  TrendingDownOutlined
} from '@mui/icons-material'


// Mock data for Arizona Cardinals
const teamData = {
  name: 'Arizona Cardinals',
  logo: '/public/assets/logos/teams/nfl/cardinals.png',
  totalPlayers: 53,
  activeInjuries: 7,
  activeIllness: 3,
  fitToPlayIndex: 81
}

// Mock player data for demonstration
const players = [
  { id: 1, name: 'Kyler Murray', position: 'QB', status: 'healthy', availability: 'available' },
  { id: 2, name: 'James Conner', position: 'RB', status: 'injured', availability: 'questionable' },
  { id: 3, name: 'DeAndre Hopkins', position: 'WR', status: 'healthy', availability: 'available' },
  { id: 4, name: 'Budda Baker', position: 'S', status: 'ill', availability: 'out' },
  { id: 5, name: 'J.J. Watt', position: 'DE', status: 'injured', availability: 'out' },
  { id: 6, name: 'Zach Ertz', position: 'TE', status: 'healthy', availability: 'available' },
  { id: 7, name: 'Marquise Brown', position: 'WR', status: 'injured', availability: 'questionable' },
  { id: 8, name: 'Byron Murphy', position: 'CB', status: 'healthy', availability: 'available' }
]

function RosterOverview() {
  const [selectedFilter, setSelectedFilter] = useState('all')

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy': return 'success'
      case 'injured': return 'error'
      case 'ill': return 'warning'
      default: return 'default'
    }
  }

  const getAvailabilityColor = (availability) => {
    switch (availability) {
      case 'available': return 'success'
      case 'questionable': return 'warning'
      case 'out': return 'error'
      default: return 'default'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'injured': return <LocalHospitalOutlined />
      case 'ill': return <SickOutlined />
      case 'healthy': return <FitnessCenterOutlined />
      default: return null
    }
  }

  const filteredPlayers = selectedFilter === 'all' 
    ? players 
    : players.filter(player => player.status === selectedFilter)

  const injuryPercentage = Math.round((teamData.activeInjuries / teamData.totalPlayers) * 100)
  const illnessPercentage = Math.round((teamData.activeIllness / teamData.totalPlayers) * 100)

  return (
    <Box sx={{ p: 3 }}>
      {/* Page Title */}
      <Typography variant="h4" gutterBottom sx={{ color: 'primary.main', mb: 3 }}>
        Roster overview
      </Typography>

      {/* Team Banner */}
      <Paper 
        sx={{ 
          p: 3, 
          mb: 3, 
          background: 'linear-gradient(135deg, #97233F 0%, #000000 100%)',
          color: 'white',
          borderRadius: 2
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar
            src={teamData.logo}
            alt={teamData.name}
            sx={{ 
              width: 60, 
              height: 60, 
              mr: 2,
              border: '2px solid white',
              bgcolor: '#97233F'
            }}
          >
            AC
          </Avatar>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              {teamData.name}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              {teamData.totalPlayers} players on roster
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Highlight Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Active Injuries Card */}
        <Grid item xs={12} md={4}>
          <Card sx={{ 
            height: '100%',
            '&:hover': {
              boxShadow: 3,
              transform: 'translateY(-2px)',
              transition: 'all 0.2s ease-in-out'
            }
          }}>
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                mb: 2 
              }}>
                <LocalHospitalOutlined 
                  sx={{ 
                    fontSize: 40, 
                    color: 'error.main',
                    mr: 1
                  }} 
                />
              </Box>
              <Typography variant="h3" sx={{ 
                fontWeight: 700, 
                color: 'error.main',
                mb: 1
              }}>
                {teamData.activeInjuries}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Active injuries
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {injuryPercentage}% of squad
              </Typography>
              <Chip 
                label={`${injuryPercentage}%`}
                color="error"
                size="small"
                sx={{ mt: 1 }}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Active Illness Card */}
        <Grid item xs={12} md={4}>
          <Card sx={{ 
            height: '100%',
            '&:hover': {
              boxShadow: 3,
              transform: 'translateY(-2px)',
              transition: 'all 0.2s ease-in-out'
            }
          }}>
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                mb: 2 
              }}>
                <SickOutlined 
                  sx={{ 
                    fontSize: 40, 
                    color: 'warning.main',
                    mr: 1
                  }} 
                />
              </Box>
              <Typography variant="h3" sx={{ 
                fontWeight: 700, 
                color: 'warning.main',
                mb: 1
              }}>
                {teamData.activeIllness}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Active illness
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {illnessPercentage}% of squad
              </Typography>
              <Chip 
                label={`${illnessPercentage}%`}
                color="warning"
                size="small"
                sx={{ mt: 1 }}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Fit-to-Play Index Card */}
        <Grid item xs={12} md={4}>
          <Card sx={{ 
            height: '100%',
            '&:hover': {
              boxShadow: 3,
              transform: 'translateY(-2px)',
              transition: 'all 0.2s ease-in-out'
            }
          }}>
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                mb: 2 
              }}>
                <FitnessCenterOutlined 
                  sx={{ 
                    fontSize: 40, 
                    color: 'success.main',
                    mr: 1
                  }} 
                />
              </Box>
              <Typography variant="h3" sx={{ 
                fontWeight: 700, 
                color: 'success.main',
                mb: 1
              }}>
                {teamData.fitToPlayIndex}%
              </Typography>
              <Typography variant="h6" gutterBottom>
                Fit-to-play index
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Overall team readiness
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 1 }}>
                {teamData.fitToPlayIndex >= 80 ? (
                  <TrendingUpOutlined sx={{ color: 'success.main', mr: 0.5 }} />
                ) : (
                  <TrendingDownOutlined sx={{ color: 'error.main', mr: 0.5 }} />
                )}
                <Chip 
                  label={teamData.fitToPlayIndex >= 80 ? 'Good' : 'Needs attention'}
                  color={teamData.fitToPlayIndex >= 80 ? 'success' : 'error'}
                  size="small"
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Health Status vs Availability Section */}
      <Paper sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom sx={{ color: 'primary.main', mb: 3 }}>
        Health status vs availability
      </Typography>

        {/* Filter Chips */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Filter by status:
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {['all', 'healthy', 'injured', 'ill'].map((filter) => (
              <Chip
                key={filter}
                label={filter.charAt(0).toUpperCase() + filter.slice(1)}
                onClick={() => setSelectedFilter(filter)}
                color={selectedFilter === filter ? 'primary' : 'default'}
                variant={selectedFilter === filter ? 'filled' : 'outlined'}
                size="small"
              />
            ))}
          </Box>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Players Grid */}
        <Grid container spacing={2}>
          {filteredPlayers.map((player) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={player.id}>
              <Card sx={{ 
                p: 2,
                '&:hover': {
                  boxShadow: 2
                }
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ 
                    width: 40, 
                    height: 40, 
                    mr: 2,
                    bgcolor: 'primary.main'
                  }}>
                    {player.name.split(' ').map(n => n[0]).join('')}
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      {player.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {player.position}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Chip
                    icon={getStatusIcon(player.status)}
                    label={player.status}
                    color={getStatusColor(player.status)}
                    size="small"
                    variant="outlined"
                  />
                  <Chip
                    label={player.availability}
                    color={getAvailabilityColor(player.availability)}
                    size="small"
                    variant="filled"
                  />
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        {filteredPlayers.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="body1" color="text.secondary">
              No players found with the selected filter.
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  )
}

export default RosterOverview
