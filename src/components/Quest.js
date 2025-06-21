import React, { useState } from 'react';

const Quest = ({ progress, setProgress, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const questions = [
    {
      id: 1,
      type: 'choice',
      question: 'Помнишь, сколько галерей-музеев-фестивалей вы насобирали в таблице?',
      options: ['64', '96', '128', '156'],
      correct: 2,
      hint: 'Ты же писала мне об этом в апреле...'
    },
    {
      id: 2,
      type: 'choice',
      question: 'Какой музей в Барселоне ты добавляла в RSS-ленту?',
      options: ['MNAC', 'MACBA', 'Picasso Museum', 'Joan Miró Foundation'],
      correct: 1,
      hint: 'Музей современного искусства...'
    },
    {
      id: 3,
      type: 'input',
      question: 'В каком боте можно посмотреть статистику аренды жилья в Испании?',
      placeholder: 'Введи username бота',
      correct: '@spainrental_bot',
      hint: 'Виталик показывал тебе этого бота...'
    },
    {
      id: 4,
      type: 'data',
      question: 'Выбери правильную последовательность: что важнее всего при сборе данных о галереях?',
      options: [
        ['Name', 'Instagram', 'Coordinates', 'Address'],
        ['Type', 'Name', 'Web', 'Instagram'],
        ['Google link', 'Address', 'Schedule', 'Phone'],
        ['Artists', 'Events', 'Tickets', 'Reviews']
      ],
      correct: 1,
      hint: 'Ты сама составляла эту структуру...'
    },
    {
      id: 5,
      type: 'choice',
      question: 'Что самое важное в подарке?',
      options: ['Цена', 'Размер', 'Внимание', 'Упаковка'],
      correct: 2,
      hint: 'Ты сама это написала 😊'
    }
  ];

  const handleAnswer = (answerIndex) => {
    const question = questions[currentQuestion];
    let isCorrect = false;

    if (question.type === 'choice' || question.type === 'data') {
      isCorrect = answerIndex === question.correct;
    } else if (question.type === 'input') {
      isCorrect = inputValue.toLowerCase().trim() === question.correct.toLowerCase();
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
      <h2>Вопрос {currentQuestion + 1} из {questions.length}</h2>
      
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      </div>

      <h3>{question.question}</h3>

      {question.type === 'choice' && (
        <div>
          {question.options.map((option, index) => (
            <button
              key={index}
              className="answer-button"
              onClick={() => handleAnswer(index)}
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
          <button onClick={() => handleAnswer()}>Проверить</button>
        </div>
      )}

      {question.type === 'data' && (
        <div className="art-grid">
          {question.options.map((option, index) => (
            <div
              key={index}
              className="art-item"
              onClick={() => handleAnswer(index)}
            >
              {option.join(' → ')}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Quest;