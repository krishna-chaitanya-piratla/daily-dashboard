import React, { useState, useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../store/StoreProvider';
import { InputContainer, StyledUserName, StyledUsernameEditIcon, HiddenTextSpan, StyledCheckIcon, StyledClearIcon } from '../../styled-components/Sidebar/UserName';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

const UserName: React.FC = observer(() => {
  const { focusCenterStore } = useStore();
  const [tempUsername, setTempUsername] = useState<string>(focusCenterStore.userName);
  const [inputWidth, setInputWidth] = useState<number>(0);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const textSpanRef = useRef<HTMLSpanElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textSpanRef.current) {
      setInputWidth(textSpanRef.current.offsetWidth);
    }
  }, [tempUsername]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setTempUsername(focusCenterStore.userName);
        setIsEditing(false);
      }
    };

    const handleEscapePress = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setTempUsername(focusCenterStore.userName);
        setIsEditing(false);
      }
    };

    if (isEditing) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapePress);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapePress);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapePress);
    };
  }, [isEditing, focusCenterStore.userName]);

  useEffect(() => {
    setTempUsername(focusCenterStore.userName);
  }, [focusCenterStore.userName]);

  const handleSaveClick = async () => {
    await focusCenterStore.updateUserName(tempUsername);
    setIsEditing(false);
  };

  return (
    <InputContainer ref={containerRef}>
      <StyledUserName
        type="text"
        value={tempUsername}
        onChange={(event) => setTempUsername(event.target.value)}
        onKeyDown={async (event) => {
          if (event.key === 'Enter') {
            await handleSaveClick();
          } else if (event.key === 'Escape') {
            setTempUsername(focusCenterStore.userName);
            setIsEditing(false);
          }
        }}
        onDoubleClick={() => setIsEditing(true)}
        placeholder="Enter Name..."
        width={inputWidth}
        isEditing={isEditing}
        readOnly={!isEditing}
        ref={inputRef}
      />
      {isEditing ? (
        <>
          <StyledCheckIcon as={CheckIcon} onClick={handleSaveClick} />
          <StyledClearIcon as={ClearIcon} onClick={() => {
            setTempUsername(focusCenterStore.userName);
            setIsEditing(false);
          }} />
        </>
      ) : (
        <StyledUsernameEditIcon className="edit-icon" onClick={() => setIsEditing(true)} />
      )}
      <HiddenTextSpan ref={textSpanRef}>{tempUsername || 'Stranger'}</HiddenTextSpan>
    </InputContainer>
  );
});

export default UserName;
