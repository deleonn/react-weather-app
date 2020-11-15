import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  flex: 1;
`;

const Message = styled.h3`
  color: ${(props) => props.theme.fontColor};
  font-size: 4;
  margin: 0;
`;

function Notify({ children }: { children: React.ReactChild }) {
  return (
    <Container>
      <Message>{children}</Message>
    </Container>
  );
}

export default Notify;
