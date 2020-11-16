import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../util';
import { WiDaySunny, WiNightClear } from 'weather-icons-react';

const ToggleContainer = styled.span`
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
`;

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <ToggleContainer onClick={toggleTheme}>
      {theme === 'dark' && <WiDaySunny size={40} color="#fff" />}
      {theme === 'light' && <WiNightClear size={40} color="#2d2d2d" />}
    </ToggleContainer>
  );
}

export default ThemeToggle;
