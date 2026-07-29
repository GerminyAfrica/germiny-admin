import { useTheme as useMuiTheme } from '@material-ui/core/styles';
import { useTheme } from '../theme/ThemeProvider';

export const useCustomTheme = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const theme = useMuiTheme();
  
  return {
    isDarkMode,
    toggleTheme,
    theme,
    colors: {
      background: isDarkMode ? '#1a202c' : '#f8fafc',
      surface: isDarkMode ? 'rgba(45, 55, 72, 0.95)' : 'rgba(255, 255, 255, 0.95)',
      glass: isDarkMode ? 'rgba(45, 55, 72, 0.8)' : 'rgba(255, 255, 255, 0.8)',
      card: isDarkMode ? 'rgba(45, 55, 72, 0.9)' : 'rgba(255, 255, 255, 0.9)',
      text: {
        primary: isDarkMode ? '#f7fafc' : '#2d3748',
        secondary: isDarkMode ? '#e2e8f0' : '#4a5568',
        muted: isDarkMode ? '#a0aec0' : '#718096'
      },
      border: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
      shadow: isDarkMode ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.1)'
    }
  };
};