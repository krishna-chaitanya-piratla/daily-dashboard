import React from 'react';
import Time from './Time';
import { StyledFocusCenter } from '../../styled-components/FocusCenter/FocusCenter';
import WelcomeMessage from './WelcomeMessage';

const FocusCenter: React.FC = () => {
  return (
    <StyledFocusCenter>
      <Time displaySeconds={false} displayAMPM={false} display24Hour={false} />
      <WelcomeMessage />
    </StyledFocusCenter>
  );
};

export default FocusCenter;
