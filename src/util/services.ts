import { axiosInstance } from './axios';

/**
 * API call to get weather data.
 */
export const getWeather = async (lat: number, lon: number) => {
  try {
    const weather = await axiosInstance.get('weather/forecast', {
      params: {
        lat,
        lon,
      },
    });

    return weather;
  } catch (error) {
    return error;
  }
};
