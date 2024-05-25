import React from 'react';
import DateTimeLocation from './components/DateTimeLocation';
import TodoList from './components/TodoList';
import { GlobalStyles, AppContainer, Header } from './styled-components/GlobalStyles';
import { Helmet } from 'react-helmet';
import BackgroundImage from './components/BackgroundImage';

const App: React.FC = () => {
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
          </Header>
          <div>
            <TodoList />
          </div>
        </AppContainer>
      </BackgroundImage>
    </>
  );
};

export default App;
