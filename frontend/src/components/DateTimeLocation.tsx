import React, { useEffect, useState } from 'react';
import { StyledDateTimeLocation, StyledTime, StyledDate, StyledLocation } from '../styled-components/DateTimeLocation';
import Draggable from 'react-draggable';
import axios from 'axios';

const DateTimeLocation: React.FC = () => {
  const [dateTime, setDateTime] = useState<{ time: string, date: string }>({ time: '', date: '' });
  const [location, setLocation] = useState<string>('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const time = now.toLocaleTimeString();
      const date = new Intl.DateTimeFormat('en-GB', {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }).format(now);
      setDateTime({ time, date });
    };
    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/ip`);
        const { data } = response.data;
        setLocation(`${data.city}, ${data.region}, ${data.country}`);
      } catch (error) {
        setLocation('Location not found');
      }
    };

    fetchLocation();
  }, []);

  return (
    <Draggable>
      <StyledDateTimeLocation>
        <StyledDate>{dateTime.date}</StyledDate>
        <StyledLocation>{location}</StyledLocation>
      </StyledDateTimeLocation>
    </Draggable>
  );
};

export default DateTimeLocation;
