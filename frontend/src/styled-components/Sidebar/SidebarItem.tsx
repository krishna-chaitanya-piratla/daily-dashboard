import styled from 'styled-components';

export const SidebarItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px 0;
`;

export const StyledIcon = styled.div`
  font-size: 2.5rem; /* Adjust size as needed */
  color: var(--widget-text-color-primary); /* Adjust color as needed */
`;

export const Separator = styled.div`
  width: 100%;
  height: 1px;
  background-color: var(--separator-color); /* Adjust color as needed */
  margin: 10px 0; /* Adjust spacing as needed */
`;
