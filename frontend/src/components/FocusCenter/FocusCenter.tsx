import React from 'react';
import Time from './Time';
import { StyledFocusCenter } from '../../styled-components/FocusCenter/FocusCenter';

const FocusCenter: React.FC = () => {
  return (
    <StyledFocusCenter>
      <Time displaySeconds={false} displayAMPM={true} display24Hour={false} />
    </StyledFocusCenter>
  );
};

export default FocusCenter;
