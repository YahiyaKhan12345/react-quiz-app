import React, { useEffect, useState } from 'react';
import { fetchQuestions } from './services/api';
import Question from './components/questions/Question';
import QuizSummary from './components/results/QuizSummary';

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false); // NEW

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const data = await fetchQuestions();
        setQuestions(data);
      } catch (error) {
        console.error('Failed to load questions', error);
      }
    };
    loadQuestions();
  }, []);

  const handleOptionSelect = (optionIndex) => {
    if (!showAnswers) {
      const isAlreadySelected = selectedOptions.includes(optionIndex);

      if (questions[currentQuestionIndex].type === 'multiple-choice') {
        if (isAlreadySelected) {
          setSelectedOptions(selectedOptions.filter(idx => idx !== optionIndex));
        } else {
          setSelectedOptions([...selectedOptions, optionIndex]);
        }
      } else {
        setSelectedOptions([optionIndex]);
      }
    }
  };

  const handleSubmitAnswer = () => {
    const currentQuestion = questions[currentQuestionIndex];

    const correctOptionIndexes = currentQuestion.options
      .map((opt, idx) => opt.isCorrect ? idx : null)
      .filter(idx => idx !== null);

    const isCorrect =
      currentQuestion.type === 'multiple-choice'
        ? selectedOptions.length === correctOptionIndexes.length &&
          selectedOptions.every((idx) => correctOptionIndexes.includes(idx))
        : correctOptionIndexes.includes(selectedOptions[0]);

    if (isCorrect) {
      setScore(score + 1);
    }

    setShowAnswers(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOptions([]);
      setShowAnswers(false);
    } else {
      setQuizFinished(true);
    }
  };

  if (questions.length === 0) {
    return <div className="loading">Loading questions...</div>;
  }

  if (quizFinished) {
    return <QuizSummary score={score} total={questions.length} />;
  }

  return (
    <div className="app">
      <header className="header">
        <h1>🚀 React Quiz App</h1>
      </header>

      <main className="main">
        <div className="progress">
          Question {currentQuestionIndex + 1} / {questions.length}
        </div>

        <Question
          question={questions[currentQuestionIndex]}
          selectedOptions={selectedOptions}
          onOptionSelect={handleOptionSelect}
          showAnswers={showAnswers} // Pass it
        />

        {!showAnswers ? (
          <button className="submit-btn" onClick={handleSubmitAnswer}>
            Submit Answer
          </button>
        ) : (
          <button className="submit-btn" onClick={handleNextQuestion}>
            {currentQuestionIndex + 1 === questions.length ? "Finish Quiz" : "Next Question"}
          </button>
        )}
      </main>

      <footer className="footer">
        <p>Good luck 🍀</p>
      </footer>
    </div>
  );
};

export default App;
