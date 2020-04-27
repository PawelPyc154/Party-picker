import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';

export interface StyleVariableProps {}

export const ThemeContext = React.createContext(
  {} as {
    setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
    isDarkMode: boolean;
  },
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
    switch: {
      thumb: '#fff',
      thumbChecked: '#3498db',
      track: '#fff',
      trackChecked: '#3498db',
    },
  },
  light: {
    backgroundPrimary: '#181818',
    backgroundSecondary: '#202020',
    borderPrimary: '#313131',
    borderSecondary: '#667575',
    layout: '#f1c40f',
    textPrimary: 'white',
    textSecondary: '#f1c40f',
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
      root: '#f1c40f',
      thumb: '#fff',
      vertical: '#000',
      track: '#f1c40f',
      rail: '#bfbfbf',
      mark: '#bfbfbf',
      markLabel: '#f1c40f',
      markActive: 'currentColor',
    },
    switch: {
      thumb: '#fff',
      thumbChecked: '#f1c40f',
      track: '#fff',
      trackChecked: '#f1c40f',
    },
  },
};
const size = {};

const StyleVariable: React.FC<StyleVariableProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <ThemeProvider theme={{ size, colors: isDarkMode ? colors.dark : colors.light }}>
      <ThemeContext.Provider value={{ setIsDarkMode, isDarkMode }}>
        {children}
      </ThemeContext.Provider>
    </ThemeProvider>
  );
};

export default StyleVariable;
