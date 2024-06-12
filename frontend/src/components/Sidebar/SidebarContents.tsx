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
  AccordionContent,
  StyledSwitch,
  ToggleContainer
} from '../../styled-components/Sidebar/SidebarContents';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import axios from 'axios';

const SidebarContents: React.FC = observer(() => {
  const { jokeStore, locationWeatherStore, backgroundStore } = useStore();

  const handleAccordionToggle = () => {
    backgroundStore.setShowBackgroundSettingsWrapper(!backgroundStore.showBackgroundSettings);
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
          {backgroundStore.showBackgroundSettings ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </AccordionHeader>
        {backgroundStore.showBackgroundSettings && (
          <AccordionContent>
            <BackgroundSettings />
          </AccordionContent>
        )}
      </AccordionContainer>
      <Separator />
      <ToggleContainer>
        <span>Weather and Location</span>
        <StyledSwitch
          checked={locationWeatherStore.showLocationWeather}
          onChange={handleLocationWeatherToggle}
          
        />
      </ToggleContainer>
      <Separator />
      <ToggleContainer>
        <span>Joke Widget</span>
        <StyledSwitch
          checked={jokeStore.showJokeWidget}
          onChange={handleJokeWidgetToggle}
          
        />
      </ToggleContainer>
    </SidebarContentsContainer>
  );
});

export default SidebarContents;
