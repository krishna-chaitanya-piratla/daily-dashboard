import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import RefreshIcon from '@mui/icons-material/Refresh';
import { StyledJokeWidget, StyledJokeText, StyledRefreshIcon } from '../styled-components/JokeWidget';
import { useStore } from '../store/StoreProvider';

interface JokeWidgetProps {
  className?: string;
}

const JokeWidget: React.FC<JokeWidgetProps> = observer(({ className }) => {
  const { jokeStore } = useStore();
  const [isVisible, setIsVisible] = useState<boolean>(jokeStore.showJokeWidget);

  useEffect(() => {
    jokeStore.fetchJoke();
  }, [jokeStore]);

  useEffect(() => {
    if (jokeStore.showJokeWidget) {
      setIsVisible(true);
    } else {
      const timeoutId = setTimeout(() => setIsVisible(false), 500); // Wait for fade-out transition
      return () => clearTimeout(timeoutId);
    }
  }, [jokeStore.showJokeWidget]);

  if (!isVisible) {
    return null;
  }

  return (
    <StyledJokeWidget className={jokeStore.showJokeWidget ? 'fade-in' : 'fade-out'}>
      <StyledJokeText>{jokeStore.joke}</StyledJokeText>
      <StyledRefreshIcon onClick={jokeStore.fetchJoke}>
        <RefreshIcon />
      </StyledRefreshIcon>
    </StyledJokeWidget>
  );
});

export default JokeWidget;
