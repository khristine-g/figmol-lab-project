import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../QuizTitles.css';

const QuizTitles = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/quizzes')
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to fetch quizzes: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Received data:', data);
        if (data !== null) {
          setQuizzes(data);
        } else {
          setError('No quizzes available');
        }
      })
      .catch(error => {
        console.error('Error fetching quizzes:', error);
        setError(error.message || 'Error fetching quizzes');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching quiz titles: {error.message}</div>;
  }

  return (
    <div>
      <h1 className='title-header'> Quizes</h1>
      {quizzes.length === 0 ? (
        <p>No quiz titles available.</p>
      ) : (
        <ul className='Quiz-title'>
          {quizzes.map((quiz, index) => (
            <li className='quiz-list' key={index}>
              {/* Link to Quiz component with the quiz title */}
              <Link to={`/quiz/${encodeURIComponent(quiz.title)}`}>{quiz.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default QuizTitles;


// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import '../QuizTitles.css';

// const QuizTitles = () => {
//   const [quizzes, setQuizzes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetch('/quizzes')
//       .then(response => {
//         if (!response.ok) {
//           throw new Error(`Failed to fetch quizzes: ${response.status}`);
//         }
//         return response.json();
//       })
//       .then(data => {
//         console.log('Received data:', data);
//         if (data !== null) {
//           setQuizzes(data);
//         } else {
//           setError('No quizzes available');
//         }
//       })
//       .catch(error => {
//         console.error('Error fetching quizzes:', error);
//         setError(error.message || 'Error fetching quizzes');
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error fetching quiz titles: {error.message}</div>;
//   }

//   return (
//     <div>
//       <h1>Quiz Titles</h1>
//       {quizzes.length === 0 ? (
//         <p>No quiz titles available.</p>
//       ) : (
//         <ul className='Quiz-title'>
//           {quizzes.map((quiz, index) => (
//          <li className='quiz-list'key={index}>
//           <Link to={`/quizzes/${encodeURIComponent(quiz.title)}`}>{quiz.title}</Link>
//          </li>
// ))}

//         </ul>
//       )}
//     </div>
//   );
// };

// export default QuizTitles;
