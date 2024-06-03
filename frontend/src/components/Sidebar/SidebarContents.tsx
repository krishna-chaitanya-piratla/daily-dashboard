import React from 'react';
import { SidebarContentsContainer, Separator } from '../../styled-components/Sidebar/SidebarContents';
import UserName from './UserName';
import BackgroundSettings from './BackgroundSettings';

interface SidebarContentsProps {
  addTodoList: () => void;
  username: string;
  setUsername: (username: string) => void;
}

const SidebarContents: React.FC<SidebarContentsProps> = ({ addTodoList, username, setUsername }) => {
  return (
    <SidebarContentsContainer>
      <UserName username={username} setUsername={setUsername} />
      <Separator />
      <BackgroundSettings />
      <Separator />
      {/* You can add more menu items here */}
    </SidebarContentsContainer>
  );
};

export default SidebarContents;
