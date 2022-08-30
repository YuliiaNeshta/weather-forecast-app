import React, { FC, useState } from 'react';
import { SearchProps } from './types';
// @ts-ignore
import styles from './search.module.scss';

export const Search: FC<SearchProps> = ({ handleLocation }) => {
  const [value, setValue] = useState('');

  const enterHandler = e => {
    if (e.key === 'Enter') {
      handleLocation(value);
      setValue('');
    }
  };

  const clickHandler = () => {
    handleLocation(value);
    setValue('');
  };

  return (
    <div>
      <input
        value={value}
        onChange={event => setValue(event.target.value)}
        className={styles.input}
        type="text"
        placeholder="Write location"
        onKeyPress={enterHandler}
      />
      <button className={styles.button} onClick={clickHandler}>
        search
      </button>
    </div>
  );
};
