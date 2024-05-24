import React, { useEffect, useState } from 'react';
import { StyledDateTimeLocation, StyledTime, StyledDate, StyledLocation } from '../styled-components/DateTimeLocation';


const DateTimeLocation: React.FC = () => {
    const [dateTime, setDateTime] = useState<{ time: string, date: string }>({ time: '', date: '' });
    const [location, setLocation] = useState<string>('');

  useEffect(() => {
    const updateDateTime = () => {
    const now = new Date();
    const time = now.toLocaleTimeString();
    const date = now.toLocaleDateString();
    setDateTime({ time, date });
    };
    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchLocation = async () => {
        try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        setLocation(`${data.city}, ${data.region}, ${data.country}`);
        } catch (error) {
        setLocation('Location not found');
        }
    };
    fetchLocation();
  }, []);

  return (
    <StyledDateTimeLocation>
      <StyledTime>{dateTime.time}</StyledTime>
      <StyledDate>{dateTime.date}</StyledDate>
      <StyledLocation>{location}</StyledLocation>
    </StyledDateTimeLocation>
  );
};

export default DateTimeLocation;