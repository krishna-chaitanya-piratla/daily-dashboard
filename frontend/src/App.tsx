import React, { useState, useEffect } from 'react';
import DateTimeLocation from './components/DateTimeLocation';
import TodoList from './components/TodoList/TodoList';
import { GlobalStyles, AppContainer, Header } from './styled-components/GlobalStyles';
import { Helmet } from 'react-helmet';
import BackgroundImage from './components/BackgroundImage';
import axios from 'axios';
import Sidebar from './components/Sidebar/Sidebar';

const App: React.FC = () => {
  const [todoLists, setTodoLists] = useState<any[]>([]);
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);

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
      </Helmet>
      <GlobalStyles />
      <BackgroundImage query="space">
        <Sidebar addTodoList={addTodoList} isOpen={isSidebarOpen} onClose={closeSidebar} onOpen={openSidebar} />
        <AppContainer>
          <Header>
            <DateTimeLocation />
          </Header>
          <div>
            {todoLists.map((list) => (
              <TodoList
                key={list.id}
                listId={list.id}
                title={list.title}
                todos={list.todos}
                removeTodoList={removeTodoList}
              />
            ))}
          </div>
        </AppContainer>
      </BackgroundImage>
    </>
  );
};

export default App;
