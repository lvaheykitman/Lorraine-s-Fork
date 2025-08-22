import React, { useState } from 'react'
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
  Avatar,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Button,
  IconButton
} from '@mui/material'
import {
  Search as SearchIcon,
  FitnessCenter as TrainingIcon,
  Timeline as SkillIcon,
  PlayCircleOutline as PlayIcon,
  Person as PersonIcon,
  Groups as SquadsIcon,
  TrendingUp as TrendingUpIcon,
  Height as HeightIcon,
  Scale as WeightIcon,
  Cake as AgeIcon,
  Share as ShareIcon,
  Download as DownloadIcon
} from '@mui/icons-material'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

// Mock data for a player
const playerData = {
  id: 'PL123456',
  name: 'Marcus Johnson',
  avatar: null,
  age: 24,
  height: '6\'2"',
  weight: '185 lbs',
  skills: [
    { name: 'Drills', progress: 85, status: 'improving' },
    { name: 'Crossing', progress: 72, status: 'stable' },
    { name: 'Match Results', progress: 90, status: 'improving' },
    { name: 'Measurements', progress: 65, status: 'needs_work' }
  ],
  performanceData: [
    { date: '2024-01', player: 75, team: 70 },
    { date: '2024-02', player: 78, team: 71 },
    { date: '2024-03', player: 82, team: 72 },
    { date: '2024-04', player: 85, team: 73 },
    { date: '2024-05', player: 88, team: 74 }
  ],
  skillData: [
    { date: '2024-01-01', crossing: 65, dribbling: 70, overall: 68 },
    { date: '2024-02-01', crossing: 68, dribbling: 72, overall: 70 },
    { date: '2024-03-01', crossing: 72, dribbling: 75, overall: 74 },
    { date: '2024-04-01', crossing: 75, dribbling: 78, overall: 77 },
    { date: '2024-05-01', crossing: 78, dribbling: 80, overall: 79 }
  ],
  trainingClips: [
    { id: 1, title: 'Morning Practice - Crossing Drills', date: '2024-05-01', duration: '2:30' },
    { id: 2, title: 'Match Highlights vs. Eagles', date: '2024-04-28', duration: '5:45' },
    { id: 3, title: 'Speed Training Session', date: '2024-04-25', duration: '3:15' }
  ]
}

const getSkillStatusColor = (status) => {
  switch (status) {
    case 'improving': return 'success'
    case 'stable': return 'info'
    case 'needs_work': return 'warning'
    default: return 'default'
  }
}

