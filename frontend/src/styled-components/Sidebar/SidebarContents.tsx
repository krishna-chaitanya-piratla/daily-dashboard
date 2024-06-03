import styled from 'styled-components';
import EditIcon from '@mui/icons-material/Edit';

export const SidebarContentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  gap: 10px;
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
`;

export const Separator = styled.div`
  width: 100%;
  height: 1px;
  background-color: var(--separator-color); /* Adjust color as needed */
  margin: 10px 0; /* Adjust spacing as needed */
`;