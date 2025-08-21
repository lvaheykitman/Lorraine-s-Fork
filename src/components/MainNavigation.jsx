import React from 'react'
import PropTypes from 'prop-types'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Tooltip,
  Typography
} from '@mui/material'
import {
  PeopleOutlined,
  LocalHospitalOutlined,
  FitnessCenterOutlined,
  NotificationsOutlined,
  ChevronLeftOutlined,
  ChevronRightOutlined
} from '@mui/icons-material'
import Logo from '../assets/NFL.svg'
import '../styles/design-tokens.css'

// Navigation items configuration for NFL theme
const navigationItems = [
  { 
    id: 'roster-overview', 
    label: 'Roster overview', 
    icon: PeopleOutlined, 
    path: '/roster-overview',
    section: 'main'
  },
  { 
    id: 'injury-review', 
    label: 'Injury review', 
    icon: LocalHospitalOutlined, 
    path: '/injury-review',
    section: 'main'
  },
  { 
    id: 'training-development', 
    label: 'Training development', 
    icon: FitnessCenterOutlined, 
    path: '/training-development',
    section: 'main'
  },
  { 
    id: 'notifications', 
    label: 'Notifications', 
    icon: NotificationsOutlined, 
    path: '/notifications',
    section: 'main'
  }
]

function MainNavigation({ isCollapsed, onToggleCollapse }) {
  const location = useLocation()
  const navigate = useNavigate()

  const handleNavigation = (path) => {
    navigate(path)
  }

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: isCollapsed ? 64 : 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: isCollapsed ? 64 : 240,
          boxSizing: 'border-box',
          background: 'linear-gradient(180deg, #3A8DEE 0%, rgba(0,0,0,0.3) 100%)',
          color: 'white',
          borderRight: 'none',
          transition: 'width 0.2s ease-in-out'
        }
      }}
    >
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        height: '100%',
        p: isCollapsed ? 0.5 : 1 // Reduced padding by half
      }}>
        
        {/* NFL Logo Section */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: isCollapsed ? 'center' : 'space-between',
          mb: 3,
          minHeight: 48
        }}>
          {!isCollapsed && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box
                component="img"
                src={Logo}
                alt="NFL"
                sx={{
                  height: 32,
                  width: 'auto',
                  filter: 'brightness(0) invert(1)'
                }}
                onError={(e) => {
                  // Fallback to text if image fails to load
                  e.target.style.display = 'none'
                  e.target.nextSibling.style.display = 'block'
                }}
              />
              <Typography
                variant="h6"
                sx={{
                  ml: 1,
                  fontWeight: 700,
                  display: 'none',
                  color: 'white'
                }}
              >
                NFL
              </Typography>
            </Box>
          )}
          
          <IconButton
            onClick={onToggleCollapse}
            sx={{
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            {isCollapsed ? <ChevronRightOutlined /> : <ChevronLeftOutlined />}
          </IconButton>
        </Box>

        {/* Navigation Items */}
        <List sx={{ flexGrow: 1 }}>
          {navigationItems.map((item) => {
            const IconComponent = item.icon
            const active = isActive(item.path)
            
            return (
              <ListItem key={item.id} disablePadding sx={{ mb: 1 }}>
                <ListItemButton
                  onClick={() => handleNavigation(item.path)}
                  sx={{
                    minHeight: 48,
                    borderRadius: 1,
                    mx: isCollapsed ? 0 : 0.5, // Reduced margin by half
                    backgroundColor: active ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                    '&:hover': {
                      backgroundColor: active ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.05)'
                    }
                  }}
                >
                  <ListItemIcon sx={{ 
                    minWidth: isCollapsed ? 'auto' : 40,
                    color: 'white'
                  }}>
                    <IconComponent />
                  </ListItemIcon>
                  
                  {!isCollapsed && (
                    <ListItemText 
                      primary={item.label}
                      sx={{
                        '& .MuiListItemText-primary': {
                          fontSize: '0.875rem',
                          fontWeight: active ? 600 : 400,
                          textTransform: 'none'
                        }
                      }}
                    />
                  )}
                </ListItemButton>
                
                {isCollapsed && (
                  <Tooltip title={item.label} placement="right">
                    <Box />
                  </Tooltip>
                )}
              </ListItem>
            )
          })}
        </List>
      </Box>
    </Drawer>
  )
}

MainNavigation.propTypes = {
  isCollapsed: PropTypes.bool.isRequired,
  onToggleCollapse: PropTypes.func.isRequired
}

export default MainNavigation