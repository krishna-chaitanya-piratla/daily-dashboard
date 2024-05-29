import styled from 'styled-components';

export const StyledSidebarContainer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: flex-start;
  align-items: stretch;
  transition: opacity 0.5s ease, visibility 0s linear 0s;
  opacity: ${(props) => (props.isOpen ? '1' : '0')};
  visibility: ${(props) => (props.isOpen ? 'visible' : 'hidden')};
  ${(props) => !props.isOpen && 'transition: opacity 0.5s ease, visibility 0s linear 0.5s;'} 
`;

export const StyledSidebar = styled.div<{ isOpen: boolean }>`
  background-color: inherit;
  border: 0.5px solid gray;
  border-left: none;
  width: 10%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  position: relative;
  transform: translateX(${(props) => (props.isOpen ? '0' : '-100%')});
  transition: transform 0.3s ease;
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