function TrainingDevelopment() {
  const [viewMode, setViewMode] = useState('squads')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSkillTab, setSelectedSkillTab] = useState('all')
  const [showPlayerOverview, setShowPlayerOverview] = useState(false)

  const handleSearch = (event) => {
    setSearchQuery(event.target.value)
  }

  const handleViewChange = (event, newValue) => {
    setViewMode(newValue)
  }

  const handleSkillTabChange = (event, newValue) => {
    setSelectedSkillTab(newValue)
  }

  const handlePlayerClick = () => {
    setShowPlayerOverview(true)
  }

  if (!showPlayerOverview) {
    return (
      <Box sx={{ p: 3 }}>
        {/* Search and View Toggle */}
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            placeholder="Search squads or players..."
            variant="outlined"
            value={searchQuery}
            onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
            sx={{ mb: 2 }}
          />
          <Tabs value={viewMode} onChange={handleViewChange}>
            <Tab 
              icon={<SquadsIcon />} 
              label="Squads" 
              value="squads"
              sx={{ textTransform: 'none' }}
            />
            <Tab 
              icon={<PersonIcon />} 
              label="Individual Players" 
              value="players"
              sx={{ textTransform: 'none' }}
            />
          </Tabs>
        </Box>

        {/* Example player card that can be clicked */}
        <Card sx={{ cursor: 'pointer' }} onClick={handlePlayerClick}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ width: 56, height: 56 }}>MJ</Avatar>
              <Box>
                <Typography variant="h6">{playerData.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  ID: {playerData.id}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    )
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Player Banner */}
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #1a237e 0%, #534bae 100%)' }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <Avatar sx={{ width: 100, height: 100 }}>
              {playerData.name.split(' ').map(n => n[0]).join('')}
            </Avatar>
          </Grid>
          <Grid item xs>
            <Typography variant="h4" sx={{ color: 'white' }}>
              {playerData.name}
            </Typography>
            <Typography variant="subtitle1" sx={{ color: 'rgba(255,255,255,0.8)' }}>
              ID: {playerData.id}
            </Typography>
          </Grid>
          <Grid item xs={12} md="auto">
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <AgeIcon color="primary" />
                      <Box>
                        <Typography variant="h6">{playerData.age}</Typography>
                        <Typography variant="body2" color="text.secondary">Age</Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={4}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <HeightIcon color="primary" />
                      <Box>
                        <Typography variant="h6">{playerData.height}</Typography>
                        <Typography variant="body2" color="text.secondary">Height</Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={4}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <WeightIcon color="primary" />
                      <Box>
                        <Typography variant="h6">{playerData.weight}</Typography>
                        <Typography variant="body2" color="text.secondary">Weight</Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>

      {/* Skills Summary */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Skills in Development
            </Typography>
            <List>
              {playerData.skills.map((skill) => (
                <ListItem key={skill.name}>
                  <ListItemIcon>
                    <SkillIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={skill.name}
                    secondary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography
                          variant="body2"
                          component="span"
                          color="text.secondary"
                        >
                          Progress: {skill.progress}%
                        </Typography>
                        <Chip
                          label={skill.status}
                          size="small"
                          color={getSkillStatusColor(skill.status)}
                        />
                      </Box>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Performance vs Team Average</Typography>
              <Box>
                <IconButton size="small">
                  <ShareIcon />
                </IconButton>
                <IconButton size="small">
                  <DownloadIcon />
                </IconButton>
              </Box>
            </Box>
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={playerData.performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="player"
                    name="Player Performance"
                    stroke="#8884d8"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="team"
                    name="Team Average"
                    stroke="#82ca9d"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Skill Detail */}
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Skill Progress
        </Typography>
        <Tabs value={selectedSkillTab} onChange={handleSkillTabChange} sx={{ mb: 2 }}>
          <Tab label="All Skills" value="all" />
          <Tab label="Crossing" value="crossing" />
          <Tab label="Dribbling" value="dribbling" />
        </Tabs>
        <Box sx={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={playerData.skillData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              {selectedSkillTab === 'all' && (
                <Line
                  type="monotone"
                  dataKey="overall"
                  name="Overall"
                  stroke="#8884d8"
                  strokeWidth={2}
                />
              )}
              {(selectedSkillTab === 'all' || selectedSkillTab === 'crossing') && (
                <Line
                  type="monotone"
                  dataKey="crossing"
                  name="Crossing"
                  stroke="#82ca9d"
                  strokeWidth={2}
                />
              )}
              {(selectedSkillTab === 'all' || selectedSkillTab === 'dribbling') && (
                <Line
                  type="monotone"
                  dataKey="dribbling"
                  name="Dribbling"
                  stroke="#ffc658"
                  strokeWidth={2}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </Box>
        <Box sx={{ mt: 2, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TrendingUpIcon color="success" />
            <Typography>
              Marcus's training has improved 15% this month.
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Training Clips */}
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Session Clips
        </Typography>
        <Grid container spacing={2}>
          {playerData.trainingClips.map((clip) => (
            <Grid item xs={12} md={4} key={clip.id}>
              <Card>
                <Box
                  sx={{
                    height: 200,
                    bgcolor: 'grey.200',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <PlayIcon sx={{ fontSize: 48, color: 'grey.400' }} />
                </Box>
                <CardContent>
                  <Typography variant="subtitle1">{clip.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {clip.date} • {clip.duration}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  )
}

export default TrainingDevelopment