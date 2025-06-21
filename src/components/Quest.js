import React, { useState } from 'react';

const Quest = ({ progress, setProgress, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const questions = [
    {
      id: 1,
      type: 'choice',
      question: 'Если бы галереи Барселоны были пылью в пустыне, сколько песчинок ты насобирала?',
      options: ['∞ бесконечность', '128 священных крупинок', '42 (ответ на всё)', 'Столько, сколько звёзд над плайей'],
      correct: 1,
      hint: 'Ты же писала мне точное число в апреле... 128!'
    },
    {
      id: 2,
      type: 'choice',
      question: 'В параллельной вселенной ты куратор. Какую выставку ты открываешь?',
      options: [
        '"Данные как искусство: визуализация хаоса"',
        '"Руфтопы Барселоны: между небом и бетоном"',
        '"JSON-поэзия современности"',
        '"В одном ряду с Бритни: поп-арт абсурда"'
      ],
      correct: 3,
      hint: 'Помнишь, как ты угарала с этого? "В одном ряду с Бритни"!'
    },
    {
      id: 3,
      type: 'choice',
      question: 'Дух пустыни предлагает тебе выбрать транспорт для путешествия по Испании. Что выбираешь?',
      options: [
        '🚐 Автодом за евро в день',
        '🚌 Автобус после размытия дорог',
        '🦩 Розовый фламинго',
        '📊 График медианной стоимости аренды'
      ],
      correct: 0,
      hint: 'Виталик же рекомендовал автодом в Италии за евро в день!'
    },
    {
      id: 4,
      type: 'choice',
      question: 'На Burning Man ты создаёшь арт-инсталляцию из данных. Что в основе?',
      options: [
        'Координаты всех музеев, превращённые в созвездие',
        'RSS-ленты MACBA, звучащие как мантры',
        'Instagram-парсинг, рисующий мандалы',
        'Всё вышеперечисленное в виде дата-скульптуры'
      ],
      correct: 3,
      hint: 'Твоя главная тема - собирать и структурировать данные о галереях!'
    },
    {
      id: 5,
      type: 'ritual',
      question: 'Финальный ритуал: расставь элементы идеального подарка по важности',
      options: ['💰 Цена', '📏 Размер', '💝 Внимание', '🎁 Упаковка'],
      correct: [2, 0, 1, 3], // Внимание первое
      hint: 'Ты же сама сказала: "для меня самое важное внимание"'
    },
    {
      id: 6,
      type: 'choice',
      question: 'Deep playa soulmate видит в тебе...',
      options: [
        'Хранительницу данных пустыни',
        'Картографа несуществующих галерей',
        'Ту, кто превращает хаос в структуру',
        'Искателя искусства в шуме информации'
      ],
      correct: 2,
      hint: 'Вся твоя работа - это превращение хаоса данных в красивые структуры!'
    }
  ];

  const handleAnswer = (answerIndex) => {
    const question = questions[currentQuestion];
    let isCorrect = false;

    if (question.type === 'choice') {
      isCorrect = answerIndex === question.correct;
    } else if (question.type === 'input') {
      const answer = inputValue.toLowerCase().trim();
      isCorrect = answer === question.correct || 
                  (question.alternatives && question.alternatives.some(alt => answer.includes(alt.toLowerCase())));
    } else if (question.type === 'ritual') {
      // Для ритуала - проверяем, что "Внимание" на первом месте
      isCorrect = answerIndex === 2;
    }

    if (isCorrect) {
      const newAnswers = [...answers, { question: currentQuestion, correct: true }];
      setAnswers(newAnswers);
      
      const newProgress = ((currentQuestion + 1) / questions.length) * 100;
      setProgress(newProgress);

      if (currentQuestion + 1 >= questions.length) {
        setTimeout(() => onComplete(), 1000);
      } else {
        setCurrentQuestion(currentQuestion + 1);
        setInputValue('');
      }
    } else {
      alert(question.hint);
    }
  };

  const question = questions[currentQuestion];

  return (
    <div className="container">
      <h2>Испытание {currentQuestion + 1} из {questions.length}</h2>
      
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      </div>

      <h3 style={{ fontSize: '1.3em', lineHeight: '1.5' }}>{question.question}</h3>

      {question.type === 'choice' && (
        <div>
          {question.options.map((option, index) => (
            <button
              key={index}
              className="answer-button"
              onClick={() => handleAnswer(index)}
              style={{ fontSize: '1.1em' }}
            >
              {option}
            </button>
          ))}
        </div>
      )}

      {question.type === 'input' && (
        <div>
          <input
            type="text"
            className="code-input"
            placeholder={question.placeholder}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleAnswer();
              }
            }}
          />
          <button onClick={() => handleAnswer()}>Ответить духу</button>
        </div>
      )}

      {question.type === 'ritual' && (
        <div>
          <p style={{ marginBottom: '20px', opacity: 0.8 }}>
            Выбери самое важное:
          </p>
          {question.options.map((option, index) => (
            <button
              key={index}
              className="answer-button"
              onClick={() => handleAnswer(index)}
              style={{ fontSize: '1.2em' }}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Quest;