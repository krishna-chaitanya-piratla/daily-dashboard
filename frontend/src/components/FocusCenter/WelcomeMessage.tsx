import React from 'react';
import { observer } from 'mobx-react-lite';
import { StyledEditMessageIcon, StyledWelcomeMessage, StyledWelcomeMessageContainer, StyledWelcomeMessageWrapper } from '../../styled-components/FocusCenter/WelcomeMessage';
import EditIcon from '@mui/icons-material/Edit';
import { useStore } from '../../store/StoreProvider';

const WelcomeMessage: React.FC = observer(() => {
  const { focusCenterStore } = useStore();

  return (
    <StyledWelcomeMessageContainer>
      <StyledWelcomeMessageWrapper>
        <StyledWelcomeMessage>
          {focusCenterStore.greeting}
        </StyledWelcomeMessage>
        <StyledEditMessageIcon className='edit-message-icon'>
          <EditIcon />
        </StyledEditMessageIcon>
      </StyledWelcomeMessageWrapper>
    </StyledWelcomeMessageContainer>
  );
});

export default WelcomeMessage;
