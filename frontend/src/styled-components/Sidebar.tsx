import styled from 'styled-components';

export const StyledSidebarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: flex-start;
  align-items: stretch;
`;

export const StyledSidebar = styled.div`
  background-color: inherit;
  border: 0.5px solid gray;
  border-left: none;
  width: 20%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  position: relative; /* Ensure the close icon is positioned relative to the sidebar */
`;

export const StyledHamburgerIcon = styled.div`
  position: fixed;
  top: 10px;
  left: 10px;
  font-size: 24px;
  cursor: pointer;
  color: white;
  z-index: 1000;
`;

export const StyledCloseIcon = styled.div`
  font-size: 24px;
  cursor: pointer;
  color: white;
  position: absolute;
  top: 10px;
  right: 10px;
`;
