import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import CssBaseline from '@mui/material/CssBaseline'
import App from './App'
import muiTheme from './theme/muiTheme.js'
import './styles/design-tokens.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={muiTheme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </LocalizationProvider>
    </ThemeProvider>
  </React.StrictMode>,
)