import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { StyledLocationWeather, StyledLocation } from '../../styled-components/LocationWeather/LocationWeather';
import Weather from './Weather';
import { useStore } from '../../store/StoreProvider';

const LocationWeather: React.FC = observer(() => {
  const { locationWeatherStore } = useStore();

  useEffect(() => {
    locationWeatherStore.fetchLocation();
  }, [locationWeatherStore]);

  return (
    <StyledLocationWeather>
      <Weather />
      <StyledLocation>{locationWeatherStore.location}</StyledLocation>
    </StyledLocationWeather>
  );
});

export default LocationWeather;
