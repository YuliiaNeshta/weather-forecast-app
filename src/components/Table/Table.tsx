import React, { FC, ReactNode, useState } from 'react';
import { useQuery } from 'react-query';
import getWeather from '../../services/getWeather';

import { TableProps } from './types';
// @ts-ignore
import styles from './Table.module.scss';

export const Table: FC<TableProps> = ({ tableData, isLoading, isSuccess, refetch }) => {
  if (!tableData) return null;

  console.log('tableData', tableData);

  const date = ['22.08', '23.08'];

  const convertFahrenheitToCelsius = temp => (temp - 273.15).toFixed(1) + ' °C';

  // const deleteCity = (id: string) => {
  //   setTableData(tableData.filter(item => item?.name !== id));
  // };

  let content: ReactNode;

  if (isLoading) {
    content = (
      <div>
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 38 38" stroke="#7da3ee">
            <g fill="none" fillRule="evenodd">
              <g transform="translate(1 1)" strokeWidth="2">
                <circle strokeOpacity=".5" cx="18" cy="18" r="18" />
                <path d="M36 18c0-9.94-8.06-18-18-18">
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 18 18"
                    to="360 18 18"
                    dur="1s"
                    repeatCount="indefinite"
                  />
                </path>
              </g>
            </g>
          </svg>
        </div>
        <p>Loading...</p>
      </div>
    );
  } else if (isSuccess) {
    content = (
      <div className="table">
        <div className="table__header">
          <div className="table__cell">City</div>
          {date.map(day => (
            <div key={day} className="table__cell">
              {day}
            </div>
          ))}
        </div>
        <div className="table__body">
          {tableData.map(cell => (
            <div key={cell.name}>
              <div className="table__cell">{cell?.name}</div>
              <div>{convertFahrenheitToCelsius(cell.main?.temp)}</div>
              <div>{cell.weather[0]?.description}</div>
              <div className="">
                <img src={`http://openweathermap.org/img/wn/${cell.weather[0]?.icon}@2x.png`} alt="weather icon" />
              </div>
              {/*<button*/}
              {/*  onClick={() => {*/}
              {/*    deleteCity(cell?.name);*/}
              {/*  }}*/}
              {/*>*/}
              {/*  X*/}
              {/*</button>*/}
            </div>
          ))}
        </div>
        <button className={styles.button} onClick={() => refetch()}>
          update information
        </button>
      </div>
    );
  } else {
    content = <p>Something wrong 😢</p>;
  }
  return <>{content}</>;
};
