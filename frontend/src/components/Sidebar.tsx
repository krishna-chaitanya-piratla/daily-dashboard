import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { StyledSidebarContainer, StyledSidebar, StyledHamburgerIcon, StyledCloseIcon } from '../styled-components/Sidebar';

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openSidebar = () => {
    setIsOpen(true);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      closeSidebar();
    }
  };

  return (
    <>
      <StyledHamburgerIcon onClick={openSidebar}>
        <MenuIcon />
      </StyledHamburgerIcon>
      {isOpen && (
        <StyledSidebarContainer onClick={handleOverlayClick}>
          <StyledSidebar>
            <StyledCloseIcon onClick={closeSidebar}>
              <CloseIcon />
            </StyledCloseIcon>
            {/* Add your sidebar content here */}
          </StyledSidebar>
        </StyledSidebarContainer>
      )}
    </>
  );
};

export default Sidebar;
