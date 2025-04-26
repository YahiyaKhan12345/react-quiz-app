import React from 'react';

const Option = ({ index, text, selected, correct, showAnswers, onSelect }) => {
  const handleClick = () => {
    onSelect(index);
  };

  let className = "option";

  if (showAnswers) {
    if (correct) {
      className += " correct";
    } else if (selected && !correct) {
      className += " wrong";
    }
  } else if (selected) {
    className += " selected";
  }

  return (
    <div className={className} onClick={handleClick}>
      {text}
    </div>
  );
};

export default Option;
