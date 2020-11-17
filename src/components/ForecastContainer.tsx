import React from 'react';
import styled from 'styled-components';
import { lightTheme, darkTheme, Theme } from '../util';
import CurrentInfoWidget from './CurrentInfoWidget';
import DayWidget from './DayWidget';
import CustomLoader from './CustomLoader';
import Notify from './Notify';

export const ForecastContent = styled.div`
  padding: 3rem;
  @media (max-width: 900px) {
    padding: 4rem 0rem;
  }
`;

export const ForecastContentInner = styled.div`
  display: flex;
  justify-content: space-evenly;
  max-width: 100vw;
  width: 100%;
  margin: 0 auto;

  @media (max-width: 900px) {
    justify-content: flex-start;
    flex-direction: row;
    overflow-x: scroll;
    margin: 0 0.4rem;
  }
`;

interface Props {
  data: any;
  loading: boolean;
  theme: Theme;
}

function ForecastContainer({ data, loading, theme }: Props) {
  return (
    <>
      {loading ? (
        <CustomLoader />
      ) : data === null ? (
        <Notify>
          There was an error handling the request. Please try again soon.
        </Notify>
      ) : (
        <ForecastContent>
          <CurrentInfoWidget
            timezone={data.timezone}
            type={data.current.weather[0].main}
            icon={data.current.weather[0].icon}
            date={data.current.dt}
            loading={loading}
            temperature={data.current.temp}
          />

          <ForecastContentInner>
            {data &&
              data.daily
                .slice(0, 5)
                .map((el: any, idx: number) => (
                  <DayWidget
                    key={el.dt}
                    date={el.dt}
                    low={el.temp.min}
                    high={el.temp.max}
                    icon={el.weather[0].icon}
                    bgColor={
                      theme === 'dark'
                        ? darkTheme.cardColors[idx]
                        : lightTheme.cardColors[idx]
                    }
                  />
                ))}
          </ForecastContentInner>
        </ForecastContent>
      )}
    </>
  );
}

export default ForecastContainer;
