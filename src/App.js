import React, { useState, useEffect } from 'react';
import Top from './components/top';
import Result from './components/result';

const App = () => {

  const [hasSelected, setHasSelected] = useState(false);
  const [minKommune, setMinKommune] = useState();

  useEffect(() => {

  }, []);

  const changeMinKommune = (e) => {
    setMinKommune(e.target.value);
    // console.log(minKommune);
  }

  const hasSelectedKommune = (kommune) => {
    setMinKommune(kommune);
    setHasSelected(true);
    // console.log("Has selected. minKommune: "+minKommune);
    setTimeout(function(){
      var topElement = document.getElementById("top");
      topElement.style.display = "none";
      var resultElement = document.getElementById("result");
      resultElement.scrollIntoView();
    }, 500);
  }

  const startOver = () => {
    console.log("starting over");
    var topElement = document.getElementById("top");
    topElement.style.display = "flex";
    // topElement.scrollIntoView({behavior: "smooth", block: "start"});
    setTimeout(function(){
      setMinKommune("");
      setHasSelected(false);
    }, 400);
  }

  return (
    <div className="App">
      <Top kommune={minKommune} onChange={changeMinKommune} onSelect={hasSelectedKommune}/>
      { hasSelected ?
        <Result goback={startOver} kommune={minKommune}/>
        : null
      }
    </div>
  );
}

export default App;
