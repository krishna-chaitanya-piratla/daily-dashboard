import styled from 'styled-components';

export const StyledTimeContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  z-index: 1;
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
  font-size: 8rem; /* Adjusted for better responsiveness */
  color: var(--widget-text-color-primary);
  
  @media (max-width: 1600px) {
    font-size: 6.5rem; /* Adjust font size for smaller laptop screens */
  }
`;

export const StyledMoreIcon = styled.div`
  display: none; /* Hide by default */
  position: absolute;
  right: 0; /* Adjust the position so it doesn't affect the time component */
  font-size: 2rem; /* Adjusted for better responsiveness */
  color: var(--widget-text-color-primary);
  cursor: pointer;
`;
