import React, { useState } from 'react';

const Valglokale = (props) => {

  const [isOpen, setisOpen] = useState(false);
  const expandLocation = (e) => {
    setisOpen(!isOpen);
  }

  const getOpeningHours = () => {
    var openingHours = [];
    let dates = props.lokale.opening_hours.split(',');
    for (var i = 0 ; i<dates.length ; i++){
      dates[i] = new Date(dates[i]);
    }
    for (var j = 0 ; j<dates.length ; j++){
      // console.log(dates[i].getDate());
      // console.log(dates[i].toLocaleString('default', { month: 'short' }));
      // console.log(dates[i+1] && dates[i+1].getDate());
      if (!isNaN(dates[j].getDate()) && dates[j+1] && !isNaN(dates[j+1].getDate()) && dates[j].getDate() === dates[j+1].getDate()){
        openingHours.push(
          dates[j].getDate().toString() + ". "
          + dates[j].toLocaleString('default', { month: 'short' }) + ". kl. "
          + dates[j].getHours().toString() + "-"
          + dates[j+1].getHours().toString() + " " );
      }
    }
    // console.log(openingHours);
    return openingHours;
  }

  // console.log(props.lokale);
  return (
    <div id={props.id} className={`valglokale ${isOpen ? 'valglokale-open' : ''}`} onClick={expandLocation}>
      <div className="valglokale__top">
        <div className="valglokale__heading">
          {props.lokale.polling_place_name}
        </div>
      </div>
      { isOpen ?
        <div className="valglokale__info">
          <div className="valglokale__address">
            <i>{props.lokale.address_line}</i>
          </div>
          <div className="valglokale__opening-hours">
            <b>Åpningstider:</b><br/>
            {getOpeningHours().map((date, key) => {
              return (
                <div key={key}>
                  {date}<br/>
                </div>
            )})}
          </div>
          <div className="valglokale__info-text">
            {props.lokale.info_text}
          </div>
        </div>
      : null }
    </div>
  )
}

export default Valglokale;
