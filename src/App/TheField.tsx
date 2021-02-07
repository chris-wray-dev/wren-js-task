import React, { useState } from 'react';
import Sheep from './Components/Sheep/SheepCard';
import SheepModal from './Components/Sheep/SheepModal';
import CSS from 'csstype';
import { theFarm } from './Data';


const TheField = () => {
  const [sheepModalOpen, setSheepModalOpen] = useState(false);
  const [farm, setFarm] = useState(theFarm);

  const toggleSheepModal = () => {
    setSheepModalOpen(!sheepModalOpen)
  };

  // randomizeFarm = () => {
  //   const randomFarm = this.state.farm;
  //   randomFarm.flock = this.state.farm.flock.sort(() => Math.random() - 0.5)
  //   this.setState({ farm: randomFarm });
  // }
  return (
    <div className="container" style={containerStyle}>
      <div className="row">
        <button type="button" className="btn btn-primary m-2" onClick={toggleSheepModal} >Add Sheep</button>
        {/* <button type="button" className="btn btn-primary m-2" onClick={this.randomizeFarm}>Randomize</button> */}
        <button type="button" className="btn btn-primary m-2">Continue to next Season</button>
      </div>
      <div className="row">
        {/* map through flock to represent each sheep */}
        { farm.flock.map(sheep => {
          return (
            <div className="col-4 col-md-3 col-lg-2" key={sheep.name}>
              <Sheep sheep={sheep} />
            </div>
          )
        })}
      </div>
      <SheepModal sheepModalOpen={sheepModalOpen} toggleSheepModal={toggleSheepModal} setFarm={setFarm}/>
    </div>
      
  );
}

const containerStyle: CSS.Properties = {
  backgroundColor: '#27AE60',
  padding: '50px',
  height: '100vh'
}

export default TheField;
