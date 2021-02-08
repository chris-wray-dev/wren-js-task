import React from 'react';
import CSS from 'csstype';
import { Sheep } from '../../Data/Sheep';

// set the expected props
interface Props {
  toggleSheepModal: (event: React.MouseEvent<HTMLButtonElement>) => void,
  submitSheep: Function;
  sheep: Sheep;
  index: number;
  setSelectedSheep: Function
  setSelectedSheepIndex: Function
}

const SheepCard = (props:Props) => {
  const { toggleSheepModal, setSelectedSheep, setSelectedSheepIndex, sheep, index } = props;
  return (
    <div className="card text-white bg-dark text-center m-1">
      <div className="card-header">
        <p><strong>{sheep.name}</strong></p>
      </div>
      <div className="card-body p-1" style={cardBodyStyle}>
        {/* using string litereal to represent the sheep icon */}
        <img src={`/public/images/${sheep.sex.value}${sheep.branded.value ? '-branded' : ''}.png`} alt="sheep icon" style={iconStyle}/>
      </div>
      <p>Mum: { sheep.lineage.mother }<br />
        Dad: { sheep.lineage.father }</p>
      <button type="button" className="btn btn-primary m-2" onClick={(e) => {
        setSelectedSheep(sheep);
        setSelectedSheepIndex(index);
        toggleSheepModal(e);
      }} >Edit Sheep</button>
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
