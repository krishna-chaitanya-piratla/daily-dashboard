import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
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
import { useStore } from './store/StoreProvider';

const App: React.FC = observer(() => {
  const { backgroundStore, jokeStore } = useStore();
  const [todoLists, setTodoLists] = useState<TodoListType[]>([]);
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [activeListIndex, setActiveListIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching todo lists and user profile...");
      await fetchTodoLists(setTodoLists);
      await fetchUserProfile(setUsername, backgroundStore.setTypeWrapper, backgroundStore.setValueWrapper, backgroundStore.setCustomBackgroundColorsWrapper, jokeStore.setShowJokeWidgetWrapper);
      setLoading(false);
    };
    fetchData();
  }, [backgroundStore, jokeStore]);

  useEffect(() => {
    console.log(`username: ${username}`);
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
    console.log("Todo lists updated:", todoLists);
  }, [todoLists]);

  const [isJokeVisible, setIsJokeVisible] = useState<boolean>(jokeStore.showJokeWidget);

  useEffect(() => {
    if (jokeStore.showJokeWidget) {
      setIsJokeVisible(true);
    } else {
      const timeoutId = setTimeout(() => setIsJokeVisible(false), 500); // Wait for fade-out transition
      return () => clearTimeout(timeoutId);
    }
  }, [jokeStore.showJokeWidget]);

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
          addTodoList={() => addTodoList(todoLists, setTodoLists, setActiveListIndex)}
          isOpen={isSidebarOpen}
          onClose={() => closeSidebar(setSidebarOpen)}
          onOpen={() => openSidebar(setSidebarOpen)}
          setUsername={setUsername}
          username={username}
          setBackgroundType={backgroundStore.setTypeWrapper}
          setBackgroundValue={backgroundStore.setValueWrapper}
          backgroundType={backgroundStore.type}
          backgroundValue={backgroundStore.value}
          setRefreshTrigger={backgroundStore.setRefreshTriggerWrapper}
          customBackgroundColors={backgroundStore.customBackgroundColors}
          setCustomBackgroundColors={backgroundStore.setCustomBackgroundColorsWrapper}
          showJokeWidget={jokeStore.showJokeWidget}
          setShowJokeWidget={jokeStore.setShowJokeWidgetWrapper}
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
            <JokeWidget className={`${jokeStore.showJokeWidget ? 'fade-in' : 'fade-out'}`} />
          )}
        </AppContainer>
      </Background>
    </>
  );
});

export default App;
