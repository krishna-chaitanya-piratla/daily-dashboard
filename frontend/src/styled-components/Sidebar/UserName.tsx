import styled from 'styled-components';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  overflow: hidden;
`;

export const StyledUserName = styled.input`
  background: none;
  border: none;
  color: var(--widget-text-color-primary);
  font-size: 2rem;
  outline: none;
  width: auto;
  min-width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  ::placeholder {
    color: var(--widget-text-color-primary);
  }
`;

export const StyledUsernameEditIcon = styled(EditIcon)`
  font-size: 0.75rem; 
  color: var(--widget-text-color-primary);
  margin-left: 1.5rem; /* Gap between text and icon */
  flex-shrink: 0;
  cursor: pointer;
`;

export const StyledCheckIcon = styled(CheckIcon)`
  font-size: 0.75rem; 
  color: var(--widget-text-color-primary);
  margin-left: 1.5rem; /* Gap between text and icon */
  flex-shrink: 0;
  cursor: pointer;
`;

export const HiddenTextSpan = styled.span`
  position: absolute;
  visibility: hidden;
  white-space: nowrap;
  font-size: 1rem; /* Ensure this matches the StyledInput font-size */
`;
