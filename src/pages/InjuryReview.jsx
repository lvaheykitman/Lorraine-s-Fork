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
import ShareDialog from '../components/ShareDialog'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Cell
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


// Mock data for different injury datasets
const exposureTypes = [
  { name: 'Training contact', color: '#e57373' },
  { name: 'Training no contact', color: '#81c784' },
  { name: 'Training other mechanisms', color: '#64b5f6' },
  { name: 'Games contact', color: '#ff8a65' },
  { name: 'Games no contact', color: '#4db6ac' },
  { name: 'Games other mechanisms', color: '#7986cb' }
]

const injuryDatasets = {
  injuryCounts: {
    title: 'Injury counts',
    description: 'Injuries by season and exposure type',
    data: [
      {
        name: '2020/21',
        'Training contact': 45,
        'Training no contact': 30,
        'Training other mechanisms': 15,
        'Games contact': 35,
        'Games no contact': 20,
        'Games other mechanisms': 10
      },
      {
        name: '2021/22',
        'Training contact': 38,
        'Training no contact': 25,
        'Training other mechanisms': 12,
        'Games contact': 30,
        'Games no contact': 15,
        'Games other mechanisms': 8
      },
      {
        name: '2022/23',
        'Training contact': 32,
        'Training no contact': 20,
        'Training other mechanisms': 10,
        'Games contact': 25,
        'Games no contact': 12,
        'Games other mechanisms': 6
      }
    ],
    insight: "Injury counts show a consistent decrease across all exposure types over the past three seasons."
  },
  injuryRates: {
    title: 'Injury rates',
    description: 'Injury rate by season and exposure type (per 100 hours)',
    data: [
      { name: '2020/21', rate: 8.5, exposure: 'Training' },
      { name: '2021/22', rate: 7.2, exposure: 'Training' },
      { name: '2022/23', rate: 6.1, exposure: 'Training' },
      { name: '2020/21', rate: 12.3, exposure: 'Games' },
      { name: '2021/22', rate: 10.8, exposure: 'Games' },
      { name: '2022/23', rate: 9.4, exposure: 'Games' }
    ],
    insight: "Game-related injury rates remain higher than training rates, but both show improving trends."
  },
  timeLossSum: {
    title: 'SUM of time loss',
    description: 'Total time-loss by season and exposure type',
    data: [
      { name: '2020/21', days: 450, exposure: 'Training contact' },
      { name: '2021/22', days: 380, exposure: 'Training contact' },
      { name: '2022/23', days: 320, exposure: 'Training contact' },
      { name: '2020/21', days: 300, exposure: 'Training no contact' },
      { name: '2021/22', days: 250, exposure: 'Training no contact' },
      { name: '2022/23', days: 200, exposure: 'Training no contact' },
      { name: '2020/21', days: 150, exposure: 'Training other mechanisms' },
      { name: '2021/22', days: 120, exposure: 'Training other mechanisms' },
      { name: '2022/23', days: 100, exposure: 'Training other mechanisms' },
      { name: '2020/21', days: 350, exposure: 'Games contact' },
      { name: '2021/22', days: 300, exposure: 'Games contact' },
      { name: '2022/23', days: 250, exposure: 'Games contact' },
      { name: '2020/21', days: 200, exposure: 'Games no contact' },
      { name: '2021/22', days: 150, exposure: 'Games no contact' },
      { name: '2022/23', days: 120, exposure: 'Games no contact' },
      { name: '2020/21', days: 100, exposure: 'Games other mechanisms' },
      { name: '2021/22', days: 80, exposure: 'Games other mechanisms' },
      { name: '2022/23', days: 60, exposure: 'Games other mechanisms' }
    ],
    insight: "Contact injuries during training and games contribute to the highest time loss, but showing improvement year over year."
  },
  timeLossRates: {
    title: 'Time loss rates',
    description: 'Injury burden by season and exposure type',
    data: [
      { name: '2020/21', rate: 15.2, exposure: 'Training' },
      { name: '2021/22', rate: 12.8, exposure: 'Training' },
      { name: '2022/23', rate: 10.5, exposure: 'Training' },
      { name: '2020/21', rate: 22.4, exposure: 'Games' },
      { name: '2021/22', rate: 19.6, exposure: 'Games' },
      { name: '2022/23', rate: 16.8, exposure: 'Games' }
    ],
    insight: "Time loss rates are decreasing for both training and game exposures, indicating improved injury management."
  }
}

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
  const [shareOpen, setShareOpen] = useState(false)

  const datasetKeys = Object.keys(injuryDatasets)
  const currentDataset = injuryDatasets[datasetKeys[activeTab]]

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

  const handleShare = () => setShareOpen(true)

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
      return (
        <Paper sx={{ p: 2, border: '1px solid', borderColor: 'divider' }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
            Season: {label}
          </Typography>
          {payload.map((entry, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
              <Box sx={{ 
                width: 12, 
                height: 12, 
                bgcolor: entry.color,
                borderRadius: '2px'
              }} />
              <Typography variant="body2" color="text.secondary">
                {entry.name}: {entry.value}
              </Typography>
            </Box>
          ))}
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1, pt: 1, borderTop: '1px solid', borderColor: 'divider' }}>
            Total: {payload.reduce((sum, entry) => sum + entry.value, 0)}
          </Typography>
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
      <ShareDialog
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        itemName={`${currentDataset.title} chart`}
        owner="You"
      />

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
          {datasetKeys.map((key, index) => (
            <Tab 
              key={key} 
              label={injuryDatasets[key].title} 
              sx={{ textTransform: 'none' }}
            />
          ))}
        </Tabs>
      </Paper>

      {/* Chart Section */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box>
            <Typography variant="h6" gutterBottom>
              {currentDataset.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {currentDataset.description}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
              <InfoOutlined sx={{ fontSize: 14, verticalAlign: 'middle', mr: 0.5 }} />
              Hover on bars for detailed breakdown
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
        
        <Box sx={{ height: 400 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={currentDataset.data}
              margin={{ top: 20, right: 30, left: 50, bottom: 70 }}
              onClick={handleBarClick}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                label={{ 
                  value: 'No. of seasons',
                  position: 'bottom',
                  offset: 40
                }}
              />
              <YAxis 
                label={{ 
                  value: 'No. of injuries',
                  angle: -90,
                  position: 'insideLeft',
                  offset: -40
                }}
              />
              <RechartsTooltip content={<CustomTooltip />} />
              <Legend 
                verticalAlign="bottom" 
                height={60}
                wrapperStyle={{
                  paddingTop: '20px',
                  borderTop: '1px solid #eee'
                }}
              />
              {exposureTypes.map((type, index) => (
                <Bar
                  key={type.name}
                  dataKey={type.name}
                  stackId="a"
                  fill={type.color}
                  name={type.name}
                />
              ))}
            </BarChart>
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
