import React from 'react';
import { kommuner } from '../kommuner'
import Autocomplete from 'react-autocomplete'

const Top = (props) => {

  const getSuggestions = () => {
    let suggestions = [];
    for (var key in kommuner){
      //console.log(kommuner[key]);
      const kommuneObj = { name: kommuner[key] }
      suggestions.push(kommuneObj)
    }
    return suggestions;
  }

  const matchKommuneToTerm = (kommune, value) => {
    return kommune.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
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
        Hvilken kommune vil du stemme i?
        <div className="top__field-input">
          <Autocomplete
            getItemValue={(item) => item.name}
            items={getSuggestions()}
            renderItem={(item, isHighlighted) =>
              <div key={item.name} className={`item ${isHighlighted ? 'item-highlighted' : ''}`}>
                {item.name}
              </div>
            }
            renderMenu={children => (
              <div className="menu">
                {children}
              </div>
            )}
            inputProps={{
              placeholder: "Trondheim, Vågå, Oslo..."

            }}
            value={props.kommune}
            shouldItemRender={matchKommuneToTerm}
            onChange={e => props.onChange(e) }
            onSelect={e => props.onSelect(e)}
          />
          </div>
      </div>
    </div>
  );
}

export default Top;
