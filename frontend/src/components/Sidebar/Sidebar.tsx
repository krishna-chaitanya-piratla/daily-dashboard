import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { StyledSidebarContainer, StyledSidebar, StyledHamburgerIcon, StyledCloseIcon } from '../../styled-components/Sidebar/Sidebar';
import SidebarContents from './SidebarContents';

interface SidebarProps {
  addTodoList: () => void;
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  username: string;
  setBackgroundType: (type: 'custom' | 'solid') => void;
  setBackgroundValue: (value: string) => void;
  backgroundType: 'custom' | 'solid';
  backgroundValue: string;
  setRefreshTrigger: React.Dispatch<React.SetStateAction<number>>;
}

const Sidebar: React.FC<SidebarProps> = ({
  addTodoList,
  isOpen,
  onClose,
  onOpen,
  setUsername,
  username,
  setBackgroundType,
  setBackgroundValue,
  backgroundType,
  backgroundValue,
  setRefreshTrigger,
}) => {
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      <StyledHamburgerIcon onClick={onOpen}>
        <MenuIcon />
      </StyledHamburgerIcon>
      <StyledSidebarContainer isOpen={isOpen} onClick={handleOverlayClick}>
        <StyledSidebar isOpen={isOpen}>
          <StyledCloseIcon onClick={onClose}>
            <CloseIcon />
          </StyledCloseIcon>
          <SidebarContents
            addTodoList={addTodoList}
            setUsername={setUsername}
            username={username}
            setBackgroundType={setBackgroundType}
            setBackgroundValue={setBackgroundValue}
            backgroundType={backgroundType}
            backgroundValue={backgroundValue}
            setRefreshTrigger={setRefreshTrigger}
          />
        </StyledSidebar>
      </StyledSidebarContainer>
    </>
  );
};

export default Sidebar;
