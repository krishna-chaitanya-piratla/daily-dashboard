import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import { useStore } from '../../store/StoreProvider';

const WeatherContainer = styled.div`
  font-family: var(--font-family-primary);
  font-size: 14px;
  text-align: left;
  border: 1px solid none;
  border-radius: 10px;
  padding: 0px;
  margin: 0px;
  display: inline-block;
  color: var(--widget-text-color-secondary);
  box-sizing: border-box;
  z-index: 100; /* Ensure it has a higher z-index */
  position: relative; /* Ensure positioning context for the dropdown */
`;

const TemperatureUnit = styled.span<{ isSelected: boolean }>`
  cursor: pointer;
  margin-left: 5px;
  color: ${(props) => (props.isSelected ? 'inherit' : 'gray')};
`;

const Weather: React.FC = observer(() => {
  const { locationWeatherStore } = useStore();

  useEffect(() => {
    locationWeatherStore.fetchWeather();
  }, [locationWeatherStore, locationWeatherStore.units]);

  const handleUnitChange = (unit: string) => {
    locationWeatherStore.setUnits(unit);
  };

  return (
    <WeatherContainer>
      <p>
        Temperature: 
        {locationWeatherStore.temperature !== null ? `${locationWeatherStore.temperature}°` : 'Loading...'}
        {locationWeatherStore.units === 'imperial' ? (
          <>
            <TemperatureUnit isSelected={true}>F</TemperatureUnit>
            <TemperatureUnit isSelected={false} onClick={() => handleUnitChange('metric')}>C</TemperatureUnit>
          </>
        ) : (
          <>
            <TemperatureUnit isSelected={true}>C</TemperatureUnit>
            <TemperatureUnit isSelected={false} onClick={() => handleUnitChange('imperial')}>F</TemperatureUnit>
          </>
        )}
      </p>
      <p>Humidity: {locationWeatherStore.humidity !== null ? `${locationWeatherStore.humidity}%` : 'Loading...'}</p>
    </WeatherContainer>
  );
});

export default Weather;
