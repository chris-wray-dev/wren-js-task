import React, { useState } from 'react';
import SheepCard from './Components/Sheep/SheepCard';
import SheepModal from './Components/Sheep/SheepModal';
import CSS from 'csstype';
import { theFarm, Sheep } from './Data';

const TheField = () => {
  const [sheepModalOpen, setSheepModalOpen] = useState(false);
  const [selectedSheep, setSelectedSheep] = useState(null);
  const [selectedSheepIndex, setSelectedSheepIndex] = useState(-1);
  const [farm, setFarm] = useState(theFarm);

  const toggleSheepModal = () => {
    setSheepModalOpen(!sheepModalOpen)
  };

  interface Sex {
    label: string;
    value: string;
  }
  
  interface Branded {
    label: string;
    value: boolean;
  }
  
  interface FormValues {
    name: string;
    sex: Sex;
    branded: Branded
  }

  const submitSheep = (values: FormValues, index: number = -1) => {
    const newSheep = new Sheep(values.name, values.sex, values.branded);
    if (index > -1) {
      farm.flock[selectedSheepIndex].name = values.name;
      farm.flock[selectedSheepIndex].sex = values.sex;
      farm.flock[selectedSheepIndex].branded = values.branded;
    } else {
      farm.flock.push(newSheep)
    }    
    setFarm(farm);
    setSelectedSheep(null);
    setSelectedSheepIndex(-1);
    toggleSheepModal();
  }

  const rollSeason = () => {
    const newFarm = farm.rollSeason();
    setFarm({...newFarm});
  }

  return (
    <div className="container" style={containerStyle}>
      <h3>{`${farm.name}, season ${farm.season}`}</h3>
      <div className="row">
        <button type="button" className="btn btn-primary m-2" onClick={toggleSheepModal} >Add Sheep</button>
        <button type="button" className="btn btn-primary m-2" onClick={rollSeason}>Continue to next Season</button>
      </div>
      <div className="row">
        {/* map through flock to represent each sheep */}
        { farm.flock.map((sheep, index) => {
          return (
            <div className="col-4 col-md-3 col-lg-2" key={sheep.name}>
              <SheepCard sheep={sheep} toggleSheepModal={toggleSheepModal} submitSheep={submitSheep} index={index} setSelectedSheepIndex={setSelectedSheepIndex} setSelectedSheep={setSelectedSheep}/>
            </div>
          )
        })}
      </div>
      <SheepModal sheepModalOpen={sheepModalOpen} toggleSheepModal={toggleSheepModal} submitSheep={submitSheep} sheep={selectedSheep} index={selectedSheepIndex}/>
    </div>
      
  );
}

const containerStyle: CSS.Properties = {
  backgroundColor: '#27AE60',
  padding: '50px',
  height: '100vh'
}

export default TheField;
