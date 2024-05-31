import styled from "styled-components";

export const StyledWelcomeMessageContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  z-index: 1; /* Ensure it has a lower z-index */
  max-width: 70%;
`;

export const StyledWelcomeMessageWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  padding-right: 3rem; /* Ensure there's space for the icon */

  &:hover .edit-message-icon {
    display: block;
  }
`;

export const StyledWelcomeMessage = styled.div`
    font-size: 4rem;
    color: var(--widget-text-color-primary);
    text-align: center;
    margin-top: -2rem;
    max-width: 100%;
`;

export const StyledEditMessageIcon = styled.div`
    display: none; /* Hide by default */
    position: absolute; /* Position it absolutely */
    right: 0; /* Adjust the position so it doesn't affect the time component */
    font-size: 3rem;
    color: white;
    cursor: pointer;
    margin-top: -2rem;
`;