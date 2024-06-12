import styled from 'styled-components';

export const StyledWelcomeMessageContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  z-index: 1; /* Ensure it has a lower z-index */
  max-width: 100%;
  text-align: center; /* Ensure text is centered */
`;

export const StyledWelcomeMessageWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  padding-right: 1rem; /* Ensure there's space for the icon */

  &:hover .edit-message-icon {
    display: block;
  }
`;

export const StyledWelcomeMessage = styled.div`
  font-size: clamp(1.5rem, 4vw, 4rem); /* Responsive typography */
  color: var(--widget-text-color-primary);
  margin-top: -1rem;
  max-width: 100%;
  margin-right: 2rem;

  @media (max-width: 1600px) {
    font-size: clamp(1.75rem, 2.5vw, 2.5rem); /* Adjust font size for smaller laptop screens */
  }
`;

export const StyledWelcomeInput = styled.input`
  font-family: 'Wotfard';
  font-size: clamp(1.5rem, 4vw, 4rem); /* Responsive typography */
  color: var(--widget-text-color-primary);
  margin-top: -1rem;
  margin-right: 3rem;
  max-width: 100%;
  background: none;
  border: none;
  border-bottom: 1px solid var(--widget-text-color-primary);
  outline: none;
  text-align: center;

  @media (max-width: 1600px) {
    font-size: clamp(1.75rem, 2.5vw, 2.5rem); /* Adjust font size for smaller laptop screens */
  }
`;

export const StyledEditMessageIcon = styled.div`
  display: none; /* Hide by default */
  position: absolute; /* Position it absolutely */
  right: 0rem; /* Adjust the position so it doesn't affect the time component */
  font-size: 2rem;
  color: var(--widget-text-color-primary);
  cursor: pointer;
  margin-top: -1rem;

  @media (max-width: 1600px) {
    font-size: 1.5rem;
  }
`;

export const StyledSaveIcon = styled(StyledEditMessageIcon)`
  right: 3rem; /* Position it left of the discard icon */
`;

export const StyledDiscardIcon = styled(StyledEditMessageIcon)`
  right: 0; /* Position it absolutely */
`;

export const StyledGreetingMessage = styled.div`
  font-size: clamp(1.5rem, 4vw, 4rem); /* Responsive typography */
  color: var(--widget-text-color-primary);
  text-align: center;
  margin-top: -1rem;
  max-width: 100%;
  margin-right: 0.5rem; /* Add some space between the greeting and the username */

  @media (max-width: 1600px) {
    font-size: clamp(1.75rem, 2.5vw, 2.5rem); /* Adjust font size for smaller laptop screens */
  }
`;
