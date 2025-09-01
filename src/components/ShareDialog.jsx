import React, { useMemo, useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  Chip,
  Typography,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Divider
} from '@mui/material'

const defaultSuggestions = [
  'Dr. Smith',
  'Dr. Johnson',
  'Dr. Williams',
  'Dr. Brown',
  'Dr. Jones'
]

function ShareDialog({
  open,
  onClose,
  itemName = 'Item',
  owner = 'You',
  suggestions = defaultSuggestions,
  placeholder = 'Add staff, groups, or calendar events',
  onCopyLink
}) {
  const [inputValue, setInputValue] = useState('')
  const [selected, setSelected] = useState([])
  const [access, setAccess] = useState('restricted')

  const filteredSuggestions = useMemo(() => {
    const query = inputValue.toLowerCase()
    return suggestions.filter(s => s.toLowerCase().includes(query) && !selected.includes(s))
  }, [inputValue, suggestions, selected])

  const handleAdd = (value) => {
    if (!selected.includes(value)) setSelected([...selected, value])
    setInputValue('')
  }

  const handleDelete = (value) => {
    setSelected(selected.filter(s => s !== value))
  }

  const handleCopy = () => {
    const shareLink = `${window.location.origin}${window.location.pathname}?share=${encodeURIComponent(itemName)}`
    navigator.clipboard.writeText(shareLink)
    if (onCopyLink) onCopyLink(shareLink)
  }

  const title = `Share ${itemName}`

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {/* Input with chips */}
        <Box sx={{ mt: 1 }}>
          <TextField
            fullWidth
            placeholder={placeholder}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            size="small"
          />
          {/* Selected chips */}
          {selected.length > 0 && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
              {selected.map((s) => (
                <Chip key={s} label={s} onDelete={() => handleDelete(s)} />
              ))}
            </Box>
          )}
          {/* Suggestions */}
          {filteredSuggestions.length > 0 && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
              {filteredSuggestions.slice(0, 6).map((s) => (
                <Chip key={s} label={s} onClick={() => handleAdd(s)} clickable variant="outlined" />
              ))}
            </Box>
          )}
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Access control */}
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="caption" color="text.secondary">Owner</Typography>
            <Typography variant="body2">{owner}</Typography>
          </Box>
          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel>Access</InputLabel>
            <Select value={access} label="Access" onChange={(e) => setAccess(e.target.value)}>
              <MenuItem value="restricted">Restricted</MenuItem>
              <MenuItem value="link">Anyone with link</MenuItem>
              <MenuItem value="org">Organization</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          onClick={handleCopy}
          sx={{
            color: 'grey.800',
            borderColor: 'grey.300',
            '&:hover': { borderColor: 'grey.400', bgcolor: 'grey.50' }
          }}
        >
          Copy Link
        </Button>
        <Button variant="contained" onClick={onClose}>Done</Button>
      </DialogActions>
    </Dialog>
  )
}

export default ShareDialog


