import React, { FC, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Search } from '../components/Search';
import { Table } from '../components/Table';
import getWeather from '../services/getWeather';

const App: FC = () => {
  const [location, setLocation] = useState<string>('Sumy');
  const [tableData, setTableData] = useState<any[]>([]);

  const { data, isLoading, isSuccess, refetch } = useQuery(['weatherData', location], () => getWeather(location), {
    refetchOnWindowFocus: false,
    enabled: false,
    onSuccess: data => {
      setTableData([...tableData, data]);
    },
  });

  const handleLocation = location => {
    setLocation(location);
  };

  useEffect(() => {
    refetch();
  }, [location]);

  return (
    <div className="wrapper">
      <h1 className="heading">Weather forecast</h1>
      <div className="content">
        <Search onKeyPress={handleLocation} />
        <Table tableData={tableData} isLoading={isLoading} isSuccess={isSuccess} refetch={refetch} />
      </div>
    </div>
  );
};

export default App;
