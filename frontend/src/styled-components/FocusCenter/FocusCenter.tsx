import styled from 'styled-components';

export const StyledFocusCenter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem; /* Adjusted for better spacing */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  text-align: center; /* Center align text */

  @media (max-width: 1024px) {
    padding: 1rem; /* Adjust padding for smaller laptop screens */
  }

  @media (min-width: 1025px) {
    padding: 3rem; /* Adjust padding for larger screens */
  }
`;
