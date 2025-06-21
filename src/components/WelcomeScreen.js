import React from 'react';

const WelcomeScreen = ({ onStart }) => {
  return (
    <div className="container">
      <div className="emoji">✨</div>
      <h1>С Днем Рождения, Оля!</h1>
      <p style={{ fontSize: '1.2em', marginBottom: '30px' }}>
        Сегодня портал между мирами открыт.
        <br /><br />
        Я приготовил для тебя квест из пустыни,
        <br />
        где данные танцуют с искусством,
        <br />
        а галереи превращаются в созвездия.
        <br /><br />
        <em>For my deep playa soulmate...</em>
        <br /><br />
        Готова войти в абсурд?
      </p>
      <button onClick={onStart}>Открыть портал</button>
    </div>
  );
};

export default WelcomeScreen;