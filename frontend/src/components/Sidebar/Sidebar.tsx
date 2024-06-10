import React, { useEffect, useRef } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { StyledSidebarContainer, StyledSidebar, StyledHamburgerIcon, StyledCloseIcon } from '../../styled-components/Sidebar/Sidebar';
import SidebarContents from './SidebarContents';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  onOpen,
}) => {
  const sidebarRef = useRef<HTMLDivElement>(null);

  const handleOverlayClick = (e: MouseEvent) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleOverlayClick);
    } else {
      document.removeEventListener('mousedown', handleOverlayClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOverlayClick);
    };
  }, [isOpen]);

  return (
    <>
      <StyledHamburgerIcon onClick={onOpen}>
        <MenuIcon />
      </StyledHamburgerIcon>
      <StyledSidebarContainer isOpen={isOpen}>
        <StyledSidebar ref={sidebarRef} isOpen={isOpen}>
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
