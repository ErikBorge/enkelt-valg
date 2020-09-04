import React, { useState, useEffect } from 'react';
import Map from './bits/map';
import Valglokale from './bits/valglokale';
import { kommuner } from '../kommuner';


const Result = (props) => {
  const [hasError, setErrors] = useState(false);
  const [valglokaler, setValglokaler] = useState({});


  var valglokalerArr = [];

  // console.log(kommuner.101);

  // const testArr = [0,1,2];
  // console.log("testArr.length = "+testArr.length);
  // console.log(testArr);



  // kommuner.map((key, value) => {
  //   console.log(value);
  // })

  function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }

  const apiString = "https://hotell.difi.no/api/json/valg/valglokaler/2017?page="

  async function fetchData() {
    const response = await fetch("https://hotell.difi.no/api/json/valg/valglokaler/2017");
    response
      .json()
      .then(response => setValglokaler(response.entries))
      .catch(error => setErrors(error));
    }

  async function fetchAllData() {
    for (var i = 1 ; i < 31 ; i++){
      // console.log(apiString+i.toString());
      const response = await fetch(apiString+i.toString());
      // const response = await fetch("https://hotell.difi.no/api/json/valg/valglokaler/2017");
      response
        .json()
        .then(response => {
          // setValglokaler(response);
          response.entries.map((lokale) => {
            valglokalerArr.push(lokale);
          })
          // for (var j = 0; j < response.entries.length ; j ++){
          //   valglokalerArr.push(response.entries[j])
          // }
        })
        .catch(error => setErrors(error));
        // response
        //   .json()
        //   .then(response => setValglokaler(valglokaler, response))
  }}

  // async function fetchAllData2() {
  //   for (var i = 1 ; i < 3 ; i++){
  //     const response = await fetch(apiString+i.toString());
  //
  //     response
  //       .json()
  //       .then(response => setValglokaler({...valglokaler, response: response.entries}))
  //       .catch(error => setErrors(error));
  // }}
  async function fetchDataMunicipality() {
    const kommuneID = getKeyByValue(kommuner, props.kommune)
    const response = await fetch("https://hotell.difi.no/api/json/valg/valglokaler/2017?municipality_id=" + kommuneID.toString());
    response
      .json()
      .then(response => setValglokaler(response.entries))
      .catch(error => setErrors(error));
    }

  useEffect(() => {
    fetchDataMunicipality();

    // console.log(valglokalerArr);
    // console.log(typeof(valglokaler));
    // console.log("valglokaler.length = "+valglokaler.length);
    // console.log(valglokaler[1]);
  }, []);

  // console.log(valglokaler);
  //console.log(getKeyByValue(kommuner, 'SARPSBORG'));
  return (
    <div className="result">
    { valglokaler && valglokaler[0] ?
      <>
        <div className="result__heading">
          Her er valglokalene i {props.kommune[0]+props.kommune.slice(1).toLowerCase()}
        </div>
        { valglokaler.map((value) => {
          return (
            <Valglokale lokale={value}/>
          )
        })}
      </>
     : null }
     <Map locations={valglokaler}/>
    </div>
  );
}

export default Result;
