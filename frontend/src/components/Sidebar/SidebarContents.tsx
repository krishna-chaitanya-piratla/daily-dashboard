import React from 'react';
import { Separator, SidebarContentsContainer } from '../../styled-components/Sidebar/SidebarContents';
import UserName from './UserName';

const SidebarContents: React.FC = () => {
  return (
    <SidebarContentsContainer>
      <UserName />
      <Separator />
      {/* You can add more menu items here */}
    </SidebarContentsContainer>
  );
};

export default SidebarContents;
