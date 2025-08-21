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
  ListItemIcon
} from '@mui/material'
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
const injuryDatasets = {
  injuryTypes: {
    title: 'Injury types',
    description: 'Distribution of injuries by type and severity',
    data: [
      { name: 'Hamstring', count: 12, percentage: 24, severity: 'moderate', recoveryTime: '3-4 weeks' },
      { name: 'Ankle', count: 8, percentage: 16, severity: 'mild', recoveryTime: '1-2 weeks' },
      { name: 'Knee', count: 6, percentage: 12, severity: 'severe', recoveryTime: '6-8 weeks' },
      { name: 'Shoulder', count: 5, percentage: 10, severity: 'moderate', recoveryTime: '4-6 weeks' },
      { name: 'Concussion', count: 4, percentage: 8, severity: 'moderate', recoveryTime: '2-3 weeks' },
      { name: 'Back', count: 3, percentage: 6, severity: 'mild', recoveryTime: '1-2 weeks' }
    ],
    insight: "This month's hamstring injuries decreased by 15% compared to last month, indicating improved warm-up protocols."
  },
  injuryLocations: {
    title: 'Injury locations',
    description: 'Injuries by body location and frequency',
    data: [
      { name: 'Lower Body', count: 18, percentage: 36, severity: 'moderate', recoveryTime: '3-4 weeks' },
      { name: 'Upper Body', count: 12, percentage: 24, severity: 'mild', recoveryTime: '2-3 weeks' },
      { name: 'Head/Neck', count: 8, percentage: 16, severity: 'moderate', recoveryTime: '2-4 weeks' },
      { name: 'Core', count: 6, percentage: 12, severity: 'mild', recoveryTime: '1-2 weeks' },
      { name: 'Extremities', count: 4, percentage: 8, severity: 'severe', recoveryTime: '4-6 weeks' }
    ],
    insight: "Lower body injuries remain the most common, but prevention programs have reduced severity by 20%."
  },
  recoveryTimes: {
    title: 'Recovery times',
    description: 'Average recovery duration by injury category',
    data: [
      { name: '1-2 weeks', count: 15, percentage: 30, severity: 'mild', examples: 'Minor sprains, bruises' },
      { name: '3-4 weeks', count: 12, percentage: 24, severity: 'moderate', examples: 'Hamstring strains, minor fractures' },
      { name: '5-8 weeks', count: 8, percentage: 16, severity: 'moderate', examples: 'Torn ligaments, stress fractures' },
      { name: '9-12 weeks', count: 6, percentage: 12, severity: 'severe', examples: 'Major surgeries, complex fractures' },
      { name: '12+ weeks', count: 4, percentage: 8, severity: 'severe', examples: 'ACL reconstruction, major surgeries' }
    ],
    insight: "Average recovery time improved by 12% this month due to enhanced rehabilitation protocols."
  },
  injuryTrends: {
    title: 'Injury trends',
    description: 'Monthly injury patterns and trends',
    data: [
      { name: 'Jan', count: 8, percentage: 16, trend: 'decreasing', change: -15 },
      { name: 'Feb', count: 6, percentage: 12, trend: 'decreasing', change: -25 },
      { name: 'Mar', count: 10, percentage: 20, trend: 'increasing', change: 67 },
      { name: 'Apr', count: 7, percentage: 14, trend: 'decreasing', change: -30 },
      { name: 'May', count: 5, percentage: 10, trend: 'decreasing', change: -29 },
      { name: 'Jun', count: 9, percentage: 18, trend: 'increasing', change: 80 }
    ],
    insight: "Overall injury rate has decreased by 18% compared to the same period last year."
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
  const [timeRange, setTimeRange] = useState('last-season')
  const [rosterType, setRosterType] = useState('active-roster')
  const [selectedBar, setSelectedBar] = useState(null)
  const [detailPanelOpen, setDetailPanelOpen] = useState(false)
  const [lastUpdate, setLastUpdate] = useState(new Date())
  const [exportDialogOpen, setExportDialogOpen] = useState(false)

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
                  <LocalHospitalOutlined sx={{ fontSize: 32, color: 'primary.main', mr: 2 }} />
        <Typography variant="h4" sx={{ color: 'primary.main' }}>
          Injury review
        </Typography>
      </Box>

      {/* Auto-refresh indicator */}
      <Alert 
        icon={<RefreshOutlined />} 
        severity="info" 
        sx={{ mb: 3 }}
      >
        Data updated {getMinutesAgo()} minutes ago
      </Alert>

      {/* Filters */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth size="small">
            <InputLabel>Time Range</InputLabel>
            <Select
              value={timeRange}
              label="Time Range"
              onChange={(e) => setTimeRange(e.target.value)}
            >
              {timeRanges.map((range) => (
                <MenuItem key={range.value} value={range.value}>
                  {range.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth size="small">
            <InputLabel>Roster Type</InputLabel>
            <Select
              value={rosterType}
              label="Roster Type"
              onChange={(e) => setRosterType(e.target.value)}
            >
              {rosterTypes.map((type) => (
                <MenuItem key={type.value} value={type.value}>
                  {type.label}
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
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Tooltip title="Export data">
              <IconButton onClick={handleExport} size="small">
                <FileDownloadOutlined />
              </IconButton>
            </Tooltip>
            <Tooltip title="Share chart">
              <IconButton onClick={handleShare} size="small">
                <ShareOutlined />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
        
        <Box sx={{ height: 400 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={currentDataset.data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              onClick={handleBarClick}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                angle={-45}
                textAnchor="end"
                height={80}
                fontSize={12}
              />
              <YAxis fontSize={12} />
              <RechartsTooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="count" 
                fill="var(--color-primary)"
                radius={[4, 4, 0, 0]}
              >
                {currentDataset.data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`}
                    fill={selectedBar && selectedBar.index === index 
                      ? 'var(--color-secondary)' 
                      : entry.severity 
                        ? getSeverityColor(entry.severity)
                        : entry.trend
                          ? getTrendColor(entry.trend)
                          : 'var(--color-primary)'
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Paper>

      {/* AI Insights */}
              <Paper sx={{ p: 3, mb: 3, bgcolor: 'grey.50' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <AssessmentOutlined sx={{ color: 'primary.main', mr: 1 }} />
            <Typography variant="h6" sx={{ color: 'primary.main' }}>
              AI insights
            </Typography>
          </Box>
        <Typography variant="body1">
          {currentDataset.insight}
        </Typography>
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
