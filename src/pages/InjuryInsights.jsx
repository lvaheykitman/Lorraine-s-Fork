import React, { useState, useEffect } from 'react'
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Alert,
  Grid,
  Card,
  CardContent,
  Divider
} from '@mui/material'
import { BarChart } from '@mui/x-charts/BarChart'
import { 
  TrendingUp, 
  TrendingDown, 
  AccessTime,
  Refresh
} from '@mui/icons-material'

// Mock data for the 4 bar charts
const injuryData = {
  injuryCounts: {
    title: "Injury Counts by Season and Exposure Type",
    description: "Number of injuries by season and exposure type",
    data: [
      {
        season: "2021-22",
        "Training Contact": 12,
        "Training No Contact": 8,
        "Training Other": 5,
        "Games Contact": 18,
        "Games No Contact": 6,
        "Games Other": 3
      },
      {
        season: "2022-23",
        "Training Contact": 15,
        "Training No Contact": 10,
        "Training Other": 7,
        "Games Contact": 22,
        "Games No Contact": 8,
        "Games Other": 4
      },
      {
        season: "2023-24",
        "Training Contact": 9,
        "Training No Contact": 6,
        "Training Other": 4,
        "Games Contact": 16,
        "Games No Contact": 5,
        "Games Other": 2
      }
    ]
  },
  injuryRates: {
    title: "Injury Rates (per 100 hours)",
    description: "Injury rate by season and exposure type",
    data: [
      {
        season: "2021-22",
        "Training": 2.4,
        "Games": 4.8
      },
      {
        season: "2022-23",
        "Training": 3.1,
        "Games": 5.2
      },
      {
        season: "2023-24",
        "Training": 1.9,
        "Games": 4.1
      }
    ]
  },
  timeLoss: {
    title: "Total Time Loss by Season and Exposure Type",
    description: "Sum of time loss (days) by season and exposure type",
    data: [
      {
        season: "2021-22",
        "Training Contact": 180,
        "Training No Contact": 120,
        "Training Other": 75,
        "Games Contact": 270,
        "Games No Contact": 90,
        "Games Other": 45
      },
      {
        season: "2022-23",
        "Training Contact": 225,
        "Training No Contact": 150,
        "Training Other": 105,
        "Games Contact": 330,
        "Games No Contact": 120,
        "Games Other": 60
      },
      {
        season: "2023-24",
        "Training Contact": 135,
        "Training No Contact": 90,
        "Training Other": 60,
        "Games Contact": 240,
        "Games No Contact": 75,
        "Games Other": 30
      }
    ]
  },
  timeLossRates: {
    title: "Time Loss Rates (days per 100 hours)",
    description: "Injury burden by season and exposure type",
    data: [
      {
        season: "2021-22",
        "Training": 36.0,
        "Games": 72.0
      },
      {
        season: "2022-23",
        "Training": 46.5,
        "Games": 78.0
      },
      {
        season: "2023-24",
        "Training": 28.5,
        "Games": 61.5
      }
    ]
  }
}

// Time range options
const timeRanges = [
  { value: '1m', label: 'Last Month' },
  { value: '3m', label: 'Last 3 Months' },
  { value: '1y', label: 'Last Year' }
]

function InjuryInsights() {
  const [activeTab, setActiveTab] = useState(0)
  const [timeRange, setTimeRange] = useState('1y')
  const [selectedBar, setSelectedBar] = useState(null)
  const [lastUpdate, setLastUpdate] = useState(new Date())

  // Auto-refresh simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date())
    }, 300000) // Update every 5 minutes

    return () => clearInterval(interval)
  }, [])

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
    setSelectedBar(null)
  }

  const handleBarClick = (event, params) => {
    if (params && params.dataIndex !== undefined) {
      setSelectedBar({
        dataIndex: params.dataIndex,
        value: params.value,
        series: params.series
      })
    }
  }

  const getChartData = (datasetKey) => {
    const dataset = injuryData[datasetKey]
    if (!dataset) return { series: [], xAxis: [] }

    const seasons = dataset.data.map(item => item.season)
    const series = Object.keys(dataset.data[0]).filter(key => key !== 'season').map(key => ({
      data: dataset.data.map(item => item[key]),
      label: key,
      id: key
    }))

    return {
      series,
      xAxis: [{ data: seasons }],
      title: dataset.title,
      description: dataset.description
    }
  }

  const getMinutesAgo = () => {
    const diff = Math.floor((new Date() - lastUpdate) / 60000)
    return diff
  }

  const renderDetailPanel = () => {
    if (!selectedBar) return null

    const datasetKeys = Object.keys(injuryData)
    const currentDataset = injuryData[datasetKeys[activeTab]]
    const selectedSeason = currentDataset.data[selectedBar.dataIndex]
    const selectedSeries = selectedBar.series

    return (
      <Card sx={{ mt: 2, bgcolor: 'background.paper' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Detail View
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="body2" color="text.secondary" gutterBottom>
            <strong>Season:</strong> {selectedSeason.season}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            <strong>Category:</strong> {selectedSeries}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            <strong>Value:</strong> {selectedBar.value}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            This represents the {currentDataset.description.toLowerCase()} for the selected period. 
            Click on another bar to view different details.
          </Typography>
        </CardContent>
      </Card>
    )
  }

  const datasetKeys = Object.keys(injuryData)
  const currentChartData = getChartData(datasetKeys[activeTab])

  return (
    <Box sx={{ width: '100%' }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Injury Review Insights
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          Interactive dashboard for exploring injury data across seasons and exposure types
        </Typography>
        
        {/* Auto-refresh indicator */}
        <Alert 
          icon={<Refresh />} 
          severity="info" 
          sx={{ mb: 2 }}
        >
          Data updated {getMinutesAgo()} minutes ago
        </Alert>
      </Box>

      {/* Controls */}
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
              label={injuryData[key].title} 
              sx={{ textTransform: 'none' }}
            />
          ))}
        </Tabs>
      </Paper>

      {/* Chart */}
      <Paper sx={{ p: 3, mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          {currentChartData.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          {currentChartData.description}
        </Typography>
        
        <Box sx={{ height: 400 }}>
          <BarChart
            height={350}
            series={currentChartData.series}
            xAxis={currentChartData.xAxis}
            yAxis={[{ width: 60 }]}
            onItemClick={handleBarClick}
            slotProps={{
              tooltip: {
                trigger: 'item'
              }
            }}
            sx={{
              '& .MuiBarElement-root': {
                cursor: 'pointer',
                '&:hover': {
                  opacity: 0.8
                }
              }
            }}
          />
        </Box>
      </Paper>

      {/* Detail Panel */}
      {renderDetailPanel()}

      {/* Instructions */}
      <Paper sx={{ p: 2, mt: 2 }}>
        <Typography variant="body2" color="text.secondary">
          <strong>How to use:</strong> Click on any bar to view detailed information. 
          Use the tabs to switch between different injury metrics. 
          The time range filter allows you to focus on specific periods.
        </Typography>
      </Paper>
    </Box>
  )
}

export default InjuryInsights
