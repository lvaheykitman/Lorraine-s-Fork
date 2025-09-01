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
  CardContent
} from '@mui/material'
import {
  Search as SearchIcon,
  FitnessCenterOutlined,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Error as ErrorIcon
} from '@mui/icons-material'
import { getAthletes } from '../services/dataService'

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

      {/* Search Section */}
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

      {/* Player List */}
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

      {/* Player Profile Banner */}
      {selectedPlayer && (
        <Box sx={{ mt: 3 }}>
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
                      bgcolor: 'white',
                      color: 'primary.main',
                      border: '3px solid white',
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
                  <Grid item xs={6} sm={4}>
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
                  <Grid item xs={6} sm={4}>
                    <Paper sx={{ p: 2, bgcolor: 'rgba(255, 255, 255, 0.1)', borderRadius: 2 }}>
                      <Typography variant="caption" sx={{ opacity: 0.8 }}>
                        Weight
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        {selectedPlayer.weight}
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      )}
    </Box>
  )
}

export default TrainingDevelopment
