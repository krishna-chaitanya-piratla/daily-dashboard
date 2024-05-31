import styled from 'styled-components';

export const StyledJokeWidget = styled.div`
    font-family: 'Sriracha', cursive;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--widget-background-color);
    box-shadow: var(--widget-box-shadow);
    padding: 0.75rem;
    border-radius: 10px;
    margin: 0.75rem;
    color: var(--widget-text-color-secondary);
    font-size: 1rem;
    width: fit-content;
    max-width: 33%;
    position: fixed;
    bottom: 1.25rem; /* Place it at the bottom */
    left: 50%; /* Move it to the center */
    transform: translateX(-50%); /* Adjust to center align */
    z-index: 1000; /* Ensure it's on top */
    word-wrap: break-word; /* Ensure long words break properly */
    overflow-wrap: break-word; /* Ensures long words break properly */
`;

export const StyledJokeText = styled.div`
  margin-right: 0.75rem;
`;

export const StyledRefreshIcon = styled.div`
  cursor: pointer;
  font-size: 1.5rem;
  color: var(--widget-text-color);
  margin-bottom: -0.75rem;
`;
