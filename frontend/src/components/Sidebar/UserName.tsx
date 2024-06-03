import React, { useState, useEffect, useRef } from 'react';
import { InputContainer, StyledUserName, StyledUsernameEditIcon, HiddenTextSpan, StyledCheckIcon } from '../../styled-components/Sidebar/UserName';
import CheckIcon from '@mui/icons-material/Check';

const UserName: React.FC = () => {
  const [username, setUsername] = useState<string>('Stranger');
  const [inputWidth, setInputWidth] = useState<number>(0);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const textSpanRef = useRef<HTMLSpanElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (textSpanRef.current) {
      setInputWidth(textSpanRef.current.offsetWidth);
    }
  }, [username]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setIsEditing(false);
    }
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  return (
    <InputContainer>
      <StyledUserName
        type="text"
        value={username}
        onChange={handleUsernameChange}
        onKeyPress={handleKeyPress}
        onDoubleClick={handleDoubleClick}
        placeholder="Stranger"
        style={{ width: `${inputWidth}px` }}
        readOnly={!isEditing}
        ref={inputRef}
      />
      {isEditing ? (
        <StyledCheckIcon as={CheckIcon} onClick={handleSaveClick} />
      ) : (
        <StyledUsernameEditIcon onClick={handleEditClick} />
      )}
      <HiddenTextSpan ref={textSpanRef}>{username || 'Stranger'}</HiddenTextSpan>
    </InputContainer>
  );
};

export default UserName;
