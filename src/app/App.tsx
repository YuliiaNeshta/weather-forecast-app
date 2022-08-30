import React, { FC, useEffect, useState } from 'react';
import { useQuery, useQueries, useQueryClient } from '@tanstack/react-query';
import { Search } from '../components/Search';
import { Table } from '../components/Table';
import getWeather from '../services/getWeather';

const App: FC = () => {
  const [location, setLocation] = useState<string[]>([]);

  const queryClient = useQueryClient();

  const results = useQueries({
    queries: location.map(loc => ({ queryKey: [loc], queryFn: () => getWeather(loc) })),
  });

  const handleLocation = loc => {
    if (!location.includes(loc.toUpperCase())) {
      setLocation(prevState => [...prevState, loc.toUpperCase()]);
    }
  };

  const deleteLocation = loc => {
    setLocation(prevState => prevState.filter(value => value !== loc.toUpperCase()));
  };

  return (
    <div className="wrapper">
      <h1 className="heading">Weather forecast</h1>
      <div className="content">
        <Search handleLocation={handleLocation} />
        <Table deleteLocation={deleteLocation} tableData={results.map(response => response.data)} />
      </div>
    </div>
  );
};

export default App;
