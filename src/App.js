import React, { useState, useEffect } from 'react';
import Top from './components/top';
import Result from './components/result';

const App = () => {

  const [hasSelected, setHasSelected] = useState(false);
  const [minKommune, setMinKommune] = useState();

  const changeMinKommune = (e) => {
    setMinKommune(e.target.value);
    console.log(minKommune);
  }

  const hasSelectedKommune = (kommune) => {
    setMinKommune(kommune);
    setHasSelected(true);
    // console.log("Has selected. minKommune: "+minKommune);
  }



  return (
    <div className="App">
      <Top kommune={minKommune} onChange={changeMinKommune} onSelect={hasSelectedKommune}/>
      { hasSelected ?
        <Result kommune={minKommune}/>
        : null
      }
    </div>
  );
}

export default App;
