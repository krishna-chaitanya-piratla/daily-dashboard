import React, { useState, useEffect } from 'react';
import { StyledTime } from '../../styled-components/FocusCenter/Time';

interface TimeProps {
  displaySeconds?: boolean;
  displayAMPM?: boolean;
  display24Hour?: boolean;
}

const Time: React.FC<TimeProps> = ({
  displaySeconds = false,
  displayAMPM = true,
  display24Hour = false,
}) => {
  const [time, setTime] = useState<string>(formatTime(new Date()));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(formatTime(new Date()));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [displaySeconds, displayAMPM, display24Hour]);

  function formatTime(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: 'numeric',
      second: displaySeconds ? 'numeric' : undefined,
      hour12: !display24Hour,
    };

    let timeString = date.toLocaleTimeString(undefined, options);

    // If we don't want to display AM/PM, remove it from the time string
    if (!displayAMPM && !display24Hour) {
      timeString = timeString.replace(/ AM| PM/, '');
    }

    return timeString;
  }

  return <StyledTime>{time}</StyledTime>;
};

export default Time;
