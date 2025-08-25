import React, { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Paper,
  Divider
} from '@mui/material'
import AvailabilityTable from '../components/AvailabilityTable'
import { getAthletes } from '../services/dataService'

// Mock data for Arizona Cardinals
const teamData = {
  name: 'Arizona Cardinals',
  totalPlayers: 53,
  activeInjuries: 7,
  activeIllness: 3,
  fitToPlayIndex: 81
}

function RosterOverview() {
  const [athletes, setAthletes] = useState([])

  useEffect(() => {
    const loadData = () => {
      const athletesData = getAthletes()
      setAthletes(athletesData)
    }
    loadData()
  }, [])

  const injuryPercentage = Math.round((teamData.activeInjuries / teamData.totalPlayers) * 100)
  const illnessPercentage = Math.round((teamData.activeIllness / teamData.totalPlayers) * 100)

  return (
    <Box sx={{ p: 3 }}>
      {/* Row 1: Header */}
      <Box sx={{ mb: 2 }}>
        {/* Header content can be added here */}
      </Box>

      {/* Row 2: H1 Title - Reduced by 30% and bold */}
      <Typography 
        variant="h4" 
        gutterBottom 
        sx={{ 
          color: 'primary.main', 
          mb: 3,
          fontSize: '1.225rem', // 30% reduction from h4 (1.75rem * 0.7)
          fontWeight: 700 // Bold
        }}
      >
        Roster overview
      </Typography>

      {/* Row 3: Team Info */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#1F2D44' }}>
          Arizona Cardinals
        </Typography>
        <Typography variant="h6" sx={{ color: '#1F2D44' }}>
          2025 season
        </Typography>
      </Box>

      {/* Row 4: Metric Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {/* Active Injuries Card */}
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, height: '100%', bgcolor: 'white' }}>
            <Box sx={{ textAlign: 'left' }}>
              <Typography variant="h3" sx={{ 
                fontWeight: 700, 
                color: '#ff0000',
                mb: 1
              }}>
                {teamData.activeInjuries}
              </Typography>
              <Typography variant="h6" sx={{ color: '#666666', mb: 1 }}>
                Active injuries
              </Typography>
              <Typography variant="body2" sx={{ color: '#666666' }}>
                {injuryPercentage}% of squad
              </Typography>
            </Box>
          </Card>
        </Grid>

        {/* Active Illness Card */}
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, height: '100%', bgcolor: 'white' }}>
            <Box sx={{ textAlign: 'left' }}>
              <Typography variant="h3" sx={{ 
                fontWeight: 700, 
                color: '#ff0000',
                mb: 1
              }}>
                {teamData.activeIllness}
              </Typography>
              <Typography variant="h6" sx={{ color: '#666666', mb: 1 }}>
                Active illness
              </Typography>
              <Typography variant="body2" sx={{ color: '#666666' }}>
                {illnessPercentage}% of squad
              </Typography>
            </Box>
          </Card>
        </Grid>

        {/* Fit-to-Play Index Card */}
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, height: '100%', bgcolor: 'white' }}>
            <Box sx={{ textAlign: 'left' }}>
              <Typography variant="h3" sx={{ 
                fontWeight: 700, 
                color: '#ff0000',
                mb: 1
              }}>
                {teamData.fitToPlayIndex}%
              </Typography>
              <Typography variant="h6" sx={{ color: '#666666', mb: 1 }}>
                Fit-to-play index
              </Typography>
              <Typography variant="body2" sx={{ color: '#666666' }}>
                Overall team readiness
              </Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>

      {/* Row 4: Availability Table */}
      <Box sx={{ mb: 3 }}>
        <AvailabilityTable athletes={athletes} />
      </Box>
    </Box>
  )
}

export default RosterOverview