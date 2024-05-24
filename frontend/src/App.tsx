import React from 'react';
import DateTimeLocation from './components/DateTimeLocation';
import { GlobalStyles, Header } from './styled-components/GlobalStyles';

const App: React.FC = () => {
  return (
    <>
    <GlobalStyles />
    <Header>
      <DateTimeLocation />
    </Header>
    </>
  );
};

export default App;