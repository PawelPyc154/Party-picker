import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';

export interface StyleVariableProps {}

export const ThemeContext = React.createContext(
  {} as { setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>> },
);

const colors = {
  dark: {
    backgroundPrimary: '#181818',
    backgroundSecondary: '#202020',
    borderPrimary: '#313131',
    borderSecondary: '#667575',
    layout: '#3498db',
    textPrimary: 'white',
    textSecondary: '#3498db',
    error: '#e74c3c',
    disable: '#6f6f6f',
    hover: 'white',
    hoverDelete: '#e74c3c',
    map: {
      marker: '#f1c40f',
      markerAddEvent: '#3498db',
    },
    activeNavLink: 'white',
    textBadge: 'black',
    scrollbarThumb: 'gray',
    slider: {
      root: '#3498db',
      thumb: '#fff',
      vertical: '#000',
      track: '#3498db',
      rail: '#bfbfbf',
      mark: '#bfbfbf',
      markLabel: '#3498db',
      markActive: 'currentColor',
    },
  },
  light: {
    backgroundPrimary: '#181818',
    backgroundSecondary: '#202020',
    borderPrimary: '#313131',
    borderSecondary: '#667575',
    layout: '#3498db',
    textPrimary: 'white',
    textSecondary: '#3498db',
    error: '#e74c3c',
    disable: '#6f6f6f',
    hover: 'white',
    hoverDelete: '#e74c3c',
    map: {
      marker: '#f1c40f',
      markerAddEvent: '#3498db',
    },
    activeNavLink: 'white',
    textBadge: 'black',
    scrollbarThumb: 'gray',
    slider: {
      root: '#3498db',
      thumb: '#fff',
      vertical: '#000',
      track: '#3498db',
      rail: '#bfbfbf',
      mark: '#bfbfbf',
      markLabel: '#3498db',
      markActive: 'currentColor',
    },
  },
};
const size = {
  h1: '10px',
};

const StyleVariable: React.FC<StyleVariableProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <ThemeProvider theme={{ size, colors: isDarkMode ? colors.dark : colors.light }}>
      <ThemeContext.Provider value={{ setIsDarkMode }}>{children}</ThemeContext.Provider>
    </ThemeProvider>
  );
};

export default StyleVariable;
