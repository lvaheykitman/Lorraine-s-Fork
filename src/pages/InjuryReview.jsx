import React, { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Paper,
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Button,
  Alert,
  Divider,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  ListItemButton
} from '@mui/material'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Cell,
  Legend
} from 'recharts'
import {
  LocalHospitalOutlined,
  TrendingUpOutlined,
  TrendingDownOutlined,
  RefreshOutlined,
  FileDownloadOutlined,
  ShareOutlined,
  InfoOutlined,
  CalendarTodayOutlined,
  PeopleOutlined,
  AssessmentOutlined
} from '@mui/icons-material'


// Seasons and exposure types
const seasons = ['2021', '2022', '2023', '2024']
const exposureDetailed = [
  { key: 'training_contact', label: 'Training contact', color: '#B71C1C' },
  { key: 'training_no_contact', label: 'Training no contact', color: '#D32F2F' },
  { key: 'training_other', label: 'Training other mechanisms', color: '#E57373' },
  { key: 'games_contact', label: 'Games contact', color: '#0D47A1' },
  { key: 'games_no_contact', label: 'Games no contact', color: '#1976D2' },
  { key: 'games_other', label: 'Games other mechanisms', color: '#64B5F6' }
]
const exposureSimple = [
  { key: 'training', label: 'Training', color: '#D32F2F' },
  { key: 'games', label: 'Games', color: '#1976D2' }
]

// Mock chart data per spec
const buildCountsData = () => seasons.map((season, i) => ({
  season,
  training_contact: 20 + i * 2,
  training_no_contact: 12 + i,
  training_other: 8 + i,
  games_contact: 26 + i * 3,
  games_no_contact: 10 + i,
  games_other: 6 + i
}))

const buildRateData = () => seasons.map((season, i) => ({
  season,
  training: 7 + i * 0.8, // injuries per 100 hours
  games: 11 + i * 0.6
}))

const buildTimeLossData = () => seasons.map((season, i) => ({
  season,
  training_contact: 120 + i * 10,
  training_no_contact: 80 + i * 6,
  training_other: 60 + i * 4,
  games_contact: 160 + i * 12,
  games_no_contact: 70 + i * 5,
  games_other: 50 + i * 3
}))

const buildBurdenData = () => seasons.map((season, i) => ({
  season,
  training: 140 + i * 9, // total time-loss measure
  games: 180 + i * 11
}))

const chartConfigs = [
  {
    key: 'injuryCounts',
    title: 'Injury counts',
    description: 'Injuries by season and exposure type',
    layout: 'verticalBars',
    xAxisLabel: 'Seasons',
    yAxisLabel: 'Number of injuries',
    data: buildCountsData(),
    series: exposureDetailed,
    stacked: true
  },
  {
    key: 'injuryRates',
    title: 'Injury rates',
    description: 'Injury rate per 100 hours by season and exposure type',
    layout: 'verticalBars',
    xAxisLabel: 'Seasons',
    yAxisLabel: 'Injuries per 100 hours',
    data: buildRateData(),
    series: exposureSimple,
    stacked: false
  },
  {
    key: 'timeLossSum',
    title: 'Time-loss total',
    description: 'Total time-loss by season and exposure type',
    layout: 'horizontalBars',
    xAxisLabel: 'Total time-loss',
    yAxisLabel: 'Seasons',
    data: buildTimeLossData(),
    series: exposureDetailed,
    stacked: true
  },
  {
    key: 'timeLossRates',
    title: 'Time-loss rates',
    description: 'Injury burden by season and exposure type',
    layout: 'horizontalBars',
    xAxisLabel: 'Total time-loss',
    yAxisLabel: 'Seasons',
    data: buildBurdenData(),
    series: exposureSimple,
    stacked: false
  }
]

// Time range options
const timeRanges = [
  { value: 'last-season', label: 'Last season' },
  { value: 'last-3-seasons', label: 'Last 3 seasons' },
  { value: 'isolate-season', label: 'Isolate season' }
]

// Roster type options
const rosterTypes = [
  { value: 'active-roster', label: 'Active roster' },
  { value: 'practice-squad', label: 'Practice squad' },
  { value: 'injured-reserve', label: 'Injured reserve' }
]

