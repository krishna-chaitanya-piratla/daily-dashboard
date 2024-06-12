import styled from 'styled-components';

export const StyledSidebarContainer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  overflow-y: scroll;
  top: 0;
  left: 0;
  width: 25%;
  height: 100%;
  background-color: none;
  display: flex;
  justify-content: flex-start;
  align-items: stretch;
  transition: opacity 0.5s ease, visibility 0s linear 0s;
  opacity: ${(props) => (props.isOpen ? '1' : '0')};
  visibility: ${(props) => (props.isOpen ? 'visible' : 'hidden')};
  ${(props) => !props.isOpen && 'transition: opacity 0.5s ease, visibility 0s linear 0.5s;'}
  z-index: 1000; /* Ensure the sidebar is above other elements */

  /* Scrollbar styles */
  ::-webkit-scrollbar {
    width: 0;
  }

  ::-webkit-scrollbar-track {
    background: var(--widget-background-color);
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: var(--scrollbar-thumb-color);
    border-radius: 10px;
    border: none;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(--scrollbar-thumb-hover-color);
  }

  /* For Firefox */
  scrollbar-width: none;
  scrollbar-color: var(--scrollbar-thumb-color) var(--widget-background-color);

  /* For IE and older versions of Edge */
  -ms-overflow-style: -ms-autohiding-scrollbar;

  @media (max-width: 1600px) {
    width: 33%; /* Adjust width for smaller screens */
  }
`;

export const StyledSidebar = styled.div<{ isOpen: boolean }>`
  background-color: rgba(0, 0, 0, 0.5);
  border: 0.5px solid var(--separator-color);
  border-bottom: none;
  border-left: none;
  width: 100%;
  min-height: 100%;
  height: fit-content;
  padding: 1rem;
  box-sizing: border-box;
  position: relative;
  transform: translateX(${(props) => (props.isOpen ? '0' : '-100%')});
  transition: transform 0.3s ease;
  z-index: 1001; /* Ensure the sidebar content is above the backdrop */

  @media (max-width: 1024px) {
    padding: 0.5rem; /* Adjust padding for smaller screens */
  }
`;

export const StyledHamburgerIcon = styled.div`
  position: fixed;
  top: 0.5rem;
  left: 0.5rem;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--widget-text-color-primary);
  z-index: 1002; /* Ensure the hamburger icon is always on top */
`;

export const StyledCloseIcon = styled.div`
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--widget-text-color-primary);
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
`;
