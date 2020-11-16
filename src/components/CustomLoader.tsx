import React from 'react';
import styled from 'styled-components';
import Loader from 'react-loader-spinner';
import { useTheme, darkTheme, lightTheme } from '../util';

const Container = styled.div`
  width: inherit;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function CustomLoader() {
  const { theme } = useTheme();

  return (
    <Container>
      <Loader
        type="Rings"
        color={theme === 'dark' ? darkTheme.fontColor : lightTheme.fontColor}
        height={100}
        width={100}
      />
    </Container>
  );
}

export default CustomLoader;
