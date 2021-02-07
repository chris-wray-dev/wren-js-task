import React from 'react';
import CSS from 'csstype';
import { Sheep } from '../../Data'

// set the expected props
interface Props {
  sheep: Sheep
}

const SheepCard = (props:Props) => {
  const sheep:Sheep = props.sheep;
  return (
    <div className="card text-white bg-dark text-center m-1">
      <div className="card-header">
        <p><strong>{sheep.name}</strong></p>
      </div>
      <div className="card-body p-1" style={cardBodyStyle}>
        {/* using string litereal to represent the sheep icon */}
        <img src={`/public/images/${sheep.sex}${sheep.branded ? '-branded' : ''}.png`} alt="sheep icon" style={iconStyle}/>
      </div>
    </div>
  );
};

const cardBodyStyle: CSS.Properties = {
  height: '160px'
}

const iconStyle: CSS.Properties = {
  width: '95%'
}

export default SheepCard;
