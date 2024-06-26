import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {
    --widget-background-color: rgba(0, 0, 0, 0.5);
    --widget-hover-background-color: rgba(0, 0, 0, 0.7);
    --widget-text-color-primary: #fff;
    --widget-text-color-secondary: #ccc;
    --widget-box-shadow: 0 4px 6px rgba(0, 0, 0, 0.25);
    --todo-text-color-primary: #ccc;
    --todo-text-color-secondary: gray;
    --todo-title-font-size: 1.5rem; /* Changed to relative unit */
    --icon-font-size: 1.2em;
    --input-focus-text-color: gray;
    --input-placeholder-color: gray;
    --separator-color: gray;
    --dropdown-icon-color: white;
    --dropdown-icon-hover-color: #ccc;
    --dropdown-menu-bg-color: rgba(0, 0, 0, 1);
    --dropdown-menu-shadow-color: rgba(0, 0, 0, 1);
    --dropdown-menu-text-color: inherit;
    --dropdown-menu-item-hover-bg-color: rgba(255, 255, 255, 0.2);
    --dropdown-menu-item-selected-bg-color: rgba(255, 255, 255, 0.3);
    --dropdown-menu-item-selected-hover-bg-color: rgba(255, 255, 255, 0.4);
    --todo-item-border-color: rgba(0, 0, 0, 0.3);
    --todo-edit-input-color: #ccc;
    --todo-edit-input-focus-bg: rgba(0, 0, 0, 0.2);
    --input-focus-box-shadow-color: #999;
    --input-hover-box-shadow-color: #999;
    --scrollbar-thumb-color: #999;
    --scrollbar-thumb-hover-color: #999;
  }

  html {
    font-size: 16px; /* Set base font-size */
  }

  body {
    background-color: black;
    color: white;
    font-family: 'Wotfard', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    overflow: hidden;
    ::selection {
      background: #ff0073;
      color: white;
      text-shadow: none;
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  .fade-in {
    animation: fadeIn 0.5s ease-in forwards;
  }

  .fade-out {
    animation: fadeOut 0.5s ease-out forwards;
  }
`;

export const Header = styled.header`
  position: fixed;
  top: 0;
  right: 0;
  padding: 0.5rem 1rem; /* Adjusted for better responsiveness */
`;

export const AppContainer = styled.div`
  text-align: center;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-size: cover;
  position: relative;
  z-index: 0;
  padding: 1rem; /* Added padding for better spacing on smaller screens */
  box-sizing: border-box;
  @media (max-width: 1024px) {
    padding: 0.5rem; /* Adjust padding for smaller laptop screens */
  }
  @media (min-width: 1025px) {
    padding: 2rem; /* Adjust padding for larger screens */
  }
`;
