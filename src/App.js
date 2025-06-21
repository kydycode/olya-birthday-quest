import React, { useState } from 'react';
import './App.css';
import WelcomeScreen from './components/WelcomeScreen';
import Quest from './components/Quest';
import FinalScreen from './components/FinalScreen';

function App() {
  const [currentStage, setCurrentStage] = useState('welcome');
  const [questProgress, setQuestProgress] = useState(0);

  const handleStart = () => {
    setCurrentStage('quest');
  };

  const handleQuestComplete = () => {
    setCurrentStage('final');
  };

  return (
    <div className="App">
      {currentStage === 'welcome' && <WelcomeScreen onStart={handleStart} />}
      {currentStage === 'quest' && (
        <Quest 
          progress={questProgress} 
          setProgress={setQuestProgress}
          onComplete={handleQuestComplete}
        />
      )}
      {currentStage === 'final' && <FinalScreen />}
    </div>
  );
}

export default App;