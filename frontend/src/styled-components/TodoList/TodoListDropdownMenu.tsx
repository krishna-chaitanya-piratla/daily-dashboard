import styled from 'styled-components';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export const StyledDropDownIcon = styled.div`
  cursor: pointer;
  margin-right: 5px;
  color: white;
  &:hover {
    color: #ccc;
  }
`;

export const StyledMenu = styled(Menu)`
  .MuiPaper-root {
    background-color: rgba(0, 0, 0, 1);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 1);
    color: inherit; // Change text color
  }
`;

export const StyledMenuItem = styled(MenuItem)`
  &:hover {
    background-color: rgba(255, 255, 255, 0.2); // Change hover background color
  }
  &.Mui-selected {
    background-color: rgba(255, 255, 255, 0.3); // Change selected background color
  }
  &.Mui-selected:hover {
    background-color: rgba(255, 255, 255, 0.4); // Change selected hover background color
  }
`;
