import styled from 'styled-components';

export const StyledFocusCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10; /* Ensure it appears above other elements */
`;
