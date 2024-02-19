import React from 'react';
import '../ScorePage.css';

const ScorePage = ({ score, totalQuestions, incorrectAnswers }) => {
  return (
    <div className="score-container">
      <h1 className="score-title">Your Quiz Score:</h1>
      <p className="score">{`Your score is: ${score}/${totalQuestions}`}</p>

      {incorrectAnswers.length > 0 && (
        <div className="incorrect-questions">
          <h4>Questions Answered Incorrectly:</h4>
          <ul className='answer-list'>
            {incorrectAnswers.map(({ question, selectedAnswer, correctAnswer }) => (
              <li key={question.id} className="incorrect-question">
                <p className="question-content">{question.content}</p>
                <p className="answer-info">{`Your Answer: ${selectedAnswer.content}`}</p>
                <p className="answer-info">{`Correct Answer: ${correctAnswer.content}`}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ScorePage;


