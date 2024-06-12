import styled from 'styled-components';

export const StyledJokeWidget = styled.div`
  font-family: var(--font-family-secondary);
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
  max-width: 33%; /* Adjusted for better responsiveness */
  position: fixed;
  bottom: 1.25rem; /* Place it at the bottom */
  left: 50%; /* Center horizontally */
  transform: translateX(-50%); /* Center align */
  z-index: 1000; /* Ensure it's on top */
  word-wrap: break-word; /* Ensure long words break properly */
  overflow-wrap: break-word; /* Ensure long words break properly */
  transition: opacity 0.5s ease; /* Add transition for opacity */

  @media (max-width: 1600px) {
    font-size: 0.95rem;
    max-width: 25%; /* Adjust for larger screens */
  }

  &.fade-out {
    opacity: 0; /* Fade out effect */
  }
`;

export const StyledJokeText = styled.div`
  margin-right: 0.75rem;
`;

export const StyledRefreshIcon = styled.div`
  cursor: pointer;
  font-size: var(--icon-font-size);
  color: var(--widget-text-color-primary);
  margin-bottom: -0.75rem;
`;
