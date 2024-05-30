import React, { useEffect, useState } from 'react';
import RefreshIcon from '@mui/icons-material/Refresh';
import { StyledJokeWidget, StyledJokeText, StyledRefreshIcon } from '../styled-components/JokeWidget';

const JokeWidget: React.FC = () => {
  const [joke, setJoke] = useState<string>('');

  const fetchJoke = async () => {
    try {
      const response = await fetch('https://icanhazdadjoke.com/', {
        headers: { 'Accept': 'application/json' },
      });
      const data = await response.json();
      setJoke(data.joke);
    } catch (error) {
      console.error('Error fetching joke:', error);
    }
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <StyledJokeWidget>
      <StyledJokeText>{joke}</StyledJokeText>
      <StyledRefreshIcon onClick={fetchJoke}>
        <RefreshIcon />
      </StyledRefreshIcon>
    </StyledJokeWidget>
  );
};

export default JokeWidget;
