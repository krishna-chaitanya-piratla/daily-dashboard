import React, { useState, useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { StyledEditMessageIcon, StyledWelcomeMessage, StyledWelcomeMessageContainer, StyledWelcomeMessageWrapper, StyledWelcomeInput, StyledSaveIcon, StyledDiscardIcon, StyledGreetingMessage } from '../../styled-components/FocusCenter/WelcomeMessage';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { useStore } from '../../store/StoreProvider';

const WelcomeMessage: React.FC = observer(() => {
  const { focusCenterStore } = useStore();
  const [isEditing, setIsEditing] = useState(false);
  const [tempUserName, setTempUserName] = useState(focusCenterStore.userName);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleEditClick = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleSaveClick = async () => {
    await focusCenterStore.updateUserName(tempUserName); // Ensure async update
    setIsEditing(false);
  };

  const handleDiscardClick = () => {
    setTempUserName(focusCenterStore.userName);
    setIsEditing(false);
  };

  const handleKeyDown = async (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      await handleSaveClick();
    } else if (e.key === 'Escape') {
      handleDiscardClick();
    }
  };

  useEffect(() => {
    setTempUserName(focusCenterStore.userName);
  }, [focusCenterStore.userName]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <StyledWelcomeMessageContainer>
      <StyledWelcomeMessageWrapper>
        <StyledGreetingMessage>
          {focusCenterStore.getGreeting()},
        </StyledGreetingMessage>
        {isEditing ? (
          <>
            <StyledWelcomeInput
              ref={inputRef}
              value={tempUserName}
              onChange={(e) => setTempUserName(e.target.value)}
              onKeyDown={handleKeyDown}
              style={{ width: `${tempUserName.length}ch` }}
            />
            <StyledSaveIcon className='edit-message-icon' onClick={handleSaveClick}>
              <CheckIcon />
            </StyledSaveIcon>
            <StyledDiscardIcon className='edit-message-icon' onClick={handleDiscardClick}>
              <ClearIcon />
            </StyledDiscardIcon>
          </>
        ) : (
          <>
            <StyledWelcomeMessage>
              {focusCenterStore.userName}
            </StyledWelcomeMessage>
            <StyledEditMessageIcon className='edit-message-icon' onClick={handleEditClick}>
              <EditIcon />
            </StyledEditMessageIcon>
          </>
        )}
      </StyledWelcomeMessageWrapper>
    </StyledWelcomeMessageContainer>
  );
});

export default WelcomeMessage;
