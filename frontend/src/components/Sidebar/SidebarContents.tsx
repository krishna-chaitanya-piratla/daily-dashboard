import React, { useState } from 'react';
import { SidebarContentsContainer, AccordionContainer, AccordionHeader, AccordionContent } from '../../styled-components/Sidebar/SidebarContents';
import UserName from './UserName';
import BackgroundSettings from './BackgroundSettings';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

interface SidebarContentsProps {
  addTodoList: () => void;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  username: string;
  setBackgroundType: (type: 'custom' | 'solid') => void;
  setBackgroundValue: (value: string) => void;
  backgroundType: 'custom' | 'solid';
  backgroundValue: string;
  setRefreshTrigger: React.Dispatch<React.SetStateAction<number>>;
  customBackgroundColors: string[];
  setCustomBackgroundColors: (colors: string[]) => void;
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
  customBackgroundColors,
  setCustomBackgroundColors
}) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  return (
    <SidebarContentsContainer>
      <UserName setUsername={setUsername} username={username} />
      <AccordionContainer>
        <AccordionHeader onClick={toggleAccordion}>
          Background Settings
          {isAccordionOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </AccordionHeader>
        {isAccordionOpen && (
          <AccordionContent>
            <BackgroundSettings
              setBackgroundType={setBackgroundType}
              setBackgroundValue={setBackgroundValue}
              backgroundType={backgroundType}
              backgroundValue={backgroundValue}
              setRefreshTrigger={setRefreshTrigger}
              customBackgroundColors={customBackgroundColors}
              setCustomBackgroundColors={setCustomBackgroundColors}
            />
          </AccordionContent>
        )}
      </AccordionContainer>
      {/* Add more sidebar items here */}
    </SidebarContentsContainer>
  );
};

export default SidebarContents;
