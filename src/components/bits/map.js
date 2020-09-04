import React, { useState, useEffect } from 'react';
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
//const { Map: LeafletMap, TileLayer, Marker, Popup } = ReactLeaflet;

const Map = (props) => {
  const position = [59.913386, 10.739822];
  // const getPosition = () => {
  //   console.log('tryign');
  //   const position = [
  //     props.locations[0] && props.locations[0].gps_coordinates.split(',')[0],
  //     props.locations[0] && props.locations[0].gps_coordinates.split(',')[1]
  //   ]
  //   return position;
  // }
  // const position = [
  //   props.locations[0].gps_coordinates.split(',')[0],
  //   props.locations[0].gps_coordinates.split(',')[1],
  // ]

  console.log(props.locations);

  // const lat =
  // const lon = ;
  // console.log(typeof(props.locations));
  console.log(props.locations[0] && props.locations[0].gps_coordinates);
  // console.log(props.locations.length);
  return(
    <div className="map">
      <div className="map__container">
        <LeafletMap center={position} zoom={10}>
          <TileLayer
            //attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
          />
          {props.locations[0] && props.locations.map((location, key) => {
            // console.log(location);
            const pos = [
              location.gps_coordinates.split(',')[0],
              location.gps_coordinates.split(',')[1]
            ];
            // console.log(pos);
            return (
              <div key={key}>
                <Marker position={pos}>
                  <Popup>
                    <h3>{location.polling_place_name}</h3>
                    {location.address_line}<br/>
                    {location.info_text}
                  </Popup>
                </Marker>
              </div>
            )
          })}
        </LeafletMap>
      </div>
    </div>
  );
}

export default Map;
