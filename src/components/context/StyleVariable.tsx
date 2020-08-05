import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { colors } from '../../theme/colors';
import { font } from '../../theme/font';
import { zIndex } from '../../theme/zIndex';
import { mq } from '../../theme/mediaQueries';

export const ThemeContext = React.createContext(
  {} as {
    setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
    isDarkMode: boolean;
  },
);

export interface StyleVariableProps {}

const StyleVariable: React.FC<StyleVariableProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(JSON.parse(localStorage.getItem('isDarkMode') || 'true'));

  return (
    <ThemeProvider theme={{ colors: colors(isDarkMode), font, zIndex, mq }}>
      <ThemeContext.Provider value={{ setIsDarkMode, isDarkMode }}>{children}</ThemeContext.Provider>
    </ThemeProvider>
  );
};

export default StyleVariable;
