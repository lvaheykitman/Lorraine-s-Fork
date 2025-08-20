import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Typography,
  Paper,
  Alert
} from '@mui/material'
import { Button } from './index'
import '../styles/design-tokens.css'

/**
 * Athlete Form Component using Medinah Design System
 * 
 * Demonstrates proper usage of Button component from design system
 * Includes form validation and submission handling
 */
function AthleteForm({ onSubmit, initialData = {}, mode = 'create' }) {
  const [formData, setFormData] = useState({
    firstName: initialData.firstName || '',
    lastName: initialData.lastName || '',
    email: initialData.email || '',
    position: initialData.position || '',
    team: initialData.team || '',
    squad: initialData.squad || '',
    dateOfBirth: initialData.dateOfBirth || '',
    height: initialData.height || '',
    weight: initialData.weight || ''
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  // Mock data for dropdowns
  const positions = ['Forward', 'Midfielder', 'Defender', 'Goalkeeper']
  const teams = ['Arsenal', 'Chelsea', 'Liverpool', 'Manchester City', 'Manchester United']
  const squads = ['First Team', 'Reserve Team', 'Academy U21', 'Academy U18']

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }

    if (!formData.position) {
      newErrors.position = 'Position is required'
    }

    if (!formData.team) {
      newErrors.team = 'Team is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      if (onSubmit) {
        await onSubmit(formData)
      }
      
      setSubmitStatus('success')
      
      // Reset form if in create mode
      if (mode === 'create') {
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          position: '',
          team: '',
          squad: '',
          dateOfBirth: '',
          height: '',
          weight: ''
        })
      }
    } catch (error) {
      setSubmitStatus('error')
      console.error('Form submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      position: '',
      team: '',
      squad: '',
      dateOfBirth: '',
      height: '',
      weight: ''
    })
    setErrors({})
    setSubmitStatus(null)
  }

  return (
    <Paper sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom sx={{ color: 'var(--color-primary)' }}>
        {mode === 'create' ? 'Add new athlete' : 'Edit athlete'}
      </Typography>
      
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        {mode === 'create' 
          ? 'Enter the athlete\'s information below to add them to the system.'
          : 'Update the athlete\'s information below.'
        }
      </Typography>

      {submitStatus === 'success' && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {mode === 'create' ? 'Athlete added successfully!' : 'Athlete updated successfully!'}
        </Alert>
      )}

      {submitStatus === 'error' && (
        <Alert severity="error" sx={{ mb: 3 }}>
          An error occurred. Please try again.
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={3}>
          {/* Personal Information */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Personal information
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="First name"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              error={!!errors.firstName}
              helperText={errors.firstName}
              required
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Last name"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              error={!!errors.lastName}
              helperText={errors.lastName}
              required
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
              required
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Date of birth"
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          {/* Team Information */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Team information
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={!!errors.position} required>
              <InputLabel>Position</InputLabel>
              <Select
                value={formData.position}
                label="Position"
                onChange={(e) => handleInputChange('position', e.target.value)}
              >
                {positions.map((position) => (
                  <MenuItem key={position} value={position}>
                    {position}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {errors.position && (
              <Typography variant="caption" color="error" sx={{ mt: 0.5, display: 'block' }}>
                {errors.position}
              </Typography>
            )}
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={!!errors.team} required>
              <InputLabel>Team</InputLabel>
              <Select
                value={formData.team}
                label="Team"
                onChange={(e) => handleInputChange('team', e.target.value)}
              >
                {teams.map((team) => (
                  <MenuItem key={team} value={team}>
                    {team}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {errors.team && (
              <Typography variant="caption" color="error" sx={{ mt: 0.5, display: 'block' }}>
                {errors.team}
              </Typography>
            )}
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Squad</InputLabel>
              <Select
                value={formData.squad}
                label="Squad"
                onChange={(e) => handleInputChange('squad', e.target.value)}
              >
                {squads.map((squad) => (
                  <MenuItem key={squad} value={squad}>
                    {squad}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Physical Information */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Physical information
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Height (cm)"
              type="number"
              value={formData.height}
              onChange={(e) => handleInputChange('height', e.target.value)}
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Weight (kg)"
              type="number"
              value={formData.weight}
              onChange={(e) => handleInputChange('weight', e.target.value)}
            />
          </Grid>
        </Grid>

        {/* Form Actions */}
        <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          <Button
            variant="secondary"
            onClick={handleReset}
            disabled={isSubmitting}
          >
            Reset
          </Button>
          
          <Button
            variant="primary"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting 
              ? (mode === 'create' ? 'Adding...' : 'Updating...')
              : (mode === 'create' ? 'Add athlete' : 'Update athlete')
            }
          </Button>
        </Box>
      </Box>
    </Paper>
  )
}

AthleteForm.propTypes = {
  onSubmit: PropTypes.func,
  initialData: PropTypes.object,
  mode: PropTypes.oneOf(['create', 'edit'])
}

export default AthleteForm
