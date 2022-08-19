import React, { FC, useState } from 'react';
import { SearchProps } from './types';
// @ts-ignore
import styles from './search.module.scss';

export const Search: FC<SearchProps> = ({ onKeyPress }) => {
  const getLocation = event => {
    if (event.key === 'Enter' || event.type === 'click') {
      onKeyPress(event.target.value);
      event.target.value = '';
    }
  };

  return (
    <div>
      <input className={styles.input} type="text" placeholder="Write location" onKeyPress={getLocation} />
      <button className={styles.button} onClick={getLocation}>
        search
      </button>
    </div>
  );
};
