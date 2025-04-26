import React from 'react';
import Option from './Option';
import CodeSnippet from './CodeSnippet';

const Question = ({ question, selectedOptions, onOptionSelect, showAnswers }) => {
  return (
    <div className="question-card">
      <h2>{question.question}</h2>

      {question.type === 'code-snippet' && question.code && (
        <CodeSnippet code={question.code} />
      )}

      <div className="options">
        {question.options.map((option, index) => (
          <Option
            key={index}
            index={index}
            text={option.text}
            selected={selectedOptions.includes(index)}
            correct={option.isCorrect}
            showAnswers={showAnswers}
            onSelect={onOptionSelect}
          />
        ))}
      </div>
    </div>
  );
};

export default Question;
