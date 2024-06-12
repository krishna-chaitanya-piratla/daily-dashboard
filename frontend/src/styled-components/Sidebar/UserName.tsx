import styled from 'styled-components';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

interface StyledUserNameProps {
  isEditing: boolean;
  width: number;
}

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  overflow: hidden;

  &:hover .edit-icon {
    visibility: visible;
  }
`;

export const StyledUserName = styled.input<StyledUserNameProps>`
  background: none;
  border: none;
  color: ${(props) => (props.isEditing ? 'var(--widget-text-color-primary)' : 'var(--widget-text-color-secondary)')};
  font-size: 1.5rem;
  outline: none;
  width: ${(props) => `${props.width}px`};
  min-width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  ::placeholder {
    color: var(--widget-text-color-primary);
  }

  @media (max-width: 1024px) {
    font-size: 1.25rem; /* Adjust font size for smaller screens */
  }
`;

export const StyledUsernameEditIcon = styled(EditIcon)`
  font-size: 1rem; 
  color: var(--widget-text-color-secondary);
  margin-left: 1rem; /* Gap between text and icon */
  flex-shrink: 0;
  cursor: pointer;
  visibility: hidden; /* Initially hidden */
`;

export const StyledCheckIcon = styled(CheckIcon)`
  font-size: 1rem; 
  color: var(--widget-text-color-primary);
  margin-left: 1rem; /* Gap between text and icon */
  flex-shrink: 0;
  cursor: pointer;
`;

export const StyledClearIcon = styled(ClearIcon)`
  font-size: 1rem; 
  color: var(--widget-text-color-primary);
  margin-left: 0.5rem; /* Gap between check icon and clear icon */
  flex-shrink: 0;
  cursor: pointer;
`;

export const HiddenTextSpan = styled.span`
  position: absolute;
  visibility: hidden;
  white-space: nowrap;
  font-size: 1rem; /* Ensure this matches the StyledInput font-size */
`;
