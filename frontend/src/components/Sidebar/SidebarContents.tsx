import React from 'react';
import { SidebarContentsContainer } from '../../styled-components/Sidebar/SidebarContents';
import UserName from './UserName';
import BackgroundSettings from './BackgroundSettings';

interface SidebarContentsProps {
  addTodoList: () => void;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  username: string;
  setBackgroundType: (type: 'custom' | 'solid') => void;
  setBackgroundValue: (value: string) => void;
  backgroundType: 'custom' | 'solid';
  backgroundValue: string;
  setRefreshTrigger: React.Dispatch<React.SetStateAction<number>>;
}

const SidebarContents: React.FC<SidebarContentsProps> = ({
  addTodoList,
  setUsername,
  username,
  setBackgroundType,
  setBackgroundValue,
  backgroundType,
  backgroundValue,
  setRefreshTrigger,
}) => {
  return (
    <SidebarContentsContainer>
      <UserName setUsername={setUsername} username={username} />
      <BackgroundSettings
        setBackgroundType={setBackgroundType}
        setBackgroundValue={setBackgroundValue}
        backgroundType={backgroundType}
        backgroundValue={backgroundValue}
        setRefreshTrigger={setRefreshTrigger}
      />
      {/* Add more sidebar items here */}
    </SidebarContentsContainer>
  );
};

export default SidebarContents;
