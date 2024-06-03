import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {
    --widget-background-color: rgba(0, 0, 0, 0.5);
    --widget-text-color-primary: #fff;
    --widget-text-color-secondary: #ccc;
    --widget-box-shadow: 0 4px 6px rgba(0, 0, 0, 0.25);
    --todo-text-color-primary: #ccc;
    --todo-text-color-secondary: gray;
    --todo-title-font-size: 24px;
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
    --todo-edit-input-color: gray;
    --todo-edit-input-focus-bg: rgba(0, 0, 0, 0.2);
    --input-focus-box-shadow-color: #999;
    --input-hover-box-shadow-color: #999;
  }
  body {
    background-color: black;
    color: white;
    font-family: 'Wotfard', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    ::selection {
      background: #ff0073;
      color: white;
      text-shadow: none;
    }
  }
`;

export const Header = styled.header`
  position: fixed;
  top: 0;
  right: 0;
  padding: 10px;
`;

export const AppContainer = styled.div`
  text-align: center;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-size: cover; /* Ensure the background image covers the entire container */
  position: relative;
`;
