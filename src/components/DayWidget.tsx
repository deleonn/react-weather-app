import React from 'react';
import styled from 'styled-components';
import format from 'date-fns/format';

const Container = styled.div<{ bgColor: string | undefined }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 20px;
  color: ${(props) => props.theme.fontColor};
  background: ${(props) => props.bgColor};
  width: calc(100vw / 5);
  max-width: 220px;
  height: 254px;
  margin: 0 0.6rem;

  @media (max-width: 900px) {
    width: 150px;
    padding: 0 1rem;
    margin: 0 0.5rem;
    height: 200px;
  }
`;

const Title = styled.h3`
  font-size: 1.4em;
  margin: 0;
  padding: 0;
  font-weight: 300;
`;

const TemperatureContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: space-evenly;
  width: 100%;
`;

const Description = styled.p`
  color: ${(props) => props.theme.fontColor};
`;

interface Props {
  date: number;
  icon?: any;
  high?: number;
  low?: number;
  bgColor?: string;
}

function DayWidget({ date, icon, high, low, bgColor }: Props) {
  return (
    <Container bgColor={bgColor}>
      <Title>{format(new Date(date * 1000), 'EEEE')}</Title>
      <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} />
      <TemperatureContainer>
        <Description>L: {low?.toFixed(0)}&deg;</Description>
        <Description>H: {high?.toFixed(0)}&deg;</Description>
      </TemperatureContainer>
    </Container>
  );
}

export default DayWidget;
