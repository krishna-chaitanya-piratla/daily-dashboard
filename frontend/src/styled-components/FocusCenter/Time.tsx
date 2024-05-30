import styled from 'styled-components';

export const StyledTimeContainer = styled.div`
  display: inline-flex;
  align-items: center;
  position: relative;
  z-index: 1; /* Ensure it has a lower z-index */

  &:hover .more-icon {
    display: block;
  }
`;

export const StyledTime = styled.div`
  font-weight: 800;
  font-size: 10rem;
  color: white;
`;

export const StyledMoreIcon = styled.div`
  display: none; /* Hide by default */
  margin-left: 2rem; /* Adjust spacing as needed */
  font-size: 3rem;
  color: white;
  cursor: pointer;
`;
