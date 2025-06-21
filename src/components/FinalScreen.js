import React, { useState, useEffect } from 'react';

const FinalScreen = () => {
  const [showCode, setShowCode] = useState(false);
  const [decodedCode, setDecodedCode] = useState('');
  
  // Простое кодирование кода подарка
  const encodedParts = [
    'GZYY', // TYTT reversed and shifted
    'SDP2G', // FAC2T reversed and shifted  
    'AFPTZ' // ZVCQY reversed and shifted
  ];

  useEffect(() => {
    if (showCode) {
      // Декодирование
      const decoded = encodedParts.map(part => {
        return part.split('').map(char => {
          if (char.match(/[A-Z]/)) {
            const shifted = char.charCodeAt(0) - 5;
            if (shifted < 65) {
              return String.fromCharCode(shifted + 26);
            }
            return String.fromCharCode(shifted);
          }
          return char;
        }).reverse().join('');
      }).join('-');
      
      setDecodedCode(decoded);
    }
  }, [showCode]);

  const handleReveal = () => {
    setShowCode(true);
  };

  return (
    <div className="container">
      <div className="emoji">🎁</div>
      <h1>Поздравляю!</h1>
      <p style={{ fontSize: '1.2em' }}>Ты прошла весь квест! 🎉</p>
      
      {!showCode ? (
        <div>
          <p>Теперь время для настоящего подарка...</p>
          <button onClick={handleReveal}>Открыть подарок</button>
        </div>
      ) : (
        <div>
          <div className="final-message">
            <p>For my deep playa soulmate —</p>
            <p>when the dust settles and default life creeps in,</p>
            <p>drop the needle.</p>
            <p>Let the crackle carry you back to starlit silence, glowing art,</p>
            <p>and that feeling that everything is possible.</p>
            <p>Stay wild. 🖤</p>
          </div>
          
          <p style={{ fontSize: '1.3em', marginTop: '30px' }}>Gift card code для винилового магазина:</p>
          <div className="gift-code">
            {decodedCode}
          </div>
          
          <p style={{ marginTop: '30px', fontSize: '0.9em', opacity: 0.8 }}>
            P.S. Спасибо за все наши проекты и разговоры про искусство и данные. 
            <br />Ты делаешь Барселону ярче! 🎨✨
          </p>
        </div>
      )}
    </div>
  );
};

export default FinalScreen;