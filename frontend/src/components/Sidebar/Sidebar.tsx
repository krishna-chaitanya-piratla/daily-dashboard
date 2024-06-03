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
}

const Sidebar: React.FC<SidebarProps> = ({ addTodoList, isOpen, onClose, onOpen }) => {
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
          <SidebarContents />
        </StyledSidebar>
      </StyledSidebarContainer>
    </>
  );
};

export default Sidebar;
