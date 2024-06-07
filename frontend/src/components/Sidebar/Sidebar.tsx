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
  customBackgroundColors: string[];
  setCustomBackgroundColors: (colors: string[]) => void;
  showJokeWidget: boolean; // New prop for joke widget visibility
  setShowJokeWidget: React.Dispatch<React.SetStateAction<boolean>>; // New prop for setting joke widget visibility
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
  customBackgroundColors,
  setCustomBackgroundColors,
  showJokeWidget,
  setShowJokeWidget
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
            customBackgroundColors={customBackgroundColors}
            setCustomBackgroundColors={setCustomBackgroundColors}
            showJokeWidget={showJokeWidget} // Pass down the state
            setShowJokeWidget={setShowJokeWidget} // Pass down the setter
          />
        </StyledSidebar>
      </StyledSidebarContainer>
    </>
  );
};

export default Sidebar;
