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
  Chip,
  ListItemSecondaryAction
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
  Check as CheckIcon,
  ArrowForward as ArrowForwardIcon,
  Notifications as NotificationsIcon
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

const notifications = [
  {
    id: 1,
    title: 'Injury reported update',
    description: 'New injury report submitted',
    time: '2 minutes ago',
    isNew: true,
    type: 'injury',
  },
  {
    id: 2,
    title: 'Andrew Hopkins status changed',
    description: 'Status changed to Doubtful',
    time: '30 minutes ago',
    isNew: false,
    type: 'status',
  },
  {
    id: 3,
    title: 'Training session complete',
    description: 'Morning practice concluded - 95% attendance',
    time: '1 hour ago',
    isNew: false,
    type: 'training',
  },
  {
    id: 4,
    title: 'Medical clearance granted',
    description: 'Player cleared to return to training',
    time: '2 hours ago',
    isNew: false,
    type: 'medical',
  },
  {
    id: 5,
    title: 'Schedule update',
    description: 'New training schedule published',
    time: '3 hours ago',
    isNew: false,
    type: 'schedule',
  }
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
          width: 400,
          bgcolor: '#ffffff'
        }
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Header */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          p: 2,
          borderBottom: '1px solid #e0e0e0'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <NotificationsIcon color="primary" />
            <Typography variant="h6">Notifications</Typography>
          </Box>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Notifications List */}
        <List sx={{ flex: 1, overflow: 'auto', py: 0 }}>
          {notifications.map((notification, index) => (
            <React.Fragment key={notification.id}>
              <ListItem 
                alignItems="flex-start"
                sx={{ 
                  py: 2,
                  bgcolor: notification.isNew ? 'rgba(25, 118, 210, 0.04)' : 'transparent',
                  '&:hover': {
                    bgcolor: 'rgba(0, 0, 0, 0.04)'
                  }
                }}
              >
                <ListItemIcon>
                  {getNotificationIcon(notification.type)}
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="subtitle1" component="span">
                        {notification.title}
                      </Typography>
                      {notification.isNew && (
                        <Chip
                          label="New"
                          color="primary"
                          size="small"
                          sx={{ height: 20 }}
                        />
                      )}
                    </Box>
                  }
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.primary"
                        sx={{ display: 'block', mb: 0.5 }}
                      >
                        {notification.description}
                      </Typography>
                      <Typography
                        component="span"
                        variant="caption"
                        color="text.secondary"
                      >
                        {notification.time}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
              {index < notifications.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>

        {/* Footer */}
        <Box sx={{ 
          p: 2, 
          borderTop: '1px solid #e0e0e0',
          bgcolor: '#fafafa'
        }}>
          <Button
            fullWidth
            variant="text"
            color="primary"
            onClick={handleViewAll}
            endIcon={<ArrowForwardIcon />}
          >
            Go to full notifications
          </Button>
        </Box>
      </Box>
    </Drawer>
  )
}

export default NotificationsPanel
