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
  z-index: 100; /* Ensure it has a higher z-index */
  position: relative; /* Ensure positioning context for the dropdown */
`;

const DropdownContainer = styled.div`
  position: relative;
`;

const Dropdown = styled.select`
  font-size: 14px;
  padding: 5px;
  margin-bottom: 10px;
  z-index: 101; /* Ensure the dropdown has a higher z-index */
  position: relative;
`;

interface WeatherProps {
  coords: string;
}

const Weather: React.FC<WeatherProps> = ({ coords }) => {
  const [temperature, setTemperature] = useState<number | null>(null);
  const [humidity, setHumidity] = useState<number | null>(null);
  const [units, setUnits] = useState<string>('imperial');

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/weather/current?units=${units}`
        );
        const weatherData = response.data.values;
        setTemperature(weatherData.temperature);
        setHumidity(weatherData.humidity);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeather();
  }, [units]);

  return (
    <WeatherContainer>
      <DropdownContainer>
        <Dropdown value={units} onChange={(e) => setUnits(e.target.value)}>
          <option value="imperial">Imperial</option>
          <option value="metric">Metric</option>
        </Dropdown>
      </DropdownContainer>
      <p>Temperature: {temperature !== null ? `${temperature}°${units === 'imperial' ? 'F' : 'C'}` : 'Loading...'}</p>
      <p>Humidity: {humidity !== null ? `${humidity}%` : 'Loading...'}</p>
    </WeatherContainer>
  );
};

export default Weather;
