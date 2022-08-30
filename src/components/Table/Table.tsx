import React, { FC, ReactNode, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import getWeather from '../../services/getWeather';

import { TableProps } from './types';
// @ts-ignore
import styles from './Table.module.scss';

export const Table: FC<TableProps> = ({ tableData = [], deleteLocation }) => {
  if (!tableData) return null;

  console.log('tableData', tableData);

  // const date = ['22.08', '23.08'];

  const queryClient = useQueryClient();

  const refreshCityData = loc => {
    queryClient.invalidateQueries([loc]);
  };

  const convertFahrenheitToCelsius = temp => (temp - 273.15).toFixed(1) + ' °C';

  return (
    <>
      {' '}
      <div className="table">
        <div className="table__header">
          <div className="table__cell">City</div>
          {/*{date.map(day => (*/}
          {/*  <div key={day} className="table__cell">*/}
          {/*    {day}*/}
          {/*  </div>*/}
          {/*))}*/}
        </div>
        <div className="table__body">
          {tableData.map(
            cell =>
              cell && (
                <div key={cell.name}>
                  <div className="table__cell">{cell?.name}</div>
                  <div>{convertFahrenheitToCelsius(cell.main?.temp)}</div>
                  <div>{cell.weather[0]?.description}</div>
                  <div className="">
                    <img src={`http://openweathermap.org/img/wn/${cell.weather[0]?.icon}@2x.png`} alt="weather icon" />
                  </div>
                  <button onClick={() => deleteLocation(cell.name)}>X</button>
                  <button className={styles.button} onClick={() => refreshCityData(cell.name.toUpperCase())}>
                    update information
                  </button>
                </div>
              ),
          )}
        </div>
      </div>
    </>
  );
};
