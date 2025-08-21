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
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Tabs,
  Tab
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import {
  LocalHospitalOutlined,
  SickOutlined,
  FitnessCenterOutlined,
  TrendingUpOutlined,
  TrendingDownOutlined,
  Search
} from '@mui/icons-material'
import Logo from '../assets/nfl-arizona-cardinals-team-logo-2-768x768.svg'


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
  { id: 1, name: 'Kyler Murray', position: 'QB', status: 'healthy', availability: 'available', roster: 'active' },
  { id: 2, name: 'James Conner', position: 'RB', status: 'injured', availability: 'questionable', roster: 'active' },
  { id: 3, name: 'DeAndre Hopkins', position: 'WR', status: 'healthy', availability: 'available', roster: 'active' },
  { id: 4, name: 'Budda Baker', position: 'S', status: 'ill', availability: 'out', roster: 'active' },
  { id: 5, name: 'J.J. Watt', position: 'DE', status: 'injured', availability: 'out', roster: 'injured-reserve' },
  { id: 6, name: 'Zach Ertz', position: 'TE', status: 'healthy', availability: 'available', roster: 'active' },
  { id: 7, name: 'Marquise Brown', position: 'WR', status: 'injured', availability: 'questionable', roster: 'active' },
  { id: 8, name: 'Byron Murphy', position: 'CB', status: 'healthy', availability: 'available', roster: 'active' },
  { id: 9, name: 'Practice Player 1', position: 'QB', status: 'healthy', availability: 'available', roster: 'practice-squad' },
  { id: 10, name: 'Practice Player 2', position: 'WR', status: 'healthy', availability: 'available', roster: 'practice-squad' }
]

// Mock medical alerts data
const medicalAlerts = [
  {
    player: 'WR #11 – J. Smith',
    status: 'Doubtful',
    issue: 'Hamstring strain (Grade I) sustained in practice',
    timeline: 'Will miss remainder of this week\'s practices; unlikely for Sunday, reassess in 48 hrs'
  },
  {
    player: 'RB #23 – M. Johnson',
    status: 'Questionable',
    issue: 'Ankle sprain during game',
    timeline: 'Limited practice expected; game-time decision'
  },
  {
    player: 'CB #21 – A. Williams',
    status: 'Out',
    issue: 'Concussion protocol',
    timeline: 'Will not play this week; cleared for next week'
  },
  {
    player: 'DE #99 – R. Davis',
    status: 'Probable',
    issue: 'Minor shoulder soreness',
    timeline: 'Full practice expected; will play Sunday'
  }
]

