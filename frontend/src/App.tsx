import React from 'react';
import DateTimeLocation from './components/DateTimeLocation';
import { GlobalStyles, Header } from './styled-components/GlobalStyles';
import { Helmet } from 'react-helmet';


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
    <Header>
      <DateTimeLocation />
    </Header>
    </>
  );
};

export default App;