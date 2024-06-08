import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { StyledLocationWeather, StyledLocation } from '../../styled-components/LocationWeather/LocationWeather';
import Weather from './Weather';
import { useStore } from '../../store/StoreProvider';

interface LocationWeatherProps {
  className?: string;
}

const LocationWeather: React.FC<LocationWeatherProps> = observer(() => {
  const { locationWeatherStore } = useStore();
  const [isVisible, setIsVisible] = useState<boolean>(locationWeatherStore.showLocationWeather);

  useEffect(() => {
    locationWeatherStore.fetchLocation();
    locationWeatherStore.fetchWeather();
  }, [locationWeatherStore]);

  useEffect(() => {
    if (locationWeatherStore.showLocationWeather) {
      setIsVisible(true);
    } else {
      const timeoutId = setTimeout(() => setIsVisible(false), 500);
      return () => clearTimeout(timeoutId);
    }
  })

  if (!isVisible) {
    return null;
  }

  return (
    <StyledLocationWeather className={locationWeatherStore.showLocationWeather ? 'fade-in' : 'fade-out'} >
      <Weather />
      <StyledLocation>{locationWeatherStore.location}</StyledLocation>
    </StyledLocationWeather>
  );
});

export default LocationWeather;
