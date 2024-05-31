import React, { useEffect, useState } from 'react';
import { StyledLocationWeather, StyledLocation } from '../../styled-components/LocationWeather/LocationWeather';
import axios from 'axios';

const LocationWeather: React.FC = () => {
  const [location, setLocation] = useState<string>('');

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/ip`);
        const { data } = response.data;
        setLocation(`${data.city}, ${data.region}`);
      } catch (error) {
        setLocation('Location not found');
      }
    };

    fetchLocation();
  }, []);

  return (
      <StyledLocationWeather>
        <StyledLocation>{location}</StyledLocation>
      </StyledLocationWeather>
  );
};

export default LocationWeather;
