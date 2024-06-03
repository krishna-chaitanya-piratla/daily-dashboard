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
  backgroundType: 'custom' | 'solid';
  backgroundValue: string;
}

const SidebarContents: React.FC<SidebarContentsProps> = ({
  addTodoList,
  username,
  setUsername,
  setBackgroundType,
  setBackgroundValue,
  backgroundType,
  backgroundValue
}) => {
  return (
    <SidebarContentsContainer>
      <UserName username={username} setUsername={setUsername} />
      <Separator />
      <BackgroundSettings
        setBackgroundType={setBackgroundType}
        setBackgroundValue={setBackgroundValue}
        backgroundType={backgroundType}
        backgroundValue={backgroundValue}
      />
      <Separator />
      {/* You can add more menu items here */}
    </SidebarContentsContainer>
  );
};

export default SidebarContents;
