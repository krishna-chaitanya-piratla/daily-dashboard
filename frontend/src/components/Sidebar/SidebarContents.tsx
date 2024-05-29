// src/components/Sidebar/SidebarContents.tsx
import React from 'react';
import EditNoteIcon from '@mui/icons-material/EditNote';
import SidebarItem from './SidebarItem';
import { SidebarContentsContainer } from '../../styled-components/Sidebar/SidebarContents';

interface SidebarContentsProps {
  addTodoList: () => void;
}

const SidebarContents: React.FC<SidebarContentsProps> = ({ addTodoList }) => {
  return (
    <SidebarContentsContainer>
      <SidebarItem icon={EditNoteIcon} tooltip="New To-Do List" onClick={addTodoList} />
      {/* Add more sidebar items here */}
    </SidebarContentsContainer>
  );
};

export default SidebarContents;
