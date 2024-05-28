import React, { useState, useEffect } from 'react';
import DateTimeLocation from './components/DateTimeLocation';
import TodoList from './components/TodoList/TodoList';
import { GlobalStyles, AppContainer, Header } from './styled-components/GlobalStyles';
import { Helmet } from 'react-helmet';
import BackgroundImage from './components/BackgroundImage';
import axios from 'axios';

const App: React.FC = () => {
  const [todoLists, setTodoLists] = useState<any[]>([]);

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
        <AppContainer>
          <Header>
            <DateTimeLocation />
            <button onClick={addTodoList}>New To-Do List</button>
          </Header>
          <div>
            {todoLists.map((list) => (
              <TodoList key={list.id} listId={list.id} todos={list.todos} />
            ))}
          </div>
        </AppContainer>
      </BackgroundImage>
    </>
  );
};

export default App;
