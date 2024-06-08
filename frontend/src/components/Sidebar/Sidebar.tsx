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
  setBackgroundType: (type: 'custom' | 'solid') => void;
  setBackgroundValue: (value: string) => void;
  backgroundType: 'custom' | 'solid';
  backgroundValue: string;
  setRefreshTrigger: React.Dispatch<React.SetStateAction<number>>;
  customBackgroundColors: string[];
  setCustomBackgroundColors: (colors: string[]) => void;
  showJokeWidget: boolean;
  setShowJokeWidget: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({
  addTodoList,
  isOpen,
  onClose,
  onOpen,
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
            setBackgroundType={setBackgroundType}
            setBackgroundValue={setBackgroundValue}
            backgroundType={backgroundType}
            backgroundValue={backgroundValue}
            setRefreshTrigger={setRefreshTrigger}
            customBackgroundColors={customBackgroundColors}
            setCustomBackgroundColors={setCustomBackgroundColors}
            showJokeWidget={showJokeWidget}
            setShowJokeWidget={setShowJokeWidget}
          />
        </StyledSidebar>
      </StyledSidebarContainer>
    </>
  );
};

export default Sidebar;
