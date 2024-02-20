import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const QuizTitle = () => {
  const { title } = useParams();
  const [quiz, setQuiz] = useState(null);

  useEffect(() => {
    // Fetch quiz data based on the selected title from the API endpoint
    fetch(`/quizzes/show_by_title/${encodeURIComponent(title)}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Quiz not found: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Received data:', data);
        setQuiz(data);
      })
      .catch(error => console.error('Error fetching quiz data:', error));
  }, [title]);

  if (!quiz) {
    return <div>Quiz not found</div>;
  }

  return (
    <div>
      <h1>{quiz.title}</h1>
     
      {/* Render other quiz details as needed */}
    </div>
  );
};

export default QuizTitle;
