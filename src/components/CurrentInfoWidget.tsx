import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import format from 'date-fns/format';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 400px;
  margin-bottom: 5rem;
  margin-left: 3rem;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: -2rem;
  margin-left: -2rem;
`;

const Location = styled.h2`
  color: ${(props) => props.theme.fontColor};
  font-size: 2rem;
  margin: 0;
`;

const DateContainer = styled.h3`
  color: ${(props) => props.theme.fontColor};
  font-size: 1.4rem;
  margin: 0;
  font-weight: 300;
`;

const Temperature = styled.h3`
  color: ${(props) => props.theme.fontColor};
  font-size: 4rem;
  text-align: left;
`;

const Type = styled.p`
  color: ${(props) => props.theme.fontColor};
  font-size: 1.4rem;
  margin: 0;
  font-weight: 300;
`;

interface Props {
  timezone: string;
  date: number;
  type: string;
  temperature: number;
  loading: boolean;
  icon: string;
}

function CurrentInfoWidget({
  timezone,
  date,
  type,
  loading,
  temperature,
  icon,
}: Props) {
  const { fontColor } = useContext(ThemeContext);

  return (
    <Container>
      {!loading && (
        <>
          <Location>{timezone}</Location>
          <DateContainer>
            {format(new Date(date * 1000), "EEEE dd',' MMMM")}
          </DateContainer>

          <InfoContainer>
            <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} />
            <Temperature>
              {temperature.toFixed(0)}&deg; <Type>{type}</Type>
            </Temperature>
          </InfoContainer>
        </>
      )}
    </Container>
  );
}

export default CurrentInfoWidget;
