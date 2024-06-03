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
  const [username, setUsername] = useState<string>('Stranger');
  const [backgroundType, setBackgroundType] = useState<'custom' | 'solid'>('solid');
  const [backgroundValue, setBackgroundValue] = useState<string>('#2f2c5c');

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/todos`)
      .then(response => {
        setTodoLists(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the todo lists!', error);
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

  const closeSidebar = () => setSidebarOpen(false);
  const openSidebar = () => setSidebarOpen(true);

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
      <Background type={backgroundType} value={backgroundValue}>
        <Sidebar 
          addTodoList={addTodoList} 
          isOpen={isSidebarOpen} 
          onClose={closeSidebar} 
          onOpen={openSidebar} 
          setUsername={setUsername} 
          username={username}
          setBackgroundType={setBackgroundType}
          setBackgroundValue={setBackgroundValue}
          backgroundType={backgroundType}
          backgroundValue={backgroundValue}
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
