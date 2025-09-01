import React, { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Paper,
  TextField,
  InputAdornment,
  Grid,
  Avatar,
  Chip,
  Card,
  CardContent,
  Button,
  LinearProgress
} from '@mui/material'
import {
  Search as SearchIcon,
  FitnessCenterOutlined,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  ArrowBack as ArrowBackIcon,
  TrendingUp as TrendingUpIcon,
  AccessTime as AccessTimeIcon,
  SportsScore as SportsScoreIcon
} from '@mui/icons-material'
import { getAthletes } from '../services/dataService'

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
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPlayer, setSelectedPlayer] = useState(null)
  const [filteredAthletes, setFilteredAthletes] = useState([])

  useEffect(() => {
    const loadData = () => {
      const athletesData = getAthletes()
      setAthletes(athletesData)
      setFilteredAthletes(athletesData)
    }
    loadData()
  }, [])

  useEffect(() => {
    const filtered = athletes.filter(athlete => {
      const searchStr = searchQuery.toLowerCase()
      return athlete.firstname.toLowerCase().includes(searchStr) ||
             athlete.lastname.toLowerCase().includes(searchStr) ||
             athlete.id.toString().includes(searchStr) ||
             athlete.squad_name.toLowerCase().includes(searchStr)
    })
    setFilteredAthletes(filtered)
  }, [searchQuery, athletes])

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

      {/* Search Section - Only shown in list view */}
      {!selectedPlayer && (
        <Paper 
          sx={{ 
            p: 3, 
            mb: 3, 
            background: 'linear-gradient(135deg, #97233F 0%, #7A1C32 50%, #5C1526 100%)',
            borderRadius: 2
          }}
        >
          <TextField
            fullWidth
            placeholder="Search players by name, ID or squad..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
        </Paper>
      )}

      {!selectedPlayer ? (
        // Player List View
        <Grid container spacing={2}>
          {filteredAthletes.map((athlete) => (
            <Grid item xs={12} sm={6} md={4} key={athlete.id}>
              <Card 
                sx={{ 
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: 'grey.50',
                    transform: 'translateY(-2px)',
                    transition: 'all 0.2s ease-in-out'
                  }
                }}
                onClick={() => setSelectedPlayer(athlete)}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar 
                      sx={{ 
                        width: 60, 
                        height: 60,
                        bgcolor: 'primary.main'
                      }}
                    >
                      {athlete.firstname[0]}{athlete.lastname[0]}
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                        {athlete.firstname} {athlete.lastname}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        ID: {athlete.id} • {athlete.squad_name}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Chip
                          size="small"
                          label={athlete.position}
                          sx={{ bgcolor: 'primary.light', color: 'white' }}
                        />
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          {getHealthIcon(athlete.injury_status)}
                          <Typography variant="caption" color="text.secondary">
                            {athlete.injury_status}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        // Player Detail View
        <>
          {/* Back Button */}
          <Box sx={{ mb: 2 }}>
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={() => setSelectedPlayer(null)}
              sx={{ color: 'grey.600' }}
            >
              Back to Players
            </Button>
          </Box>

          {/* Player Profile Banner */}
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
                    src={`/public/assets/logos/teams/nfl/${selectedPlayer.firstname.toLowerCase()}-${selectedPlayer.lastname.toLowerCase()}.png`}
                    sx={{ 
                      width: 80, 
                      height: 80,
                      border: '3px solid white',
                      bgcolor: 'white',
                      color: 'primary.main',
                      fontSize: '1.5rem',
                      fontWeight: 'bold'
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
                  <Grid item xs={6} sm={4}>
                    <Paper 
                      sx={{ 
                        p: 3, 
                        borderRadius: 2,
                        backgroundColor: '#ffffff',
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)'
                      }}
                    >
                      <Box sx={{ textAlign: 'left' }}>
                        <Typography variant="h1" sx={{ 
                          fontSize: '34px',
                          fontWeight: 800, 
                          color: '#97233F',
                          mb: 1,
                          lineHeight: 1
                        }}>
                          {selectedPlayer.age}
                        </Typography>
                        <Typography variant="h6" sx={{ color: '#1F2D44', mb: 1 }}>
                          Age
                        </Typography>
                      </Box>
                    </Paper>
                  </Grid>

                  {/* Height */}
                  <Grid item xs={6} sm={4}>
                    <Paper 
                      sx={{ 
                        p: 3, 
                        borderRadius: 2,
                        backgroundColor: '#ffffff',
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)'
                      }}
                    >
                      <Box sx={{ textAlign: 'left' }}>
                        <Typography variant="h1" sx={{ 
                          fontSize: '34px',
                          fontWeight: 800, 
                          color: '#97233F',
                          mb: 1,
                          lineHeight: 1
                        }}>
                          {selectedPlayer.height}
                        </Typography>
                        <Typography variant="h6" sx={{ color: '#1F2D44', mb: 1 }}>
                          Height
                        </Typography>
                      </Box>
                    </Paper>
                  </Grid>

                  {/* Weight */}
                  <Grid item xs={6} sm={4}>
                    <Paper 
                      sx={{ 
                        p: 3, 
                        borderRadius: 2,
                        backgroundColor: '#ffffff',
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)'
                      }}
                    >
                      <Box sx={{ textAlign: 'left' }}>
                        <Typography variant="h1" sx={{ 
                          fontSize: '34px',
                          fontWeight: 800, 
                          color: '#97233F',
                          mb: 1,
                          lineHeight: 1
                        }}>
                          {selectedPlayer.weight}
                        </Typography>
                        <Typography variant="h6" sx={{ color: '#1F2D44', mb: 1 }}>
                          Weight
        </Typography>
      </Box>
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>

          {/* Player Summary Section */}
          {/* Recent Notes directly below the banner */}
          <Box sx={{ mb: 3 }}>
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
          </Box>

          {/* Other summary cards */}
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
                  <SportsScoreIcon sx={{ color: 'primary.main', mr: 1 }} />
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
                      <Box sx={{ my: 2, borderTop: '1px solid', borderColor: 'divider' }} />
                    )}
                  </Box>
                ))}
              </Paper>
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  )
}

export default TrainingDevelopment
