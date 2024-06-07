import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const WeatherContainer = styled.div`
  font-family: var(--font-family-primary);
  font-size: 14px;
  text-align: right;
  border: 1px solid none;
  border-radius: 10px;
  padding: 10px;
  margin: 10px;
  display: inline-block;
  color: var(--widget-text-color-secondary);
  box-sizing: border-box;
`;

interface WeatherProps {
  coords: string;
}

const Weather: React.FC<WeatherProps> = ({ coords }) => {
  const [temperature, setTemperature] = useState<number | null>(null);
  const [humidity, setHumidity] = useState<number | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/weather/current`
        );
        const weatherData = response.data.values;
        setTemperature(weatherData.temperature);
        setHumidity(weatherData.humidity);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeather();
  }, []);

  return (
    <WeatherContainer>
      <p>Temperature: {temperature !== null ? `${temperature}°F` : 'Loading...'}</p>
      <p>Humidity: {humidity !== null ? `${humidity}%` : 'Loading...'}</p>
    </WeatherContainer>
  );
};

export default Weather;
