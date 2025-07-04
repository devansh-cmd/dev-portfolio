import React from 'react';
import FlowingMouseTrail from './components/FlowingMouseTrail';
import Hero from './components/Hero';
import './index.css'; 

function App() {
  return (
    <div className="App">
      <FlowingMouseTrail/>
      <main className="relative z-20">
        <Hero/>
      </main>
    </div>
  );
}

export default App;
