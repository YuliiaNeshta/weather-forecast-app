import React, { FC, useState } from 'react';

export const Search: FC = () => {
  const [location, setLocation] = useState<string>('');

  const getLocation = (event) => {
    if(event.key  === 'Enter') {
      setLocation(event.target.value);
    }
    console.log(location);
  }

  return (
    <div>
      <input className='input' type='text' placeholder='Write location' onKeyPress={getLocation} />
      <button className='button' onClick={getLocation}>search</button>
      <div>{location}</div>
    </div>
  )
};
