import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import RefreshIcon from '@mui/icons-material/Refresh';
import { StyledJokeWidget, StyledJokeText, StyledRefreshIcon } from '../styled-components/JokeWidget';
import { useStore } from '../store/StoreProvider';

interface JokeWidgetProps {
  className?: string;
}

const JokeWidget: React.FC<JokeWidgetProps> = observer(({ className }) => {
  const { jokeStore } = useStore();

  useEffect(() => {
    jokeStore.fetchJoke();
  }, [jokeStore]);

  return (
    <StyledJokeWidget className={className}>
      <StyledJokeText>{jokeStore.joke}</StyledJokeText>
      <StyledRefreshIcon onClick={jokeStore.fetchJoke}>
        <RefreshIcon />
      </StyledRefreshIcon>
    </StyledJokeWidget>
  );
});

export default JokeWidget;
