import React, { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Paper,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Avatar,
  Chip,
  LinearProgress,
  Card,
  CardContent,
  Divider
} from '@mui/material'
import {
  Search as SearchIcon,
  FitnessCenterOutlined,
  AccessTime as AccessTimeIcon,
  TrendingUp as TrendingUpIcon,
  LocalHospital as LocalHospitalIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Error as ErrorIcon
} from '@mui/icons-material'
import { getAthletes, getSquads } from '../services/dataService'

// Mock training data
const mockTrainingData = {
  currentFocus: [
    { skill: 'Crossing drills', progress: 75 },
    { skill: 'Stamina work', progress: 60 },
    { skill: 'Sprint training', progress: 85 },
    { skill: 'Ball control', progress: 70 }
  ],
  recentMatches: [
    { date: '2024-01-15', performance: 8.5, highlights: 'Excellent passing accuracy' },
    { date: '2024-01-10', performance: 7.8, highlights: 'Strong defensive positioning' },
    { date: '2024-01-05', performance: 8.2, highlights: 'Key assists in second half' }
  ],
  recentNotes: [
    { date: '2024-01-16', type: 'coach', note: 'Showing great improvement in aerial duels' },
    { date: '2024-01-14', type: 'medical', note: 'Recovery protocol completed successfully' }
  ]
}

