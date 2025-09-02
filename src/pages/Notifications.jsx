import React, { useState } from 'react'
import {
  Box,
  Typography,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  Divider,
  Button,
  Menu,
  MenuItem,
  Switch,
  Badge,
  Chip
} from '@mui/material'
import {
  NotificationsOutlined,
  MailOutline,
  LocalHospital,
  EventNote,
  TrendingUp,
  Campaign,
  MoreVert as MoreVertIcon,
  CheckCircleOutline,
  VolumeOff,
  VolumeUp
} from '@mui/icons-material'

// Mock notification data
const mockNotifications = [
  {
    id: 1,
    type: 'message',
    title: 'New Message from Coach Smith',
    content: 'Team meeting scheduled for tomorrow at 9 AM',
    timestamp: '10 mins ago',
    read: false,
    muted: false
  },
  {
    id: 2,
    type: 'medical',
    title: 'Medical Update Required',
    content: 'Dr. Johnson requests injury status update for Player #123',
    timestamp: '1 hour ago',
    read: false,
    muted: false
  },
  {
    id: 3,
    type: 'reminder',
    title: 'Training Session Reminder',
    content: 'High-intensity training session in 30 minutes',
    timestamp: '25 mins ago',
    read: true,
    muted: false
  },
  {
    id: 4,
    type: 'progress',
    title: 'Performance Milestone',
    content: 'Player Johnson reached 90% recovery target',
    timestamp: '2 hours ago',
    read: false,
    muted: false
  },
  {
    id: 5,
    type: 'announcement',
    title: 'Team Announcement',
    content: 'New rehabilitation protocol implemented starting next week',
    timestamp: '3 hours ago',
    read: false,
    muted: false
  }
]

const getNotificationIcon = (type) => {
  switch (type) {
    case 'message':
      return <MailOutline />
    case 'medical':
      return <LocalHospital />
    case 'reminder':
      return <EventNote />
    case 'progress':
      return <TrendingUp />
    case 'announcement':
      return <Campaign />
    default:
      return <NotificationsOutlined />
  }
}

const getNotificationColor = (type) => {
  switch (type) {
    case 'message':
      return 'primary.main'
    case 'medical':
      return 'error.main'
    case 'reminder':
      return 'warning.main'
    case 'progress':
      return 'success.main'
    case 'announcement':
      return 'secondary.main'
    default:
      return 'text.primary'
  }
}


function Notifications() {
  const [notifications, setNotifications] = useState(mockNotifications)
  const [drawerOpen, setDrawerOpen] = useState(true)
  const [menuAnchorEl, setMenuAnchorEl] = useState(null)
  const [selectedNotification, setSelectedNotification] = useState(null)

  const handleMarkAllRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })))
  }

  const handleToggleMute = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, muted: !notif.muted } : notif
    ))
  }

  const handleMarkRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ))
  }

  const handleMenuOpen = (event, notification) => {
    setMenuAnchorEl(event.currentTarget)
    setSelectedNotification(notification)
  }

  const handleMenuClose = () => {
    setMenuAnchorEl(null)
    setSelectedNotification(null)
  }

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <>
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Badge badgeContent={unreadCount} color="error" sx={{ mr: 2 }}>
            <NotificationsOutlined 
              sx={{ fontSize: 32, color: 'primary.main' }} 
              onClick={() => setDrawerOpen(true)}
            />
          </Badge>
          <Typography variant="h4" sx={{ color: 'primary.main' }}>
            Notifications
          </Typography>
        </Box>
      </Box>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: { width: 400 }
        }}
      >
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">
              Notifications
            </Typography>
            <Button 
              size="small" 
              onClick={handleMarkAllRead}
              startIcon={<CheckCircleOutline />}
            >
              Mark all as read
            </Button>
          </Box>

          <List>
            {notifications.map((notification) => (
              <React.Fragment key={notification.id}>
                <ListItem
                  sx={{
                    bgcolor: notification.read ? 'transparent' : 'action.hover',
                    '&:hover': { bgcolor: 'action.hover' }
                  }}
                >
                  <ListItemIcon sx={{ color: getNotificationColor(notification.type) }}>
                    {getNotificationIcon(notification.type)}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="subtitle2">
                          {notification.title}
                        </Typography>
                        {notification.muted && (
                          <VolumeOff sx={{ fontSize: 16, color: 'text.secondary' }} />
                        )}
                      </Box>
                    }
                    secondary={
                      <>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                          {notification.content}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {notification.timestamp}
                        </Typography>
                      </>
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton 
                      edge="end" 
                      size="small"
                      onClick={(e) => handleMenuOpen(e, notification)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </Box>
      </Drawer>

      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => {
          handleMarkRead(selectedNotification?.id)
          handleMenuClose()
        }}>
          <ListItemIcon>
            <CheckCircleOutline fontSize="small" />
          </ListItemIcon>
          <ListItemText>Mark as read</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => {
          handleToggleMute(selectedNotification?.id)
          handleMenuClose()
        }}>
          <ListItemIcon>
            {selectedNotification?.muted ? (
              <VolumeUp fontSize="small" />
            ) : (
              <VolumeOff fontSize="small" />
            )}
          </ListItemIcon>
          <ListItemText>
            {selectedNotification?.muted ? 'Unmute' : 'Mute'}
          </ListItemText>
        </MenuItem>
      </Menu>
    </>
  )
}

export default Notifications
