// src/components/Sidebar/SidebarItem.tsx
import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { SidebarItemContainer, StyledIcon, Separator } from '../../styled-components/Sidebar/SidebarItem';

interface SidebarItemProps {
  icon: React.ElementType;
  tooltip: string;
  onClick: () => void;
  SeparatorAfter?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon: Icon, tooltip, onClick, SeparatorAfter = true }) => {
  return (
    <SidebarItemContainer>
      <Tooltip title={tooltip}>
        <IconButton onClick={onClick}>
          <StyledIcon as={Icon} />
        </IconButton>
      </Tooltip>
      {SeparatorAfter && <Separator />}
    </SidebarItemContainer>
  );
};

export default SidebarItem;