function TrainingDevelopment() {
  const [athletes, setAthletes] = useState([])
  const [squads, setSquads] = useState([])
  const [selectedSquad, setSelectedSquad] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPlayer, setSelectedPlayer] = useState(null)
  const [filteredAthletes, setFilteredAthletes] = useState([])

  useEffect(() => {
    const loadData = () => {
      const athletesData = getAthletes()
      const squadsData = getSquads()
      setAthletes(athletesData)
      setFilteredAthletes(athletesData)
      setSquads(squadsData)
    }
    loadData()
  }, [])

  useEffect(() => {
    const filtered = athletes.filter(athlete => {
      const matchesSearch = searchQuery === '' || 
        athlete.firstname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        athlete.lastname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        athlete.id.toString().includes(searchQuery)
      
      const matchesSquad = selectedSquad === '' || athlete.squad_name === selectedSquad

      return matchesSearch && matchesSquad
    })
    setFilteredAthletes(filtered)

    // If current selected player doesn't match filters, clear selection
    if (selectedPlayer && !filtered.find(a => a.id === selectedPlayer.id)) {
      setSelectedPlayer(null)
    }
  }, [searchQuery, selectedSquad, athletes])

  const getHealthIcon = (status) => {
    switch (status) {
      case 'Healthy':
        return <CheckCircleIcon sx={{ color: 'success.main' }} />
      case 'Recovering':
        return <WarningIcon sx={{ color: 'warning.main' }} />
      default:
        return <ErrorIcon sx={{ color: 'error.main' }} />
    }
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Page Title */}
      <Typography 
        variant="h4" 
        gutterBottom 
        sx={{ 
          color: 'primary.main', 
          mb: 3,
          fontSize: '1.225rem',
          fontWeight: 700
        }}
      >
        Training & Development
      </Typography>

      {/* Search & Filter Section */}
      <Paper 
        sx={{ 
          p: 3, 
          mb: 3, 
          background: 'linear-gradient(135deg, #97233F 0%, #7A1C32 50%, #5C1526 100%)',
          borderRadius: 2
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={8}>
                          <TextField
                fullWidth
                placeholder="Search players by name or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && filteredAthletes.length > 0) {
                    setSelectedPlayer(filteredAthletes[0])
                  }
                }}
                sx={{
                backgroundColor: 'white',
                borderRadius: 1,
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'transparent',
                  },
                  '&:hover fieldset': {
                    borderColor: 'transparent',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'transparent',
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: 'grey.500' }} />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth sx={{ backgroundColor: 'white', borderRadius: 1 }}>
              <InputLabel>Squad</InputLabel>
              <Select
                value={selectedSquad}
                label="Squad"
                onChange={(e) => setSelectedSquad(e.target.value)}
              >
                <MenuItem value="">All Squads</MenuItem>
                {squads.map((squad) => (
                  <MenuItem key={squad} value={squad}>{squad}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      {/* Content Area */}
      <Box sx={{ mt: 3 }}>
        {selectedPlayer ? (
          // Player View
          <>
            {/* Player Profile Header */}
            <Paper 
              sx={{ 
                p: 3, 
                mb: 3, 
                background: 'linear-gradient(135deg, #97233F 0%, #7A1C32 50%, #5C1526 100%)',
                borderRadius: 2,
                color: 'white'
              }}
            >
              <Grid container spacing={3} alignItems="center">
                {/* Avatar and Basic Info */}
                <Grid item xs={12} md={4}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar 
                      sx={{ 
                        width: 80, 
                        height: 80,
                        border: '3px solid white'
                      }}
                    >
                      {selectedPlayer.firstname[0]}{selectedPlayer.lastname[0]}
                    </Avatar>
                    <Box>
                      <Typography variant="h5" sx={{ fontWeight: 700 }}>
                        {selectedPlayer.firstname} {selectedPlayer.lastname}
                      </Typography>
                      <Typography variant="body1" sx={{ opacity: 0.9 }}>
                        ID: {selectedPlayer.id}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                {/* Quick Stats */}
                <Grid item xs={12} md={8}>
                  <Grid container spacing={2}>
                    {/* Age */}
                    <Grid item xs={6} sm={3}>
                      <Paper sx={{ p: 2, bgcolor: 'rgba(255, 255, 255, 0.1)', borderRadius: 2 }}>
                        <Typography variant="caption" sx={{ opacity: 0.8 }}>
                          Age
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                          {selectedPlayer.age}
                        </Typography>
                      </Paper>
                    </Grid>

                    {/* Height */}
                    <Grid item xs={6} sm={3}>
                      <Paper sx={{ p: 2, bgcolor: 'rgba(255, 255, 255, 0.1)', borderRadius: 2 }}>
                        <Typography variant="caption" sx={{ opacity: 0.8 }}>
                          Height
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                          {selectedPlayer.height}
                        </Typography>
                      </Paper>
                    </Grid>

                    {/* Weight */}
                    <Grid item xs={6} sm={3}>
                      <Paper sx={{ p: 2, bgcolor: 'rgba(255, 255, 255, 0.1)', borderRadius: 2 }}>
                        <Typography variant="caption" sx={{ opacity: 0.8 }}>
                          Weight
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                          {selectedPlayer.weight}
                        </Typography>
                      </Paper>
                    </Grid>

                    {/* Health Status */}
                    <Grid item xs={6} sm={3}>
                      <Paper sx={{ p: 2, bgcolor: 'rgba(255, 255, 255, 0.1)', borderRadius: 2 }}>
                        <Typography variant="caption" sx={{ opacity: 0.8 }}>
                          Health
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {getHealthIcon(selectedPlayer.injury_status)}
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {selectedPlayer.injury_status}
                          </Typography>
                        </Box>
                      </Paper>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>

            {/* Player Summary Section */}
            <Grid container spacing={3}>
              {/* Training Focus */}
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3, height: '100%' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <FitnessCenterOutlined sx={{ color: 'primary.main', mr: 1 }} />
                    <Typography variant="h6" color="primary.main">
                      Current Training Focus
                    </Typography>
                  </Box>
                  <Box sx={{ mb: 3 }}>
                    {mockTrainingData.currentFocus.map((focus, index) => (
                      <Box key={index} sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                          <Typography variant="body2">{focus.skill}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {focus.progress}%
                          </Typography>
                        </Box>
                        <LinearProgress 
                          variant="determinate" 
                          value={focus.progress}
                          sx={{
                            height: 8,
                            borderRadius: 4,
                            bgcolor: 'grey.100',
                            '& .MuiLinearProgress-bar': {
                              bgcolor: 'primary.main',
                              borderRadius: 4
                            }
                          }}
                        />
                      </Box>
                    ))}
                  </Box>
                </Paper>
              </Grid>

              {/* Match Results */}
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3, height: '100%' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <TrendingUpIcon sx={{ color: 'primary.main', mr: 1 }} />
                    <Typography variant="h6" color="primary.main">
                      Recent Match Performance
                    </Typography>
                  </Box>
                  {mockTrainingData.recentMatches.map((match, index) => (
                    <Box key={index} sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                          {new Date(match.date).toLocaleDateString()}
                        </Typography>
                        <Chip 
                          label={`Rating: ${match.performance}`}
                          size="small"
                          sx={{ 
                            bgcolor: match.performance >= 8 ? 'success.light' : 'warning.light',
                            color: 'white'
                          }}
                        />
                      </Box>
                      <Typography variant="body2">
                        {match.highlights}
                      </Typography>
                      {index < mockTrainingData.recentMatches.length - 1 && (
                        <Divider sx={{ my: 2 }} />
                      )}
                    </Box>
                  ))}
                </Paper>
              </Grid>

              {/* Recent Notes */}
              <Grid item xs={12}>
                <Paper sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <AccessTimeIcon sx={{ color: 'primary.main', mr: 1 }} />
                    <Typography variant="h6" color="primary.main">
                      Recent Notes
                    </Typography>
                  </Box>
                  <Grid container spacing={2}>
                    {mockTrainingData.recentNotes.map((note, index) => (
                      <Grid item xs={12} md={6} key={index}>
                        <Paper 
                          variant="outlined" 
                          sx={{ 
                            p: 2,
                            bgcolor: note.type === 'coach' ? 'primary.50' : 'warning.50'
                          }}
                        >
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="caption" sx={{ fontWeight: 600 }}>
                              {note.type === 'coach' ? 'Coach Note' : 'Medical Update'}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {new Date(note.date).toLocaleDateString()}
                            </Typography>
                          </Box>
                          <Typography variant="body2">
                            {note.note}
                          </Typography>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </>
        ) : (
          // Squad View
          <>
            {/* Squad Overview */}
            <Paper 
              sx={{ 
                p: 3, 
                mb: 3, 
                background: 'linear-gradient(135deg, #97233F 0%, #7A1C32 50%, #5C1526 100%)',
                borderRadius: 2,
                color: 'white'
              }}
            >
              <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} md={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box 
                      component="img"
                      src="/public/assets/logos/teams/nfl/cardinals.png"
                      alt="Team Logo"
                      sx={{ 
                        width: 80,
                        height: 80,
                        objectFit: 'contain',
                        filter: 'brightness(0) invert(1)'
                      }}
                    />
                    <Box>
                      <Typography variant="h5" sx={{ fontWeight: 700 }}>
                        {selectedSquad || 'All Squads'}
                      </Typography>
                      <Typography variant="body1" sx={{ opacity: 0.9 }}>
                        {filteredAthletes.length} Players
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Paper sx={{ p: 2, bgcolor: 'rgba(255, 255, 255, 0.1)', borderRadius: 2 }}>
                        <Typography variant="caption" sx={{ opacity: 0.8 }}>
                          Average Performance
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                          {Math.round(filteredAthletes.reduce((acc, curr) => acc + curr.performance_score, 0) / filteredAthletes.length)}%
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={6}>
                      <Paper sx={{ p: 2, bgcolor: 'rgba(255, 255, 255, 0.1)', borderRadius: 2 }}>
                        <Typography variant="caption" sx={{ opacity: 0.8 }}>
                          Fitness Level
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                          {Math.round(filteredAthletes.reduce((acc, curr) => acc + parseFloat(curr.training_load), 0) / filteredAthletes.length * 10)}%
                        </Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>

            {/* Players List */}
            <Grid container spacing={2}>
              {filteredAthletes.map((athlete) => (
                <Grid item xs={12} sm={6} md={4} key={athlete.id}>
                  <Paper 
                    sx={{ 
                      p: 2,
                      cursor: 'pointer',
                      '&:hover': {
                        bgcolor: 'grey.50'
                      }
                    }}
                    onClick={() => setSelectedPlayer(athlete)}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ width: 50, height: 50 }}>
                        {athlete.firstname[0]}{athlete.lastname[0]}
                      </Avatar>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          {athlete.firstname} {athlete.lastname}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {athlete.position}
                        </Typography>
                      </Box>
                      <Box sx={{ textAlign: 'right' }}>
                        <Chip
                          size="small"
                          label={athlete.injury_status}
                          color={athlete.injury_status === 'Healthy' ? 'success' : 'warning'}
                          sx={{ mb: 1 }}
                        />
                        <Typography variant="caption" display="block" color="text.secondary">
                          Score: {athlete.performance_score}
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Box>
      </Box>
    </Box>
  )
}

export default TrainingDevelopment
