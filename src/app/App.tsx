import React, { FC } from 'react';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import { Search } from '../components/Search';
import { Table } from '../components/Table';

const queryClient = new QueryClient()

const App:FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
     <Search/>
     <Table location='Sumy'/>
   </QueryClientProvider>
  );
};

export default App;
