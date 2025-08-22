import React from 'react'
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
  Divider,
  Chip
} from '@mui/material'
import {
  Close as CloseIcon,
  LocalHospital as InjuryIcon,
  Person as PersonIcon,
  FitnessCenter as TrainingIcon,
  Event as ScheduleIcon,
  MedicalServices as MedicalIcon,
  Message as MessageIcon,
  Campaign as AnnouncementIcon,
  Check as CheckIcon
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

const notifications = [
  {
    id: 1,
    title: 'Message from Richard Coleman',
    description: 'Thanks for sending that PDF over, I\'ve had a...',
    time: '1 minute ago',
    isNew: true,
    type: 'message',
    channel: 'Announcements',
    actions: ['view', 'dismiss']
  },
  {
    id: 2,
    title: 'Injury reported update',
    description: 'New injury report submitted',
    time: '2 minutes ago',
    isNew: true,
    type: 'injury',
  },
  {
    id: 3,
    title: 'Andrew Hopkins status changed',
    description: 'Status changed to Doubtful',
    time: '30 minutes ago',
    isNew: false,
    type: 'status',
  },
  {
    id: 4,
    title: 'Training session complete',
    description: 'Morning practice concluded - 95% attendance',
    time: '1 hour ago',
    isNew: false,
    type: 'training',
  },
  {
    id: 5,
    title: 'Medical clearance granted',
    description: 'Player cleared to return to training',
    time: '2 hours ago',
    isNew: false,
    type: 'medical',
  },
  {
    id: 6,
    title: 'Schedule update',
    description: 'New training schedule published',
    time: '3 hours ago',
    isNew: false,
    type: 'schedule',
  },
]

const getNotificationIcon = (type) => {
  switch (type) {
    case 'message':
      return <MessageIcon color="primary" />
    case 'injury':
      return <InjuryIcon color="error" />
    case 'status':
      return <PersonIcon color="warning" />
    case 'training':
      return <TrainingIcon color="info" />
    case 'medical':
      return <MedicalIcon color="success" />
    case 'schedule':
      return <ScheduleIcon />
    default:
      return null
  }
}

const NotificationsPanel = ({ open, onClose }) => {
  const navigate = useNavigate()

  const handleViewAll = () => {
    navigate('/notifications')
    onClose()
  }

  const handleAction = (notification, action) => {
    if (action === 'view') {
      navigate('/notifications')
      onClose()
    } else if (action === 'dismiss') {
      // In a real app, this would update the notification state
      console.log('Dismissed notification:', notification.id)
    }
  }

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 360,
          maxWidth: '100%',
          bgcolor: '#ffffff'
        }
      }}
    >
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6">Notifications</Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider />

      <List sx={{ pt: 0 }}>
        {notifications.map((notification) => (
          <ListItem
            key={notification.id}
            sx={{
              py: 2,
              borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
              '&:hover': {
                bgcolor: 'rgba(0, 0, 0, 0.02)'
              }
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              {getNotificationIcon(notification.type)}
            </ListItemIcon>
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="subtitle2" component="span">
                    {notification.title}
                  </Typography>
                  {notification.isNew && (
                    <Chip
                      label="New"
                      color="error"
                      size="small"
                      sx={{ height: 20 }}
                    />
                  )}
                </Box>
              }
              secondary={
                <>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                    {notification.description}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                    {notification.channel && (
                      <>
                        <AnnouncementIcon fontSize="small" color="action" />
                        <Typography variant="caption" color="text.secondary">
                          {notification.channel}
                        </Typography>
                      </>
                    )}
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="caption" color="text.secondary">
                      {notification.time}
                    </Typography>
                    {notification.actions && (
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        {notification.actions.map((action) => (
                          <Button
                            key={action}
                            size="small"
                            onClick={() => handleAction(notification, action)}
                            startIcon={action === 'dismiss' ? <CheckIcon /> : null}
                          >
                            {action}
                          </Button>
                        ))}
                      </Box>
                    )}
                  </Box>
                </>
              }
            />
          </ListItem>
        ))}
      </List>

      <Box sx={{ p: 2 }}>
        <Button
          fullWidth
          variant="outlined"
          onClick={handleViewAll}
        >
          Go to full notifications
        </Button>
      </Box>
    </Drawer>
  )
}

export default NotificationsPanel
