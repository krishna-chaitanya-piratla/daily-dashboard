import React from 'react';
import Time from './Time';
import { StyledFocusCenter } from '../../styled-components/FocusCenter/FocusCenter';
import WelcomeMessage from './WelcomeMessage';

interface FocusCenterProps {
  username: string;
}

const FocusCenter: React.FC<FocusCenterProps> = ({ username }) => {
  return (
    <StyledFocusCenter>
      <Time displaySeconds={false} displayAMPM={false} display24Hour={false} />
      <WelcomeMessage userName={username} />
    </StyledFocusCenter>
  );
};

export default FocusCenter;
