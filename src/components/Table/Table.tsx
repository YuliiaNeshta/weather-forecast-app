import React, { FC } from 'react';
// @ts-ignore
import styles from './Table.module.scss';

import { TableProps } from './types';

export const Table: FC<TableProps> = ({ tableData = [], deleteLocation, isLoading }) => {
  if (!tableData.length) return null;

  const convertFahrenheitToCelsius = temp => (temp - 273.15).toFixed(1) + ' °C';

  return (
    <>
      <div className="table">
        {isLoading && 'Loading...'}
        <div className={styles.grid}>
          {tableData.map(
            cell =>
              cell.data && (
                <div className={styles.card} key={cell.data.name}>
                  <div className="table__cell">City: {cell.data.name}</div>
                  <div>Temperature: {convertFahrenheitToCelsius(cell.data.main.temp)}</div>
                  <div>Description: {cell.data.weather[0]?.description}</div>
                  <div>
                    <div>
                      <img
                        className={styles.img}
                        src={`http://openweathermap.org/img/wn/${cell.data.weather[0]?.icon}@2x.png`}
                        alt="weather icon"
                      />
                    </div>
                  </div>
                  <button className={styles.deleteButton} onClick={() => deleteLocation(cell.data.name)}>
                    X
                  </button>
                  <button
                    disabled={cell.isFetching}
                    className={styles.button}
                    onClick={() => cell.refetch({ stale: true })}
                  >
                    {cell.isFetching ? 'updating...' : 'update info'}
                  </button>
                </div>
              ),
          )}
        </div>
      </div>
    </>
  );
};
