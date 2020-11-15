import React, { useEffect, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { WiDaySunny, WiNightClear } from 'weather-icons-react';
import { CurrentInfoWidget, DayWidget, Notify } from './components';
import { lightTheme, darkTheme, useLocation, useTheme } from './util';
import { getWeather } from './util/services';

const MainContainer = styled.div`
  background: ${(props) => props.theme.background};
  height: 100vh;
  max-width: 100vw;
  margin: 0;
  overflow: hidden;
`;

const ForecastContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  max-width: 100vw;
  width: 100%;
  margin: 0 auto;
`;

const ThemeToggle = styled.span`
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
`;

function App() {
  const { locationError, location, loading } = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [weatherData, setWeatherData] = useState<any>({});
  const [loadingWeather, setLoadingWeather] = useState<boolean>(true);
  const [requestError, setRequestError] = useState<boolean>(false);

  useEffect(() => {
    if (!Object.keys(weatherData).length) {
      fetchData();
    }
  }, [location]);

  const fetchData = async () => {
    if (location !== null && Object.keys(location!)) {
      const res = await getWeather(location!.latitude, location!.longitude);

      // Something wrong happened, handle error
      if (res.status !== 200) {
        setRequestError(true);
      } else {
        setWeatherData(res.data);
      }
      setLoadingWeather(false);
    }
  };

  return (
    <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
      <MainContainer>
        <ThemeToggle onClick={toggleTheme}>
          {theme === 'dark' && <WiDaySunny size={40} color="#fff" />}
          {theme === 'light' && <WiNightClear size={40} color="#2d2d2d" />}
        </ThemeToggle>

        {locationError && <Notify>{locationError}</Notify>}

        {(loading || loadingWeather) && (
          <Notify>
            Loading... be sure your browser allows sharing your current location
          </Notify>
        )}

        {requestError && (
          <Notify>
            There was an error handling the request. Please try again soon.
          </Notify>
        )}

        {!loadingWeather && !requestError && (
          <div style={{ padding: '3rem' }}>
            <CurrentInfoWidget
              timezone={weatherData.timezone}
              type={weatherData.current.weather[0].main}
              icon={weatherData.current.weather[0].icon}
              date={weatherData.current.dt}
              loading={loadingWeather}
              temperature={weatherData.current.temp}
            />

            <ForecastContainer>
              {weatherData &&
                weatherData.daily
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
            </ForecastContainer>
          </div>
        )}
      </MainContainer>
    </ThemeProvider>
  );
}

export default App;
