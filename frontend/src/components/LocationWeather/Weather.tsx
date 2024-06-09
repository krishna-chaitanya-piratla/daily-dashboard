import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../store/StoreProvider';
import { WeatherContainer, TemperatureUnit } from '../../styled-components/LocationWeather/Weather';

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
