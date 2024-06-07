import styled from 'styled-components';

export const StyledFocusCenter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px; /* Add padding inside */
  position: absolute; /* Center it within the parent */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* Center it */
  z-index: 1; /* Ensure it has a lower z-index */
  
`;
