import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {
    --widget-background-color: rgba(0, 0, 0, 0.2);
    --widget-text-color-primary: #fff;
    --widget-text-color-secondary: #ccc;
    --widget-box-shadow: 0 4px 6px rgba(0, 0, 0, 0.25);
  }
  body {
    background-color: black;
    color: white;
    font-family: 'Wotfard', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
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
