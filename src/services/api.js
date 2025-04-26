import questions from '../data/questions.json';

export const fetchQuestions = async () => {
  // simulate delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return questions;
};
