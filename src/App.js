import React from 'react';
import Particles from 'react-particles-js';
import './App.css';

import MasterDetails from './components/MasterDetails/MasterDetails';

const particlesOptions = {
  particles: {
    number: {
      value: 90,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

function App() {


  return (
    <div className="App">
      <Particles className='particles'
      params={particlesOptions}
      />
      <MasterDetails />
    </div>
  );
}

export default App;
