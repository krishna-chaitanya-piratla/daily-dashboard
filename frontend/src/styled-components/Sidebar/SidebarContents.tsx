import styled from 'styled-components';
import EditNoteIcon from '@mui/icons-material/EditNote';

export const SidebarContentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  gap: 10px;
`;

export const StyledEditNoteIcon = styled(EditNoteIcon)`
  font-size: 10rem; /* Adjust size as needed */
  color: white; /* Adjust color as needed */
`;

export const Separator = styled.div`
  width: 100%;
  height: 1px;
  background-color: gray; /* Adjust color as needed */
  margin: 10px 0; /* Adjust spacing as needed */
`;
