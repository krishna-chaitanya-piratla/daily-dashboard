import React from 'react';
import { SidebarContentsContainer, Separator } from '../../styled-components/Sidebar/SidebarContents';
import UserName from './UserName';
import BackgroundSettings from './BackgroundSettings';

interface SidebarContentsProps {
  addTodoList: () => void;
  username: string;
  setUsername: (username: string) => void;
  setBackgroundType: (type: 'custom' | 'solid') => void;
  setBackgroundValue: (value: string) => void;
}

const SidebarContents: React.FC<SidebarContentsProps> = ({ addTodoList, username, setUsername, setBackgroundType, setBackgroundValue }) => {
  return (
    <SidebarContentsContainer>
      <UserName username={username} setUsername={setUsername} />
      <Separator />
      <BackgroundSettings setBackgroundType={setBackgroundType} setBackgroundValue={setBackgroundValue} />
      <Separator />
      {/* You can add more menu items here */}
    </SidebarContentsContainer>
  );
};

export default SidebarContents;
