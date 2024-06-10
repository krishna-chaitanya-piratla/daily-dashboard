import styled from "styled-components";

export const StyledWelcomeMessageContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  z-index: 1; /* Ensure it has a lower z-index */
  max-width: 100%;
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

export const StyledWelcomeInput = styled.input`
  font-family: 'Wotfard';
  font-size: 4rem;
  color: var(--widget-text-color-primary);
  text-align: center;
  margin-top: -2rem;
  max-width: 100%;
  background: none;
  border: none;
  border-bottom: 1px solid var(--widget-text-color-primary);
  outline: none;
`;

export const StyledEditMessageIcon = styled.div`
  display: none; /* Hide by default */
  position: absolute; /* Position it absolutely */
  right: 0; /* Adjust the position so it doesn't affect the time component */
  font-size: 3rem;
  color: var(--widget-text-color-primary);
  cursor: pointer;
  margin-top: -2rem;
`;

export const StyledSaveIcon = styled(StyledEditMessageIcon)`
  right: 3rem; /* Position it left of the discard icon */
`;

export const StyledDiscardIcon = styled(StyledEditMessageIcon)`
  right: 0; /* Position it absolutely */
`;

export const StyledGreetingMessage = styled.div`
  font-size: 4rem;
  color: var(--widget-text-color-primary);
  text-align: center;
  margin-top: -2rem;
  max-width: 100%;
  margin-right: 0.5rem; /* Add some space between the greeting and the username */
`;
