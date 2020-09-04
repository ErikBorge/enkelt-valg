import React, { useState, useEffect } from 'react';
import { kommuner } from '../kommuner';
import ReactTags from 'react-tag-autocomplete';

const TopNew = () => {

  const [minKommune, setMinKommune] = useState();

  let suggestions = [];
  let choice = [];
  for (var key in kommuner){
    //console.log(kommuner[key]);
    const kommuneObj = { name: kommuner[key] }
    suggestions.push(kommuneObj)
  }

  function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }
  console.log(suggestions);

  const chooseKommune = (kommune) => {
    setMinKommune(kommune.name);
    choice.push(minKommune);
    console.log(minKommune);
  }

  return (
    <div className="top">
      <div className="top__heading">
        <div className="top__heading-text">
          Enkelt valg
        </div>
        <div className="top__heading-line"/>
      </div>
      <div className="top__text">
        Finn valglokaler nær deg!
      </div>
      <div className="top__field">
        <span>Hvilken kommune vil du stemme i?</span>
        <div className="top__field-input">
          <ReactTags

            tags={choice}
            suggestions={suggestions}
            placeholder={'Engineer, carpenter, other...'}

            onAddition={e => chooseKommune(e)}
          />
          </div>
      </div>
    </div>
  );
}

export default TopNew;
