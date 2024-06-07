import React from 'react';
import UserName from './UserName';
import BackgroundSettings from './BackgroundSettings';
import {
  SidebarContentsContainer,
  Separator,
  AccordionContainer,
  AccordionHeader,
  AccordionContent
} from '../../styled-components/Sidebar/SidebarContents';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { Switch } from '@mui/material';

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
  showJokeWidget: boolean;
  setShowJokeWidget: React.Dispatch<React.SetStateAction<boolean>>;
}

const SidebarContents: React.FC<SidebarContentsProps> = ({
  setUsername,
  username,
  setBackgroundType,
  setBackgroundValue,
  backgroundType,
  backgroundValue,
  setRefreshTrigger,
  customBackgroundColors,
  setCustomBackgroundColors,
  showJokeWidget,
  setShowJokeWidget
}) => {
  const [isAccordionOpen, setIsAccordionOpen] = React.useState(false);

  const handleAccordionToggle = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  return (
    <SidebarContentsContainer>
      <UserName setUsername={setUsername} username={username} />
      <AccordionContainer>
        <AccordionHeader onClick={handleAccordionToggle}>
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
      <Separator />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <span>Joke Widget</span>
        <Switch
          checked={showJokeWidget}
          onChange={() => setShowJokeWidget(!showJokeWidget)}
          color="primary"
        />
      </div>
    </SidebarContentsContainer>
  );
};

export default SidebarContents;
