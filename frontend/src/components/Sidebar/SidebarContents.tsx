import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../store/StoreProvider';
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
import axios from 'axios';

const SidebarContents: React.FC = observer(() => {
  const { jokeStore, locationWeatherStore } = useStore();
  const [isAccordionOpen, setIsAccordionOpen] = React.useState(false);

  const handleAccordionToggle = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  const handleJokeWidgetToggle = async () => {
    const newValue = !jokeStore.showJokeWidget;
    jokeStore.setShowJokeWidget(newValue);

    try {
      await axios.put(`${process.env.REACT_APP_BACKEND_URL}/userprofile/jokewidget`, {
        showJokeWidget: newValue
      });
      console.log('Joke widget status updated:', newValue);
    } catch (error) {
      console.error('Error updating joke widget status:', error);
    }
  };

  const handleLocationWeatherToggle = async () => {
    const newValue = !locationWeatherStore.showLocationWeather;
    locationWeatherStore.setShowLocationWeather(newValue);
    console.log('Toggling Location Weather:', newValue); // Log state change

    try {
      await axios.put(`${process.env.REACT_APP_BACKEND_URL}/userprofile/locationweather`, {
        showLocationWeather: newValue
      });
      console.log('Location weather status updated:', newValue);
    } catch (error) {
      console.error('Error updating location weather status:', error);
    }
  };

  useEffect(() => {
    console.log('showLocationWeather:', locationWeatherStore.showLocationWeather);
  }, [locationWeatherStore.showLocationWeather]);

  return (
    <SidebarContentsContainer>
      <UserName />
      <AccordionContainer>
        <AccordionHeader onClick={handleAccordionToggle}>
          Background Settings
          {isAccordionOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </AccordionHeader>
        {isAccordionOpen && (
          <AccordionContent>
            <BackgroundSettings />
          </AccordionContent>
        )}
      </AccordionContainer>
      <Separator />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <span>Joke Widget</span>
        <Switch
          checked={jokeStore.showJokeWidget}
          onChange={handleJokeWidgetToggle}
          color="primary"
        />
      </div>
      <Separator />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <span>Location Weather</span>
        <Switch
          checked={locationWeatherStore.showLocationWeather}
          onChange={handleLocationWeatherToggle}
          color="primary"
        />
      </div>
    </SidebarContentsContainer>
  );
});

export default SidebarContents;
