import React, { useState, useEffect } from 'react';
import TodoList, { TodoListType } from './components/TodoList/TodoList';
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
  addTodoList,
  removeTodoList,
  closeSidebar,
  openSidebar,
  logRefreshTriggerChange
} from './utils/appFunctions';
import CircularProgress from '@mui/material/CircularProgress';

const App: React.FC = () => {
  const [todoLists, setTodoLists] = useState<TodoListType[]>([]);
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [backgroundType, setBackgroundType] = useState<'custom' | 'solid'>('solid');
  const [backgroundValue, setBackgroundValue] = useState<string>('#2f2c5c');
  const [customBackgroundColors, setCustomBackgroundColors] = useState<string[]>([]);
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);
  const [activeListIndex, setActiveListIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [showJokeWidget, setShowJokeWidget] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching todo lists and user profile...");
      await fetchTodoLists(setTodoLists);
      await fetchUserProfile(setUsername, setBackgroundType, setBackgroundValue, setCustomBackgroundColors, setShowJokeWidget);
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log(`username: ${username}`);
    console.log("Background type:", backgroundType);
    console.log("Background value:", backgroundValue);
    console.log("Custom background colors:", customBackgroundColors);
    console.log(`APIURL = ${process.env.REACT_APP_TOMORROW_API_URL}`);
  }, [backgroundType, backgroundValue, customBackgroundColors]);

  useEffect(() => {
    console.log("Refresh trigger changed:", refreshTrigger);
    logRefreshTriggerChange(refreshTrigger);
  }, [refreshTrigger]);

  useEffect(() => {
    console.log("Todo lists updated:", todoLists);
  }, [todoLists]);

  const [isJokeVisible, setIsJokeVisible] = useState<boolean>(showJokeWidget);

  useEffect(() => {
    if (showJokeWidget) {
      setIsJokeVisible(true);
    } else {
      const timeoutId = setTimeout(() => setIsJokeVisible(false), 500); // Wait for fade-out transition
      return () => clearTimeout(timeoutId);
    }
  }, [showJokeWidget]);

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
      <Background type={backgroundType} value={backgroundValue} refreshTrigger={refreshTrigger}>
        <Sidebar
          addTodoList={() => addTodoList(todoLists, setTodoLists, setActiveListIndex)}
          isOpen={isSidebarOpen}
          onClose={() => closeSidebar(setSidebarOpen)}
          onOpen={() => openSidebar(setSidebarOpen)}
          setUsername={setUsername}
          username={username}
          setBackgroundType={setBackgroundType}
          setBackgroundValue={setBackgroundValue}
          backgroundType={backgroundType}
          backgroundValue={backgroundValue}
          setRefreshTrigger={setRefreshTrigger}
          customBackgroundColors={customBackgroundColors}
          setCustomBackgroundColors={setCustomBackgroundColors}
          showJokeWidget={showJokeWidget}
          setShowJokeWidget={setShowJokeWidget}
        />
        <AppContainer>
          <Header>
            <LocationWeather />
          </Header>
          <div>
            <TodoList
              todoLists={todoLists}
              removeTodoList={async (listId) => {
                await removeTodoList(listId, setTodoLists);
                setActiveListIndex(0);
              }}
              addTodoList={() => addTodoList(todoLists, setTodoLists, setActiveListIndex)}
              setTodoLists={setTodoLists}
              activeListIndex={activeListIndex}
              setActiveListIndex={setActiveListIndex}
            />
          </div>
          <FocusCenter username={username} />
          {isJokeVisible && (
            <JokeWidget className={`${showJokeWidget ? 'fade-in' : 'fade-out'}`} />
          )}
        </AppContainer>
      </Background>
    </>
  );
};

export default App;
