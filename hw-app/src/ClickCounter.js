import React, { useState } from 'react';

const ClickCounter = () => {
  const [clickTimes, clickUpdater] = useState(0);

  const clickIncrementer = () => { 
    return clickTimes + 1;
  }
  
  return (
    <div className='Component' onClick={ () => clickUpdater(clickIncrementer)}>
      <p>Я счетчик кликов</p>
      <p>Кликнуто {clickTimes} раз</p>
    </div>
  );
}
export default ClickCounter;
