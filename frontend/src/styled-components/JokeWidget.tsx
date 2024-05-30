import styled from 'styled-components';

export const StyledJokeWidget = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.2);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 10px;
  border-radius: 10px;
  margin: 10px;
  color: white;
  font-size: 1rem;
  width: fit-content;
  max-width: 33%;
  position: fixed;
  bottom: 20px; /* Place it at the bottom */
  left: 50%; /* Move it to the center */
  transform: translateX(-50%); /* Adjust to center align */
  z-index: 1000; /* Ensure it's on top */
  word-wrap: break-word; /* Ensure long words break properly */
  overflow-wrap: break-word; /* Ensures long words break properly */
`;

export const StyledJokeText = styled.div`
  margin-right: 10px;
`;

export const StyledRefreshIcon = styled.div`
  cursor: pointer;
  font-size: 1.5rem;
  color: white;
`;
