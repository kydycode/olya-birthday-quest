import React from 'react';

const WelcomeScreen = ({ onStart }) => {
  return (
    <div className="container">
      <div className="emoji">🎨</div>
      <h1>С Днем Рождения, Оля!</h1>
      <p style={{ fontSize: '1.2em', marginBottom: '30px' }}>
        Сегодня особенный день, и я приготовил для тебя небольшой квест.
        <br /><br />
        Он про искусство Барселоны, данные и наши общие проекты.
        <br /><br />
        Готова начать путешествие?
      </p>
      <button onClick={onStart}>Начать квест</button>
    </div>
  );
};

export default WelcomeScreen;