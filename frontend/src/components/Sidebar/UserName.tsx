import React, { useState, useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../store/StoreProvider';
import { InputContainer, StyledUserName, StyledUsernameEditIcon, HiddenTextSpan, StyledCheckIcon, StyledClearIcon } from '../../styled-components/Sidebar/UserName';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import {
  handleUsernameChange,
  handleEditClick,
  handleSaveClick,
  handleClearClick,
  handleKeyPress,
  handleDoubleClick
} from '../../utils/sidebarFunctions';

const UserName: React.FC = observer(() => {
  const { focusCenterStore } = useStore();
  const [tempUsername, setTempUsername] = useState<string>(focusCenterStore.userName ? focusCenterStore.userName : 'Stranger');
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
        handleClearClick(focusCenterStore.userName, setTempUsername, setIsEditing);
      }
    };

    const handleEscapePress = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClearClick(focusCenterStore.userName, setTempUsername, setIsEditing);
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
  }, [isEditing]);

  return (
    <InputContainer ref={containerRef}>
      <StyledUserName
        type="text"
        value={tempUsername}
        onChange={(event) => handleUsernameChange(event, setTempUsername)}
        onKeyDown={(event) => handleKeyPress(event, tempUsername, focusCenterStore.setUserName, setIsEditing)}
        onDoubleClick={() => handleDoubleClick(focusCenterStore.userName, setTempUsername, setIsEditing)}
        placeholder={focusCenterStore.userName ? focusCenterStore.userName : "Enter Name..."}
        width={inputWidth}
        isEditing={isEditing}
        readOnly={!isEditing}
        ref={inputRef}
      />
      {isEditing ? (
        <>
          <StyledCheckIcon as={CheckIcon} onClick={() => handleSaveClick(tempUsername, focusCenterStore.setUserName, setIsEditing)} />
          <StyledClearIcon as={ClearIcon} onClick={() => handleClearClick(focusCenterStore.userName, setTempUsername, setIsEditing)} />
        </>
      ) : (
        <StyledUsernameEditIcon className="edit-icon" onClick={() => handleEditClick(focusCenterStore.userName, setTempUsername, setIsEditing)} />
      )}
      <HiddenTextSpan ref={textSpanRef}>{tempUsername || 'Stranger'}</HiddenTextSpan>
    </InputContainer>
  );
});

export default UserName;
