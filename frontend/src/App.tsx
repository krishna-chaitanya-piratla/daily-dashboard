import React, { useState, useEffect } from 'react';
import TodoList, { TodoListType } from './components/TodoList/TodoList';
import FocusCenter from './components/FocusCenter/FocusCenter';
import { GlobalStyles, AppContainer, Header } from './styled-components/GlobalStyles';
import { Helmet } from 'react-helmet';
import Background from './components/Background/Background';
import axios from 'axios';
import Sidebar from './components/Sidebar/Sidebar';
import JokeWidget from './components/JokeWidget';
import LocationWeather from './components/LocationWeather/LocationWeather';

const App: React.FC = () => {
  const [todoLists, setTodoLists] = useState<TodoListType[]>([]);
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [username, setUsernameState] = useState<string>('');
  const [backgroundType, setBackgroundType] = useState<'custom' | 'solid'>('solid');
  const [backgroundValue, setBackgroundValue] = useState<string>('#2f2c5c');
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/todos`)
      .then(response => {
        setTodoLists(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the todo lists!', error);
      });

    axios.get(`${process.env.REACT_APP_BACKEND_URL}/userprofile`)
      .then(response => {
        const { userName, backgroundPreference } = response.data;
        setUsernameState(userName || '');
        setBackgroundType(backgroundPreference.type);
        setBackgroundValue(backgroundPreference.value);
      })
      .catch(error => {
        console.error('There was an error fetching the user profile!', error);
      });
  }, []);

  const addTodoList = () => {
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/todos`)
      .then(response => {
        setTodoLists([...todoLists, response.data]);
      })
      .catch(error => {
        console.error('There was an error adding the todo list!', error);
      });
  };

  const removeTodoList = (listId: string) => {
    setTodoLists((prevLists) => prevLists.filter((list) => list.id !== listId));
  };

  const updateUserProfile = (key: string, value: any) => {
    axios.put(`${process.env.REACT_APP_BACKEND_URL}/userprofile/${key}`, { [key]: value })
      .then(response => {
        console.log(`User profile ${key} updated successfully`, response.data);
      })
      .catch(error => {
        console.error(`There was an error updating the user profile ${key}!`, error);
      });
  };

  const setUsername = (newUsername: React.SetStateAction<string>) => {
    setUsernameState(newUsername);
    updateUserProfile('username', newUsername);
  };

  const handleSetBackgroundType = (type: 'custom' | 'solid') => {
    setBackgroundType(type);
    updateUserProfile('background', { type, value: backgroundValue });
  };

  const handleSetBackgroundValue = (value: string) => {
    setBackgroundValue(value);
    updateUserProfile('background', { type: backgroundType, value });
  };

  const closeSidebar = () => setSidebarOpen(false);
  const openSidebar = () => setSidebarOpen(true);

  useEffect(() => {
    console.log('App - refreshTrigger changed:', refreshTrigger);
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
          addTodoList={addTodoList}
          isOpen={isSidebarOpen}
          onClose={closeSidebar}
          onOpen={openSidebar}
          setUsername={setUsername}
          username={username}
          setBackgroundType={handleSetBackgroundType}
          setBackgroundValue={handleSetBackgroundValue}
          backgroundType={backgroundType}
          backgroundValue={backgroundValue}
          setRefreshTrigger={setRefreshTrigger}
        />
        <AppContainer>
          <Header>
            <LocationWeather />
          </Header>
          <div>
            {todoLists.length > 0 && (
              <TodoList
                todoLists={todoLists}
                removeTodoList={removeTodoList}
                addTodoList={addTodoList}
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
