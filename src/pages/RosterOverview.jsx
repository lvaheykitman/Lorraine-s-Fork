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
        Team overview
      </Typography>

      {/* Row 3: Team Banner with Cards */}
      <Paper 
        sx={{ 
          p: 3, 
          mb: 3, 
          background: '#97233F',
          borderRadius: 2,
          position: 'relative'
        }}
      >
        {/* Team Info */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Box>
                         <Typography variant="h1" sx={{ 
               fontSize: '42px', // Reduced from 60px by 30%
               fontWeight: 700, 
               color: '#ffffff',
               lineHeight: 1.2
             }}>
               Arizona Cardinals
             </Typography>
             <Typography variant="h6" sx={{ 
               color: '#ffffff',
               mt: 1
             }}>
               2025 season
             </Typography>
          </Box>
        </Box>

        {/* Cards in Banner */}
        <Grid container spacing={3}>
                     {/* Active Injuries Card */}
           <Grid item xs={12} md={4}>
              <Paper sx={{ 
                p: 3, 
                borderRadius: 2,
                backgroundColor: '#ffffff',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)'
              }}>
                <Box sx={{ textAlign: 'left' }}>
                  <Typography variant="h1" sx={{ 
                    fontSize: '34px', // Reduced from 48px by 30%
                    fontWeight: 800, 
                    color: '#97233F',
                    mb: 1,
                    lineHeight: 1
                  }}>
                    {teamData.activeInjuries}
                  </Typography>
                  <Typography variant="h6" sx={{ color: '#1F2D44', mb: 1 }}>
                    Active injuries
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#666666' }}>
                    {injuryPercentage}% of squad
                  </Typography>
                </Box>
              </Paper>
           </Grid>

           {/* Active Illness Card */}
           <Grid item xs={12} md={4}>
              <Paper sx={{ 
                p: 3, 
                borderRadius: 2,
                backgroundColor: '#ffffff',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)'
              }}>
                <Box sx={{ textAlign: 'left' }}>
                  <Typography variant="h1" sx={{ 
                    fontSize: '34px', // Reduced from 48px by 30%
                    fontWeight: 800, 
                    color: '#97233F',
                    mb: 1,
                    lineHeight: 1
                  }}>
                    {teamData.activeIllness}
                  </Typography>
                  <Typography variant="h6" sx={{ color: '#1F2D44', mb: 1 }}>
                    Active illness
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#666666' }}>
                    {illnessPercentage}% of squad
                  </Typography>
                </Box>
              </Paper>
           </Grid>

           {/* Fit-to-Play Index Card */}
           <Grid item xs={12} md={4}>
              <Paper sx={{ 
                p: 3, 
                borderRadius: 2,
                backgroundColor: '#ffffff',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)'
              }}>
                <Box sx={{ textAlign: 'left' }}>
                  <Typography variant="h1" sx={{ 
                    fontSize: '34px', // Reduced from 48px by 30%
                    fontWeight: 800, 
                    color: '#97233F',
                    mb: 1,
                    lineHeight: 1
                  }}>
                    {teamData.fitToPlayIndex}%
                  </Typography>
                  <Typography variant="h6" sx={{ color: '#1F2D44', mb: 1 }}>
                    Fit-to-play index
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#666666' }}>
                    Overall team readiness
                  </Typography>
                </Box>
              </Paper>
           </Grid>
        </Grid>
      </Paper>

      {/* Row 4: Availability Table */}
      <Box sx={{ mb: 3 }}>
        <AvailabilityTable athletes={athletes} />
      </Box>
    </Box>
  )
}

export default RosterOverview