function RosterOverview() {
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedRoster, setSelectedRoster] = useState('active')
  const [selectedPosition, setSelectedPosition] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

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

  const filteredPlayers = players.filter(player => {
    const matchesRoster = selectedRoster === 'all' || player.roster === selectedRoster
    const matchesPosition = selectedPosition === 'all' || player.position === selectedPosition
    const matchesSearch = player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         player.position.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesRoster && matchesPosition && matchesSearch
  })

  const positions = ['all', ...Array.from(new Set(players.map(p => p.position)))]

  const rosterTabs = [
    { value: 'active', label: 'Active roster (regular season)' },
    { value: 'practice-squad', label: 'Practice squad' },
    { value: 'injured-reserve', label: 'Injured reserve' }
  ]

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

      {/* Row 3: Team Banner with Cards */}
      <Paper 
        sx={{ 
          p: 3, 
          mb: 3, 
          background: 'linear-gradient(135deg, #97233F 0%, rgba(255,255,255,0.4) 70%, #ffffff 100%)', // Less concentrated gradient
          borderRadius: 2,
          position: 'relative'
        }}
      >
        {/* Team Info */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Box
            component="img"
            src={Logo}
            alt="Arizona Cardinals"
            sx={{ 
              width: 60, 
              height: 60, 
              mr: 2
            }}
          />
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#1F2D44' }}>
              Arizona Cardinals
            </Typography>
            <Typography variant="h6" sx={{ color: '#1F2D44' }}>
              2025 season
            </Typography>
          </Box>
        </Box>

        {/* Cards in Banner with white background */}
        <Box sx={{ bgcolor: '#ffffff', borderRadius: 2, p: 2 }}>
          <Grid container spacing={3}>
            {/* Active Injuries Card */}
            <Grid item xs={12} md={4}>
              <Card sx={{ 
                height: '100%',
                boxShadow: 'none',
                border: '1px solid #e0e0e0'
              }}>
                <CardContent sx={{ textAlign: 'left', p: 2 }}>
                  <Typography variant="h3" sx={{ 
                    fontWeight: 700, 
                    color: '#dc3545',
                    mb: 1
                  }}>
                    {teamData.activeInjuries}
                  </Typography>
                  <Typography variant="h6" sx={{ color: '#1F2D44', mb: 1 }}>
                    Active injuries
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#1F2D44' }}>
                    {injuryPercentage}% of squad
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Active Illness Card */}
            <Grid item xs={12} md={4}>
              <Card sx={{ 
                height: '100%',
                boxShadow: 'none',
                border: '1px solid #e0e0e0'
              }}>
                <CardContent sx={{ textAlign: 'left', p: 2 }}>
                  <Typography variant="h3" sx={{ 
                    fontWeight: 700, 
                    color: '#dc3545',
                    mb: 1
                  }}>
                    {teamData.activeIllness}
                  </Typography>
                  <Typography variant="h6" sx={{ color: '#1F2D44', mb: 1 }}>
                    Active illness
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#1F2D44' }}>
                    {illnessPercentage}% of squad
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Fit-to-Play Index Card */}
            <Grid item xs={12} md={4}>
              <Card sx={{ 
                height: '100%',
                boxShadow: 'none',
                border: '1px solid #e0e0e0'
              }}>
                <CardContent sx={{ textAlign: 'left', p: 2 }}>
                  <Typography variant="h3" sx={{ 
                    fontWeight: 700, 
                    color: '#dc3545',
                    mb: 1
                  }}>
                    {teamData.fitToPlayIndex}%
                  </Typography>
                  <Typography variant="h6" sx={{ color: '#1F2D44', mb: 1 }}>
                    Fit-to-play index
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#1F2D44' }}>
                    Overall team readiness
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      {/* Row 4: Medical Alerts and Notifications */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom sx={{ color: 'primary.main', mb: 3 }}>
          Medical alerts and notifications
        </Typography>
        
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600, color: '#1F2D44' }}>Player</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#1F2D44' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#1F2D44' }}>Issue</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#1F2D44' }}>Timeline</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {medicalAlerts.map((alert, index) => (
                <TableRow key={index} sx={{ '&:hover': { bgcolor: 'grey.50' } }}>
                  <TableCell sx={{ color: '#1F2D44', fontWeight: 500 }}>
                    {alert.player}
                  </TableCell>
                  <TableCell sx={{ color: '#1F2D44', fontWeight: 500 }}>
                    {alert.status}
                  </TableCell>
                  <TableCell sx={{ color: '#1F2D44' }}>
                    {alert.issue}
                  </TableCell>
                  <TableCell sx={{ color: '#1F2D44' }}>
                    {alert.timeline}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Health Status vs Availability Section */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom sx={{ color: 'primary.main', mb: 3 }}>
          Health status vs availability
        </Typography>

        {/* New Filter Controls */}
        <Box sx={{ mb: 3 }}>
          <Grid container spacing={2} alignItems="center">
            {/* Date Picker */}
            <Grid item xs={12} sm={6} md={3}>
              <DatePicker
                label="Date"
                value={selectedDate}
                onChange={(newValue) => setSelectedDate(newValue)}
                renderInput={(params) => <TextField {...params} fullWidth size="small" />}
              />
            </Grid>

            {/* Position Filter */}
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Position</InputLabel>
                <Select
                  value={selectedPosition}
                  label="Position"
                  onChange={(e) => setSelectedPosition(e.target.value)}
                >
                  {positions.map((position) => (
                    <MenuItem key={position} value={position}>
                      {position === 'all' ? 'All Positions' : position}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Search Bar */}
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                size="small"
                placeholder="Search players..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />
                }}
              />
            </Grid>
          </Grid>
        </Box>

        {/* Roster Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs 
            value={selectedRoster} 
            onChange={(e, newValue) => setSelectedRoster(newValue)}
            sx={{
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 500
              }
            }}
          >
            {rosterTabs.map((tab) => (
              <Tab 
                key={tab.value} 
                label={tab.label} 
                value={tab.value}
              />
            ))}
          </Tabs>
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
              No players found with the selected filters.
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  )
}

export default RosterOverview
