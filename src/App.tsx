import React, { useEffect, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { ThemeToggle, ForecastContainer, Geolocation } from './components';
import { lightTheme, darkTheme, useLocation, useTheme } from './util';
import { getWeather } from './util/services';

const MainContainer = styled.div`
  background: ${(props) => props.theme.background};
  min-height: 100vh;
  height: 100%;
  max-width: 100vw;
  margin: 0;
  overflow: hidden;
`;

function App() {
  const { locationError, location, loadingLocation } = useLocation();
  const { theme, toggleTheme } = useTheme();

  const [weatherData, setWeatherData] = useState<any>({});
  const [loadingWeather, setLoadingWeather] = useState<boolean>(true);

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
        setWeatherData(null);
      } else {
        setWeatherData(res.data);
      }
      setLoadingWeather(false);
    }
  };

  return (
    <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
      <MainContainer>
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

        <Geolocation error={locationError} loading={loadingLocation} />

        <ForecastContainer
          data={weatherData}
          loading={loadingWeather}
          theme={theme}
        />
      </MainContainer>
    </ThemeProvider>
  );
}

export default App;
