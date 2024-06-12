import styled from 'styled-components';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export const StyledDropDownIcon = styled.div`
  cursor: pointer;
  margin-right: 0.25rem;
  color: var(--dropdown-icon-color);
  &:hover {
    color: var(--dropdown-icon-hover-color);
  }
`;

export const StyledMenu = styled(Menu)`
  .MuiPaper-root {
    background-color: var(--dropdown-menu-bg-color);
    box-shadow: 0 4px 6px var(--dropdown-menu-shadow-color);
    color: var(--dropdown-menu-text-color);
  }
`;

export const StyledMenuItem = styled(MenuItem)`
  &:hover {
    background-color: var(--dropdown-menu-item-hover-bg-color);
  }
  &.Mui-selected {
    background-color: var(--dropdown-menu-item-selected-bg-color);
  }
  &.Mui-selected:hover {
    background-color: var(--dropdown-menu-item-selected-hover-bg-color);
  }
`;
