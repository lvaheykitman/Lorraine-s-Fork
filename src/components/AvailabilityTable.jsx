import React, { useState } from 'react'
import {
  Box,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Tooltip
} from '@mui/material'
import {
  GridView as GridViewIcon,
  ViewList as ViewListIcon,
  Search as SearchIcon
} from '@mui/icons-material'

// Group positions
const positionGroups = {
  'Goalkeeper': ['Goalkeeper'],
  'Defence': ['Defender', 'Center Back', 'Full Back'],
  'Midfield': ['Midfielder', 'Defensive Mid', 'Attacking Mid'],
  'Attack': ['Forward', 'Striker', 'Winger']
}

const AvailabilityTable = ({ athletes }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSquad, setSelectedSquad] = useState('all')
  const [selectedPosition, setSelectedPosition] = useState('all')
  const [viewMode, setViewMode] = useState('grid')

  // Get unique squads from athletes
  const squads = ['all', ...new Set(athletes.map(a => a.squad_name))]
  
  // Get unique positions from athletes
  const positions = ['all', ...new Set(athletes.map(a => a.position))]

  // Filter athletes based on search and filters
  const filteredAthletes = athletes.filter(athlete => {
    const matchesSearch = 
      athlete.firstname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      athlete.lastname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      athlete.position.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesSquad = selectedSquad === 'all' || athlete.squad_name === selectedSquad
    const matchesPosition = selectedPosition === 'all' || athlete.position === selectedPosition

    return matchesSearch && matchesSquad && matchesPosition
  })

  // Group athletes by position group for the ladder view
  const groupedAthletes = {}
  Object.keys(positionGroups).forEach(group => {
    groupedAthletes[group] = filteredAthletes.filter(athlete => 
      positionGroups[group].includes(athlete.position)
    )
  })

  const getAvailabilityColor = (status) => {
    switch (status.toLowerCase()) {
      case 'available': return 'success'
      case 'injured': return 'error'
      case 'doubtful': return 'warning'
      default: return 'default'
    }
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        Availability Table
      </Typography>

      {/* Search and Filters */}
      <Box sx={{ mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          {/* Search */}
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search athletes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
              }}
            />
          </Grid>

          {/* Squad Filter */}
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Squad</InputLabel>
              <Select
                value={selectedSquad}
                label="Squad"
                onChange={(e) => setSelectedSquad(e.target.value)}
              >
                {squads.map((squad) => (
                  <MenuItem key={squad} value={squad}>
                    {squad === 'all' ? 'All Squads' : squad}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Position Filter */}
          <Grid item xs={12} sm={3}>
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

          {/* View Toggle */}
          <Grid item xs={12} sm={2}>
            <ToggleButtonGroup
              value={viewMode}
              exclusive
              onChange={(e, newValue) => newValue && setViewMode(newValue)}
              size="small"
              sx={{ width: '100%' }}
            >
              <ToggleButton value="grid" sx={{ width: '50%' }}>
                <Tooltip title="Grid View">
                  <GridViewIcon />
                </Tooltip>
              </ToggleButton>
              <ToggleButton value="ladder" sx={{ width: '50%' }}>
                <Tooltip title="Ladder View">
                  <ViewListIcon />
                </Tooltip>
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
        </Grid>
      </Box>

      {/* Grid View */}
      {viewMode === 'grid' && (
        <Grid container spacing={2}>
          {filteredAthletes.map((athlete) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={athlete.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h6">
                      {athlete.firstname} {athlete.lastname}
                    </Typography>
                    <Chip
                      label={athlete.availability_status}
                      color={getAvailabilityColor(athlete.availability_status)}
                      size="small"
                    />
                  </Box>
                  <Typography color="textSecondary" gutterBottom>
                    {athlete.position}
                  </Typography>
                  <Typography variant="body2">
                    Squad: {athlete.squad_name}
                  </Typography>
                  {athlete.injury_status !== 'Healthy' && (
                    <Typography variant="body2" color="error">
                      {athlete.injury_status}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Ladder View */}
      {viewMode === 'ladder' && (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Position Group</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Position</TableCell>
                <TableCell>Squad</TableCell>
                <TableCell>Availability</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(groupedAthletes).map(([group, athletes]) => (
                <React.Fragment key={group}>
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      sx={{ 
                        bgcolor: 'grey.100',
                        fontWeight: 'bold'
                      }}
                    >
                      {group}
                    </TableCell>
                  </TableRow>
                  {athletes.map((athlete) => (
                    <TableRow key={athlete.id}>
                      <TableCell></TableCell>
                      <TableCell>{athlete.firstname} {athlete.lastname}</TableCell>
                      <TableCell>{athlete.position}</TableCell>
                      <TableCell>{athlete.squad_name}</TableCell>
                      <TableCell>
                        <Chip
                          label={athlete.availability_status}
                          color={getAvailabilityColor(athlete.availability_status)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        {athlete.injury_status !== 'Healthy' ? (
                          <Typography variant="body2" color="error">
                            {athlete.injury_status}
                          </Typography>
                        ) : (
                          'Healthy'
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  )
}

export default AvailabilityTable
