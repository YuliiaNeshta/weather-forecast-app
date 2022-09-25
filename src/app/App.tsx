import React, { FC, useState } from 'react';
import { useQueries } from '@tanstack/react-query';
import { Search } from '../components/Search';
import { Table } from '../components/Table';
import getWeather from '../services/getWeather';

const App: FC = () => {
  const [location, setLocation] = useState<string[]>([]); // locations, это же массив

  const results = useQueries({
    queries: location.map(loc => ({ queryKey: [loc], queryFn: () => getWeather(loc) })),
  });

  const handleLocation = loc => {
    if (!location.includes(loc.toUpperCase())) {
      setLocation(prevState => [...prevState, loc.toUpperCase()]);
      /**
       * Из-за отсутствия полноценной проверки можно вот такую багу поймать:
       * https://prnt.sc/Aj_fHLJBh2nM
       * https://prnt.sc/4A8_Ck4rAgyN
       *
       * Я бы посоветовал хранить id городов, которые api возвращает и проверять дубликаты по ним.
       * Вообще помимо этой проблемы есть только пожелание видеть ошибки при отправке запроса.
       * А то так получается, что просто чистится строка поиска и все, нет понимания, что не так.
       * */
    }
  };

  const deleteLocation = loc => {
    setLocation(prevState => prevState.filter(value => value !== loc.toUpperCase()));
  };

  const isLoading = results.map(response => response.isLoading).every(el => el);

  return (
    <div className="wrapper">
      <h1 className="heading">Weather forecast</h1>
      <div className="content">
        <Search handleLocation={handleLocation} />
        <Table deleteLocation={deleteLocation} tableData={results} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default App;