function InjuryReview() {
  const [activeTab, setActiveTab] = useState(0)
  const [selectedTimeRanges, setSelectedTimeRanges] = useState(['last-season'])
  const [selectedRosterTypes, setSelectedRosterTypes] = useState(['active-roster'])
  const [selectedBar, setSelectedBar] = useState(null)
  const [detailPanelOpen, setDetailPanelOpen] = useState(false)
  const [lastUpdate, setLastUpdate] = useState(new Date())
  const [exportDialogOpen, setExportDialogOpen] = useState(false)

  const currentChart = chartConfigs[activeTab]

  // Auto-refresh simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date())
    }, 300000) // Update every 5 minutes

    return () => clearInterval(interval)
  }, [])

  const getMinutesAgo = () => {
    const now = new Date()
    const diffMs = now - lastUpdate
    const diffMins = Math.floor(diffMs / 60000)
    return diffMins
  }

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
    setSelectedBar(null)
  }

  const handleBarClick = (data, index) => {
    setSelectedBar({ data, index })
    setDetailPanelOpen(true)
  }

  const handleCloseDetailPanel = () => {
    setDetailPanelOpen(false)
    setSelectedBar(null)
  }

  const handleExport = () => {
    setExportDialogOpen(true)
  }

  const handleShare = () => {
    // In a real app, this would open a share dialog
    navigator.clipboard.writeText(window.location.href)
    alert('Link copied to clipboard!')
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'mild': return '#28a745'
      case 'moderate': return '#ffc107'
      case 'severe': return '#dc3545'
      default: return '#6c757d'
    }
  }

  const getTrendColor = (trend) => {
    return trend === 'increasing' ? '#dc3545' : '#28a745'
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <Paper sx={{ p: 2, border: '1px solid', borderColor: 'divider' }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
            {label}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Count: {data.count}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Percentage: {data.percentage}%
          </Typography>
          {data.severity && (
            <Typography variant="body2" color="text.secondary">
              Severity: {data.severity}
            </Typography>
          )}
          {data.recoveryTime && (
            <Typography variant="body2" color="text.secondary">
              Recovery: {data.recoveryTime}
            </Typography>
          )}
          {data.examples && (
            <Typography variant="body2" color="text.secondary">
              Examples: {data.examples}
            </Typography>
          )}
          {data.change && (
            <Typography 
              variant="body2" 
                          sx={{ 
              color: data.change > 0 ? 'error.main' : 'success.main',
              fontWeight: 600
            }}
            >
              Change: {data.change > 0 ? '+' : ''}{data.change}%
            </Typography>
          )}
        </Paper>
      )
    }
    return null
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Page Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ color: 'primary.main' }}>
          Injury review
        </Typography>
      </Box>

      {/* AI Insights */}
      <Paper sx={{ p: 3, mb: 3, bgcolor: 'grey.50' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AssessmentOutlined sx={{ color: 'primary.main', mr: 1 }} />
            <Typography variant="h6" sx={{ color: 'primary.main' }}>
              AI insights
            </Typography>
          </Box>
          <Typography variant="caption" color="text.secondary">
            Updated {getMinutesAgo()} minutes ago
          </Typography>
        </Box>
        <Typography variant="body1">
          {currentDataset.insight}
        </Typography>
      </Paper>

      {/* Filters */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth size="small">
            <InputLabel>Time Range</InputLabel>
            <Select
              multiple
              value={selectedTimeRanges}
              label="Time Range"
              onChange={(e) => setSelectedTimeRanges(e.target.value)}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip
                      key={value}
                      label={timeRanges.find(range => range.value === value)?.label}
                      size="small"
                    />
                  ))}
                </Box>
              )}
            >
              {timeRanges.map((range) => (
                <MenuItem key={range.value} value={range.value}>
                  <Checkbox checked={selectedTimeRanges.indexOf(range.value) > -1} />
                  <ListItemText primary={range.label} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth size="small">
            <InputLabel>Roster Type</InputLabel>
            <Select
              multiple
              value={selectedRosterTypes}
              label="Roster Type"
              onChange={(e) => setSelectedRosterTypes(e.target.value)}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip
                      key={value}
                      label={rosterTypes.find(type => type.value === value)?.label}
                      size="small"
                    />
                  ))}
                </Box>
              )}
            >
              {rosterTypes.map((type) => (
                <MenuItem key={type.value} value={type.value}>
                  <Checkbox checked={selectedRosterTypes.indexOf(type.value) > -1} />
                  <ListItemText primary={type.label} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          {chartConfigs.map((cfg) => (
            <Tab key={cfg.key} label={cfg.title} sx={{ textTransform: 'none' }} />
          ))}
        </Tabs>
      </Paper>

      {/* Chart Section */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box>
            <Typography variant="h6" gutterBottom>
              {currentChart.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {currentChart.description}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<FileDownloadOutlined />}
              onClick={handleExport}
              sx={{ 
                color: 'grey.700',
                borderColor: 'grey.300',
                '&:hover': {
                  borderColor: 'grey.400',
                  bgcolor: 'grey.50'
                }
              }}
            >
              Export
            </Button>
            <Button
              variant="outlined"
              size="small"
              startIcon={<ShareOutlined />}
              onClick={handleShare}
              sx={{ 
                color: 'grey.700',
                borderColor: 'grey.300',
                '&:hover': {
                  borderColor: 'grey.400',
                  bgcolor: 'grey.50'
                }
              }}
            >
              Share
            </Button>
          </Box>
        </Box>
        
        <Box sx={{ height: 420 }}>
          <ResponsiveContainer width="100%" height="100%">
            {currentChart.layout === 'verticalBars' ? (
              <BarChart data={currentChart.data} margin={{ top: 10, right: 30, left: 10, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="season" label={{ value: currentChart.xAxisLabel, position: 'insideBottom', offset: -10 }} />
                <YAxis label={{ value: currentChart.yAxisLabel, angle: -90, position: 'insideLeft' }} />
                <RechartsTooltip />
                <Legend />
                {currentChart.series.map((s) => (
                  <Bar key={s.key} dataKey={s.key} name={s.label} fill={s.color} stackId={currentChart.stacked ? 'a' : undefined} radius={[4, 4, 0, 0]} />
                ))}
              </BarChart>
            ) : (
              <BarChart data={currentChart.data} layout="vertical" margin={{ top: 10, right: 30, left: 10, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" label={{ value: currentChart.xAxisLabel, position: 'insideBottom', offset: -10 }} />
                <YAxis type="category" dataKey="season" width={70} label={{ value: currentChart.yAxisLabel, angle: -90, position: 'insideLeft' }} />
                <RechartsTooltip />
                <Legend />
                {currentChart.series.map((s) => (
                  <Bar key={s.key} dataKey={s.key} name={s.label} fill={s.color} stackId={currentChart.stacked ? 'a' : undefined} radius={[0, 4, 4, 0]} />
                ))}
              </BarChart>
            )}
          </ResponsiveContainer>
        </Box>
      </Paper>



      {/* Detail Panel Dialog */}
      <Dialog 
        open={detailPanelOpen} 
        onClose={handleCloseDetailPanel}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <InfoOutlined sx={{ mr: 1 }} />
            {selectedBar?.data?.name} - Detailed Information
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedBar && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Statistics
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon>
                      <PeopleOutlined />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Count" 
                      secondary={selectedBar.data.count} 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <TrendingUpOutlined />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Percentage" 
                      secondary={`${selectedBar.data.percentage}%`} 
                    />
                  </ListItem>
                  {selectedBar.data.severity && (
                    <ListItem>
                      <ListItemIcon>
                        <LocalHospitalOutlined />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Severity" 
                        secondary={selectedBar.data.severity} 
                      />
                    </ListItem>
                  )}
                  {selectedBar.data.recoveryTime && (
                    <ListItem>
                      <ListItemIcon>
                        <CalendarTodayOutlined />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Recovery Time" 
                        secondary={selectedBar.data.recoveryTime} 
                      />
                    </ListItem>
                  )}
                </List>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Additional Details
                </Typography>
                {selectedBar.data.examples && (
                  <Typography variant="body2" color="text.secondary" paragraph>
                    <strong>Examples:</strong> {selectedBar.data.examples}
                  </Typography>
                )}
                {selectedBar.data.change && (
                  <Typography variant="body2" color="text.secondary" paragraph>
                    <strong>Trend:</strong> {selectedBar.data.change > 0 ? '+' : ''}{selectedBar.data.change}% from previous period
                  </Typography>
                )}
                <Typography variant="body2" color="text.secondary">
                  This data represents injuries within the selected time range and roster type.
                </Typography>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetailPanel}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Export Dialog */}
      <Dialog 
        open={exportDialogOpen} 
        onClose={() => setExportDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Export Data</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" paragraph>
            Choose export format for "{currentDataset.title}" data:
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button variant="outlined" startIcon={<FileDownloadOutlined />}>
              Export as CSV
            </Button>
            <Button variant="outlined" startIcon={<FileDownloadOutlined />}>
              Export as PDF
            </Button>
            <Button variant="outlined" startIcon={<FileDownloadOutlined />}>
              Export as Excel
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setExportDialogOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default InjuryReview
