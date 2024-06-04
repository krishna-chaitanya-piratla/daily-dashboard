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

const App: React.FC = () => {
  const [todoLists, setTodoLists] = useState<TodoListType[]>([]);
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [backgroundType, setBackgroundType] = useState<'custom' | 'solid'>('solid');
  const [backgroundValue, setBackgroundValue] = useState<string>('#2f2c5c');
  const [customBackgroundColors, setCustomBackgroundColors] = useState<string[]>([]);
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);

  useEffect(() => {
    fetchTodoLists(setTodoLists);
  }, []);

  useEffect(() => {
    fetchUserProfile(setUsername, setBackgroundType, setBackgroundValue, setCustomBackgroundColors);
  }, []);

  useEffect(() => {
    logRefreshTriggerChange(refreshTrigger);
  }, [refreshTrigger]);

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
          addTodoList={() => addTodoList(todoLists, setTodoLists)}
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
        />
        <AppContainer>
          <Header>
            <LocationWeather />
          </Header>
          <div>
            {todoLists.length > 0 && (
              <TodoList
                todoLists={todoLists}
                removeTodoList={(listId) => removeTodoList(listId, setTodoLists)}
                addTodoList={() => addTodoList(todoLists, setTodoLists)}
              />
            )}
          </div>
        </AppContainer>
        <FocusCenter username={username} />
        <JokeWidget />
      </Background>
    </>
  );
};

export default App;
