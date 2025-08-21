import { createTheme } from '@mui/material/styles'

// Create MUI theme based on design tokens
export const muiTheme = createTheme({
  palette: {
    primary: {
      main: '#3B4960',
      light: '#f2f3f5',
      dark: '#232b3a',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#F1F2F3',
      light: '#f8f9fa',
      dark: '#e8e9ea',
      contrastText: '#333333',
    },
    success: {
      main: '#28a745',
      light: '#d4edda',
      dark: '#155724',
    },
    warning: {
      main: '#ffc107',
      light: '#fff3cd',
      dark: '#856404',
    },
    error: {
      main: '#dc3545',
      light: '#f8d7da',
      dark: '#721c24',
    },
    info: {
      main: '#3B4960',
      light: '#f2f3f5',
      dark: '#232b3a',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
      disabled: '#cccccc',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    divider: '#e0e0e0',
  },
  typography: {
    fontFamily: '"Roboto", "Open Sans", sans-serif',
    h1: {
      fontSize: '2.25rem',
      fontWeight: 700,
      lineHeight: 1.2,
      textTransform: 'none',
    },
    h2: {
      fontSize: '1.875rem',
      fontWeight: 600,
      lineHeight: 1.2,
      textTransform: 'none',
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.2,
      textTransform: 'none',
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.2,
      textTransform: 'none',
    },
    h5: {
      fontSize: '1.125rem',
      fontWeight: 600,
      lineHeight: 1.2,
      textTransform: 'none',
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.2,
      textTransform: 'none',
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5,
      textTransform: 'none',
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.5,
      textTransform: 'none',
    },
    button: {
      fontSize: '0.875rem',
      fontWeight: 500,
      textTransform: 'none',
      lineHeight: 1.5,
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 400,
      textTransform: 'none',
    },
    overline: {
      fontSize: '0.75rem',
      fontWeight: 500,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 4,
  },
  spacing: 8,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          textTransform: 'none',
          fontWeight: 500,
          fontSize: '0.875rem',
          padding: '8px 16px',
          minHeight: '36px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          },
        },
        contained: {
          '&:hover': {
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          },
        },
        outlined: {
          borderWidth: '1px',
          '&:hover': {
            borderWidth: '1px',
          },
        },
        sizeSmall: {
          fontSize: '0.75rem',
          padding: '6px 12px',
          minHeight: '32px',
        },
        sizeLarge: {
          fontSize: '1rem',
          padding: '12px 24px',
          minHeight: '44px',
        },
      },
      defaultProps: {
        size: 'small',
        variant: 'contained',
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e0e0e0',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          fontSize: '0.75rem',
          fontWeight: 500,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 4,
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: 4,
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          '& .MuiTab-root': {
            textTransform: 'none',
            fontWeight: 500,
            fontSize: '0.875rem',
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          fontSize: '0.875rem',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 8,
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 4,
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          borderRadius: '50%',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          '&:hover': {
            backgroundColor: 'rgba(59, 73, 96, 0.04)',
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: 'none',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
})

export default muiTheme

