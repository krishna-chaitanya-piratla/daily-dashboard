import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import TodoList from './components/TodoList/TodoList';
import FocusCenter from './components/FocusCenter/FocusCenter';
import { GlobalStyles, AppContainer, Header } from './styled-components/GlobalStyles';
import { Helmet } from 'react-helmet';
import Background from './components/Background/Background';
import Sidebar from './components/Sidebar/Sidebar';
import JokeWidget from './components/JokeWidget';
import LocationWeather from './components/LocationWeather/LocationWeather';
import {
  fetchTodoLists,
  fetchUserProfile,
  closeSidebar,
  openSidebar,
  logRefreshTriggerChange
} from './utils/appFunctions';
import CircularProgress from '@mui/material/CircularProgress';
import { useStore } from './store/StoreProvider';

const App: React.FC = observer(() => {
  const { backgroundStore, jokeStore, focusCenterStore, locationWeatherStore, todoStore } = useStore();
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching todo lists and user profile...");
      await todoStore.fetchTodoLists();
      await fetchUserProfile(
        focusCenterStore,
        backgroundStore,
        jokeStore,
        locationWeatherStore
      );
      setLoading(false);
    };
    fetchData();
  }, [backgroundStore, jokeStore, focusCenterStore, locationWeatherStore, todoStore]);

  useEffect(() => {
    console.log(`username: ${focusCenterStore.userName}`);
    console.log("Background type:", backgroundStore.type);
    console.log("Background value:", backgroundStore.value);
    console.log("Custom background colors:", backgroundStore.customBackgroundColors);
    console.log(`APIURL = ${process.env.REACT_APP_TOMORROW_API_URL}`);
  }, [backgroundStore.type, backgroundStore.value, backgroundStore.customBackgroundColors]);

  useEffect(() => {
    console.log("Refresh trigger changed:", backgroundStore.refreshTrigger);
    logRefreshTriggerChange(backgroundStore.refreshTrigger);
  }, [backgroundStore.refreshTrigger]);

  useEffect(() => {
    console.log("Todo lists updated:", todoStore.todoLists);
  }, [todoStore.todoLists]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.cdnfonts.com/css/wotfard"
          rel="stylesheet"
        />
        <link 
          href="https://fonts.googleapis.com/css2?family=Sriracha&display=swap" 
          rel="stylesheet" 
        />
      </Helmet>
      <GlobalStyles />
      <Background type={backgroundStore.type} value={backgroundStore.value} refreshTrigger={backgroundStore.refreshTrigger}>
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => closeSidebar(setSidebarOpen)}
          onOpen={() => openSidebar(setSidebarOpen)}
        />
        <AppContainer>
          <Header>
            <LocationWeather />
          </Header>
          <div>
            <TodoList />
          </div>
          <FocusCenter />
          <JokeWidget />
        </AppContainer>
      </Background>
    </>
  );
});

export default App;
