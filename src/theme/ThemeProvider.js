import React, { createContext, useContext, useState, useEffect } from 'react';
import { createMuiTheme, ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

const lightTheme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#111111',
      light: '#3f3f3f',
      dark: '#000000',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#2f2f2f',
      light: '#5a5a5a',
      dark: '#1a1a1a',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f8fafc',
      paper: 'rgba(255, 255, 255, 0.95)',
      glass: 'rgba(255, 255, 255, 0.8)',
      card: 'rgba(255, 255, 255, 0.9)',
    },
    text: {
      primary: '#2d3748',
      secondary: '#4a5568',
      disabled: '#a0aec0',
    },
    divider: 'rgba(0, 0, 0, 0.08)',
    action: {
      hover: 'rgba(0, 0, 0, 0.08)',
      selected: 'rgba(0, 0, 0, 0.12)',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      color: '#2d3748',
    },
    h4: {
      fontWeight: 600,
      color: '#2d3748',
    },
    h5: {
      fontWeight: 600,
      color: '#2d3748',
    },
    h6: {
      fontWeight: 500,
      color: '#2d3748',
    },
    body1: {
      color: '#2d3748',
    },
    body2: {
      color: '#4a5568',
    },
  },
  shape: {
    borderRadius: 12,
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
          minHeight: '100vh',
          margin: 0,
          padding: 0,
        },
        '*::-webkit-scrollbar': {
          width: '8px',
        },
        '*::-webkit-scrollbar-track': {
          background: 'rgba(0, 0, 0, 0.05)',
          borderRadius: '10px',
        },
        '*::-webkit-scrollbar-thumb': {
          background: 'linear-gradient(135deg, #111111, #2f2f2f)',
          borderRadius: '10px',
        },
      },
    },
    MuiTableContainer: {
      root: {
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderRadius: '15px',
        border: '1px solid rgba(0, 0, 0, 0.08)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
        overflow: 'hidden',
      },
    },
    MuiTableHead: {
      root: {
        background: 'linear-gradient(135deg, #111111 0%, #2f2f2f 100%)',
        '& .MuiTableCell-head': {
          backgroundColor: 'transparent',
          color: '#ffffff',
          fontWeight: 600,
          fontSize: '0.9rem',
          borderBottom: 'none',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
        },
      },
    },
    MuiTableCell: {
      root: {
        borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
        color: '#2d3748',
        padding: '16px',
      },
    },
    MuiTableRow: {
      root: {
        transition: 'all 0.2s ease',
        '&:hover': {
          background: 'rgba(0, 0, 0, 0.04)',
          transform: 'translateY(-1px)',
        },
        '&:nth-of-type(even)': {
          background: 'rgba(248, 250, 252, 0.5)',
        },
      },
    },
    MuiPaper: {
      root: {
        backgroundImage: 'none',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(0, 0, 0, 0.08)',
        borderRadius: '15px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
      },
    },
    MuiCard: {
      root: {
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(0, 0, 0, 0.08)',
        borderRadius: '15px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.12)',
        },
      },
    },
    MuiButton: {
      root: {
        borderRadius: '12px',
        textTransform: 'none',
        fontWeight: 500,
        padding: '10px 24px',
      },
      contained: {
        background: 'linear-gradient(135deg, #111111 0%, #2f2f2f 100%)',
        color: '#ffffff',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
        '&:hover': {
          background: 'linear-gradient(135deg, #000000 0%, #202020 100%)',
          boxShadow: '0 6px 20px rgba(0, 0, 0, 0.4)',
          transform: 'translateY(-2px)',
        },
      },
      outlined: {
        border: '2px solid rgba(0, 0, 0, 0.3)',
        color: '#111111',
        '&:hover': {
          background: 'rgba(0, 0, 0, 0.08)',
          border: '2px solid #111111',
        },
      },
    },
    MuiChip: {
      root: {
        borderRadius: '20px',
        fontWeight: 500,
      },
    },
    MuiTextField: {
      root: {
        '& .MuiOutlinedInput-root': {
          borderRadius: '12px',
          background: 'rgba(255, 255, 255, 0.8)',
          '& fieldset': {
            borderColor: 'rgba(0, 0, 0, 0.1)',
          },
          '&:hover fieldset': {
            borderColor: 'rgba(0, 0, 0, 0.5)',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#111111',
          },
        },
      },
    },
    MuiDivider: {
      root: {
        backgroundColor: 'rgba(0, 0, 0, 0.08)',
      },
    },
    MuiIconButton: {
      root: {
        color: '#2d3748',
        transition: 'all 0.2s ease',
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          transform: 'scale(1.05)',
        },
      },
    },
    MuiTooltip: {
      tooltip: {
        backgroundColor: 'rgba(45, 55, 72, 0.9)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        fontSize: '12px',
        color: '#ffffff',
      },
    },
  },
});

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#111111',
      light: '#3f3f3f',
      dark: '#000000',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#2f2f2f',
      light: '#5a5a5a',
      dark: '#1a1a1a',
      contrastText: '#ffffff',
    },
    background: {
      default: '#0b0b0b',
      paper: 'rgba(255, 255, 255, 0.05)',
      glass: 'rgba(255, 255, 255, 0.1)',
      card: 'rgba(255, 255, 255, 0.08)',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.7)',
      disabled: 'rgba(255, 255, 255, 0.5)',
    },
    divider: 'rgba(255, 255, 255, 0.1)',
    action: {
      hover: 'rgba(255, 255, 255, 0.08)',
      selected: 'rgba(255, 255, 255, 0.12)',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      color: '#ffffff',
    },
    h4: {
      fontWeight: 600,
      color: '#ffffff',
    },
    h5: {
      fontWeight: 600,
      color: '#ffffff',
    },
    h6: {
      fontWeight: 500,
      color: '#ffffff',
    },
    body1: {
      color: '#ffffff',
    },
    body2: {
      color: 'rgba(255, 255, 255, 0.7)',
    },
  },
  shape: {
    borderRadius: 12,
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          background: 'linear-gradient(135deg, #0a0a0a 0%, #121212 50%, #1f1f1f 100%)',
          minHeight: '100vh',
          margin: 0,
          padding: 0,
        },
        '*::-webkit-scrollbar': {
          width: '8px',
        },
        '*::-webkit-scrollbar-track': {
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '10px',
        },
        '*::-webkit-scrollbar-thumb': {
          background: 'linear-gradient(135deg, #111111, #2f2f2f)',
          borderRadius: '10px',
        },
        '*::-webkit-scrollbar-thumb:hover': {
          background: 'linear-gradient(135deg, #000000, #202020)',
        },
      },
    },
    MuiTableContainer: {
      root: {
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(20px)',
        borderRadius: '15px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        overflow: 'hidden',
      },
    },
    MuiTableHead: {
      root: {
        background: 'linear-gradient(135deg, #111111 0%, #2f2f2f 100%)',
        '& .MuiTableCell-head': {
          backgroundColor: 'transparent',
          color: '#ffffff',
          fontWeight: 600,
          fontSize: '0.9rem',
          borderBottom: 'none',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
        },
      },
    },
    MuiTableCell: {
      root: {
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        color: '#ffffff',
        padding: '16px',
      },
    },
    MuiTableRow: {
      root: {
        transition: 'all 0.2s ease',
        '&:hover': {
          background: 'rgba(255, 255, 255, 0.08)',
          transform: 'translateY(-1px)',
        },
        '&:nth-of-type(even)': {
          background: 'rgba(255, 255, 255, 0.02)',
        },
      },
    },
    MuiPaper: {
      root: {
        backgroundImage: 'none',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '15px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
      },
    },
    MuiCard: {
      root: {
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '15px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4)',
          backgroundColor: 'rgba(255, 255, 255, 0.12)',
        },
      },
    },
    MuiButton: {
      root: {
        borderRadius: '12px',
        textTransform: 'none',
        fontWeight: 500,
        padding: '10px 24px',
      },
      contained: {
        background: 'linear-gradient(135deg, #111111 0%, #2f2f2f 100%)',
        color: '#ffffff',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.4)',
        '&:hover': {
          background: 'linear-gradient(135deg, #000000 0%, #202020 100%)',
          boxShadow: '0 6px 20px rgba(0, 0, 0, 0.6)',
          transform: 'translateY(-2px)',
        },
      },
      outlined: {
        border: '2px solid rgba(255, 255, 255, 0.3)',
        color: '#ffffff',
        '&:hover': {
          background: 'rgba(255, 255, 255, 0.08)',
          border: '2px solid rgba(255, 255, 255, 0.5)',
        },
      },
    },
    MuiChip: {
      root: {
        borderRadius: '20px',
        fontWeight: 500,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        color: '#ffffff',
        border: '1px solid rgba(255, 255, 255, 0.2)',
      },
    },
    MuiTextField: {
      root: {
        '& .MuiOutlinedInput-root': {
          borderRadius: '12px',
          background: 'rgba(255, 255, 255, 0.05)',
          color: '#ffffff',
          '& fieldset': {
            borderColor: 'rgba(255, 255, 255, 0.2)',
          },
          '&:hover fieldset': {
            borderColor: 'rgba(255, 255, 255, 0.4)',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#111111',
          },
        },
        '& .MuiInputLabel-root': {
          color: 'rgba(255, 255, 255, 0.7)',
        },
        '& .MuiInputLabel-root.Mui-focused': {
          color: '#111111',
        },
      },
    },
    MuiFormControl: {
      root: {
        '& .MuiInputLabel-root': {
          color: 'rgba(255, 255, 255, 0.7)',
        },
      },
    },
    MuiSelect: {
      root: {
        color: '#ffffff',
      },
      icon: {
        color: 'rgba(255, 255, 255, 0.7)',
      },
    },
    MuiMenuItem: {
      root: {
        color: '#ffffff',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
        },
        '&.Mui-selected': {
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
          },
        },
      },
    },
    MuiDivider: {
      root: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
      },
    },
    MuiIconButton: {
      root: {
        color: '#ffffff',
        transition: 'all 0.2s ease',
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          transform: 'scale(1.05)',
        },
      },
    },
    MuiTooltip: {
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        fontSize: '12px',
      },
    },
  },
});

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved !== null ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  const value = {
    isDarkMode,
    toggleDarkMode,
    theme,
  };

  return (
    <ThemeContext.Provider value={value}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;