import React from 'react';
import { observer } from 'mobx-react-lite';
import Time from './Time';
import { StyledFocusCenter } from '../../styled-components/FocusCenter/FocusCenter';
import WelcomeMessage from './WelcomeMessage';
import { useStore } from '../../store/StoreProvider';

const FocusCenter: React.FC = observer(() => {
  const { focusCenterStore } = useStore();

  return (
    <StyledFocusCenter>
      <Time 
        displaySeconds={focusCenterStore.displaySeconds} 
        displayAMPM={focusCenterStore.displayAMPM} 
        display24Hour={focusCenterStore.display24Hour} 
      />
      <WelcomeMessage />
    </StyledFocusCenter>
  );
});

export default FocusCenter;
