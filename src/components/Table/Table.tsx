import React, { FC, ReactNode } from 'react';
import { useQuery } from 'react-query';
import getWeather from '../../services/getWeather';

import { TableProps } from './types';
// @ts-ignore
import styles from './Table.module.scss';

export const Table: FC<TableProps> = ({location}) => {

  const { data, isLoading, isSuccess, refetch } = useQuery(['weatherData', location], () => getWeather(location))

const date = ['22.08', '23.08'];

  const convertFahrenheitToCelsius = (temp) => ((temp - 273.15).toFixed(1) + " °C");
  console.log(data?.weather?.icon);

let content:ReactNode;

if (isLoading) {
  content = (
    <div>
      <div><svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 38 38" stroke="#fff">
        <g fill="none" fillRule="evenodd">
          <g transform="translate(1 1)" strokeWidth="2">
            <circle strokeOpacity=".5" cx="18" cy="18" r="18"/>
            <path d="M36 18c0-9.94-8.06-18-18-18">
              <animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="1s" repeatCount="indefinite"/>
            </path>
          </g>
        </g>
      </svg></div><p>Loading...</p>)
    </div> );

} else if (isSuccess){
  content =  (<div className='table'>
    <div className='table__header'>
      <div className='table__cell'>
        City
      </div>
      {
        date.map((day) => (
          <div key={day} className='table__cell'>
            {day}
          </div>
        ))
      }
    </div>
    <div className='table__body'>
      <div className='table__cell'>
        {data?.name}
      </div>
      <div>
        {convertFahrenheitToCelsius(data.main?.temp)}
      </div>
      <div className=''>
        <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt='' />
      </div>
    </div>
    <button className={styles.button} onClick={() => refetch()}>
      update information
    </button>
  </div>);
} else {
  content = (<p>Something wrong 😢</p>)
}

console.log(data);
  return (
    <>
      {content}

    </>
  )

  };

