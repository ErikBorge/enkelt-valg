import React, { useState, useEffect } from 'react';
import Map from './bits/map';
import Valglokale from './bits/valglokale';

import { kommuner } from '../kommuner';

const Result = (props) => {
  const [hasError, setErrors] = useState(false);
  const [valglokaler, setValglokaler] = useState({});
  const [viewIndex, setViewIndex] = useState(1);

  useEffect(() => {
    fetchDataMunicipality();
    var element = document.getElementById("result");
    element.scrollIntoView({behavior: "smooth", block: "start"});
  }, []);

  async function fetchDataMunicipality() {
    const kommuneID = getKeyByValue(kommuner, props.kommune)
    const response = await fetch("https://hotell.difi.no/api/json/valg/valglokaler/2017?municipality_id=" + kommuneID.toString());
    response
      .json()
      .then(response => setValglokaler(response.entries))
      .catch(error => setErrors(error));
  }

  function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }

  // var valglokalerArr = [];
  // const apiString = "https://hotell.difi.no/api/json/valg/valglokaler/2017?page="

  // async function fetchData() {
  // const response = await fetch("https://hotell.difi.no/api/json/valg/valglokaler/2017");
  // response
  //   .json()
  //   .then(response => setValglokaler(response.entries))
  //   .catch(error => setErrors(error));
  // }

  // async function fetchAllData() {
  //   for (var i = 1 ; i < 31 ; i++){
  //     // console.log(apiString+i.toString());
  //     const response = await fetch(apiString+i.toString());
  //     // const response = await fetch("https://hotell.difi.no/api/json/valg/valglokaler/2017");
  //     response
  //       .json()
  //       .then(response => {
  //         // setValglokaler(response);
  //         response.entries.map((lokale) => {
  //           valglokalerArr.push(lokale);
  //         })
  //         // for (var j = 0; j < response.entries.length ; j ++){
  //         //   valglokalerArr.push(response.entries[j])
  //         // }
  //       })
  //       .catch(error => setErrors(error));
  //       // response
  //       //   .json()
  //       //   .then(response => setValglokaler(valglokaler, response))
  // }}

  var showAmount = 5;
  const getValglokaler = () => {
    return valglokaler.slice(0,showAmount*viewIndex);
  }

  const showMore = () => {
    setViewIndex(viewIndex+1);
    console.log("viewIndex " + viewIndex);
  }

  return (
    <div id={"result"} className="result">
      {!hasError ?
        <>
          <div className="result__back" onClick={props.goback}>
            Tilbake
          </div>
          { valglokaler && valglokaler[0] ?
            <>
              <div className="result__heading">
                Her er valglokalene i {props.kommune[0]+props.kommune.slice(1).toLowerCase()}
              </div>
              {getValglokaler().map((value, key) => {
                return (
                  <Valglokale key={key} id={key} lokale={value}/>
                )
              })
              }
              { viewIndex*showAmount >= valglokaler.length ? null :
                <div className="result__back" onClick={showMore}>
                  Vis flere
                </div>
              }
            </>
            :
            <div className="result__failed">
              oh noes... <br/>Det var ingen valglokaler i {props.kommune[0]+props.kommune.slice(1).toLowerCase()} 😢
            </div>
            }

          <Map locations={valglokaler} mapPosition={valglokaler[0]}/>
        </>
      : null }
    </div>
  );
}

export default Result;
