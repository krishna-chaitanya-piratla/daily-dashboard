import styled from 'styled-components';

export const StyledTimeContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  z-index: 1; /* Ensure it has a lower z-index */
`;

export const StyledTimeWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  padding-right: 3rem; /* Ensure there's space for the icon */

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
  position: absolute; /* Position it absolutely */
  right: 0; /* Adjust the position so it doesn't affect the time component */
  font-size: 3rem;
  color: white;
  cursor: pointer;
`;
