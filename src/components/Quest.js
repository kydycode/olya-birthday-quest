import React, { useState } from 'react';

const Quest = ({ progress, setProgress, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const questions = [
    {
      id: 1,
      type: 'choice',
      question: 'Если бы галереи Барселоны были пылью в пустыне, сколько песчинок ты насобирала?',
      options: ['∞ бесконечность', '128 священных крупинок', '42 (ответ на всё)', 'Столько, сколько звёзд над плайей'],
      feedback: [
        'Бесконечность! Да, искусство не имеет границ...',
        '128! Точно как в твоей таблице. Ты помнишь каждую!',
        '42 - главный ответ на главный вопрос жизни, вселенной и всего такого!',
        'Поэтично! Каждая галерея - как звезда в твоей вселенной искусства.'
      ]
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
      feedback: [
        'Data artist! Превращаешь цифры в красоту.',
        'Руфтопы! Там, где город встречается с небом.',
        'JSON как поэзия - только ты можешь увидеть красоту в фигурных скобках!',
        'ХАХАХА! "В одном ряду с Бритни" - легендарно!'
      ]
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
      feedback: [
        'Автодом за евро! Как в Италии - крайне рекомендую!',
        'Автобус храбрецов! Даже размытые дороги тебя не остановят.',
        'Фламинго?! Стильно! В Барселоне всё возможно!',
        'Ха! Едешь на графике! Истинный data analyst!'
      ]
    },
    {
      id: 4,
      type: 'choice',
      question: 'На Burning Man ты создаёшь арт-инсталляцию. Что в основе?',
      options: [
        'Координаты музеев, превращённые в созвездие',
        'RSS-ленты MACBA, звучащие как техно',
        'Instagram-парсинг, рисующий мандалы',
        'Всё вышеперечисленное в виде дата-скульптуры'
      ],
      feedback: [
        'Навигация по звёздам искусства! Каждый музей - точка света.',
        'MACBA-техно! Современное искусство звучит как битбокс будущего.',
        'Инста-мандалы! Социальные сети как духовная практика.',
        'ВСЁ СРАЗУ! Максимализм достойный плайи!'
      ]
    },
    {
      id: 5,
      type: 'ritual',
      question: 'Финальный ритуал: что для тебя самое важное в подарке?',
      options: ['💰 Цена', '📏 Размер', '💝 Внимание', '🎁 Упаковка'],
      feedback: [
        'Цена? Ты ценишь вложенные ресурсы. Респект!',
        'Размер? Да, иногда важно, чтобы подарок поместился в квартиру!',
        'Внимание! Конечно! "Для меня самое важное внимание" - твои слова!',
        'Упаковка! Эстет! Красивая обертка - это тоже искусство!'
      ]
    }
  ];

  const handleAnswer = (answerIndex) => {
    const question = questions[currentQuestion];
    
    // Показываем фидбек
    setFeedbackMessage(question.feedback[answerIndex]);
    setShowFeedback(true);

    // Сохраняем ответ
    const newAnswers = [...answers, { question: currentQuestion, answer: answerIndex }];
    setAnswers(newAnswers);

    // Через 2 секунды переходим к следующему вопросу
    setTimeout(() => {
      setShowFeedback(false);
      
      const newProgress = ((currentQuestion + 1) / questions.length) * 100;
      setProgress(newProgress);

      if (currentQuestion + 1 >= questions.length) {
        setTimeout(() => onComplete(), 500);
      } else {
        setCurrentQuestion(currentQuestion + 1);
      }
    }, 2000);
  };

  const question = questions[currentQuestion];

  return (
    <div className="container">
      <h2>Путешествие {currentQuestion + 1} из {questions.length}</h2>
      
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      </div>

      {!showFeedback ? (
        <>
          <h3 style={{ fontSize: '1.3em', lineHeight: '1.5', marginBottom: '30px' }}>
            {question.question}
          </h3>

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
        </>
      ) : (
        <div style={{ 
          fontSize: '1.4em', 
          padding: '40px 20px',
          animation: 'fadeIn 0.5s ease-in'
        }}>
          <div className="emoji" style={{ fontSize: '2em', marginBottom: '20px' }}>✨</div>
          <p>{feedbackMessage}</p>
        </div>
      )}
    </div>
  );
};

export default Quest;