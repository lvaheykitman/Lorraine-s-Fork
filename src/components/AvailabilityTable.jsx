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
  TablePagination,
  Chip,
  IconButton,
  Tooltip,
  Avatar
} from '@mui/material'
import {
  GridView as GridViewIcon,
  ViewList as ViewListIcon,
  Search as SearchIcon,
  Print as PrintIcon
} from '@mui/icons-material'
import PrintConfiguration from './PrintConfiguration'

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
  const [viewMode, setViewMode] = useState('ladder')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [showPrintConfig, setShowPrintConfig] = useState(false)

  // Get unique squads from athletes
  const squads = ['all', ...new Set(athletes.map(a => a.squad_name))]
  
  // Get unique positions from athletes
  const positions = ['all', ...new Set(athletes.map(a => a.position))]

  // Add sample athletes and then filter
  const enrichedAthletes = addSampleAthletes(athletes)
  const filteredAthletes = enrichedAthletes.filter(athlete => {
    const matchesSearch = 
      athlete.firstname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      athlete.lastname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      athlete.position.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesSquad = selectedSquad === 'all' || athlete.squad_name === selectedSquad
    const matchesPosition = selectedPosition === 'all' || athlete.position === selectedPosition

    return matchesSearch && matchesSquad && matchesPosition
  })

  // Handle pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  // Group athletes by position group for the ladder view
  const groupedAthletes = {}
  Object.keys(positionGroups).forEach(group => {
    const athletesInGroup = filteredAthletes.filter(athlete => 
      positionGroups[group].includes(athlete.position)
    )
    groupedAthletes[group] = athletesInGroup.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    )
  })

  const getAvailabilityColor = (status) => {
    switch (status.toLowerCase()) {
      case 'available': return 'success'
      case 'questionable': return 'warning'
      case 'doubtful': return 'warning'
      case 'injured': return 'error'
      case 'out': return 'error'
      case 'suspended': return 'error'
      case 'illness': return 'error'
      default: return 'default'
    }
  }

  // Add more sample athletes to each position group
  const addSampleAthletes = (athletes) => {
    const sampleStatuses = ['available', 'questionable', 'doubtful', 'injured', 'out', 'suspended', 'illness']
    const sampleNames = [
      'John Smith', 'Mike Johnson', 'David Brown', 'James Wilson',
      'Robert Taylor', 'Michael Davis', 'William Anderson', 'Joseph Martin',
      'Thomas Moore', 'Christopher Lee', 'Daniel White', 'Matthew Hall'
    ]
    
    const result = [...athletes]
    let nameIndex = 0

    Object.keys(positionGroups).forEach(group => {
      const athletesInGroup = result.filter(a => 
        positionGroups[group].includes(a.position)
      )

      // Add more athletes if needed
      while (athletesInGroup.length < 10) {
        const [firstName, lastName] = sampleNames[nameIndex].split(' ')
        result.push({
          id: `sample-${nameIndex}`,
          firstname: firstName,
          lastname: lastName,
          position: positionGroups[group][0],
          squad_name: 'First Team',
          availability_status: sampleStatuses[Math.floor(Math.random() * sampleStatuses.length)],
          avatar: null
        })
        nameIndex = (nameIndex + 1) % sampleNames.length
      }
    })

    return result
  }

  const getAvailabilityChip = (athlete) => {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Chip
          label={`${athlete.firstname} ${athlete.lastname}`}
          color={getAvailabilityColor(athlete.availability_status)}
          size="small"
          sx={{ minWidth: 120 }}
        />
      </Box>
    )
  }

  if (showPrintConfig) {
    return <PrintConfiguration onBack={() => setShowPrintConfig(false)} athletes={filteredAthletes} />
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

          {/* Print Button */}
          <Grid item xs={12} sm={2}>
            <Button
              variant="outlined"
              startIcon={<PrintIcon />}
              onClick={() => setShowPrintConfig(true)}
              sx={{ width: '100%', height: '100%' }}
            >
              Print
            </Button>
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
        <>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {Object.keys(positionGroups).map((group) => (
                    <TableCell key={group} sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                      {group}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  {Object.entries(groupedAthletes).map(([group, athletes]) => (
                    <TableCell key={group} sx={{ verticalAlign: 'top' }}>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        {athletes.map((athlete) => getAvailabilityChip(athlete))}
                      </Box>
                    </TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          {/* Availability Legend */}
          <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Chip size="small" color="success" label="Available" />
              <Typography variant="body2">Available</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Chip size="small" color="error" label="Unavailable" />
              <Typography variant="body2">Unavailable</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Chip size="small" color="warning" label="Injured" />
              <Typography variant="body2">Injured</Typography>
            </Box>
          </Box>

          {/* Pagination */}
          <TablePagination
            component="div"
            count={filteredAthletes.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25, 50]}
            sx={{ mt: 2 }}
          />
        </>
      )}
    </Paper>
  )
}

export default AvailabilityTable

