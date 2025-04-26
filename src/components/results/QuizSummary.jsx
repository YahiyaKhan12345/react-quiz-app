import React from 'react';

const QuizSummary = ({ score, total }) => {
  return (
    <div className="summary-card">
      <h2>🎉 Quiz Completed!</h2>
      <p>Your Score: <strong>{score}</strong> out of <strong>{total}</strong></p>
      <button 
        onClick={() => window.location.reload()} 
        style={{ 
          marginTop: '20px', 
          padding: '10px 20px', 
          backgroundColor: '#4caf50', 
          border: 'none', 
          borderRadius: '10px',
          color: 'white',
          cursor: 'pointer'
        }}
      >
        Restart Quiz
      </button>
    </div>
  );
};

export default QuizSummary;
