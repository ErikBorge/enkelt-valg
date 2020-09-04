import React, { useState, useEffect } from 'react';

const Valglokale = (props) => {

  const [isOpen, setisOpen] = useState(false);
  const expandLocation = (e) => {
    setisOpen(!isOpen);
  }

  return (
    <div className="valglokale">
      <div className="valglokale__top">
        <div className="valglokale__heading">
          {props.lokale.polling_place_name}
        </div>
        <div className="valglokale__expand" onClick={expandLocation}/>
      </div>
      { isOpen ?
        <>
          <span>{props.lokale.address_line}</span>
          <span>{props.lokale.info_text}</span>
        </>
      : null }
    </div>
  )
}

export default Valglokale;
