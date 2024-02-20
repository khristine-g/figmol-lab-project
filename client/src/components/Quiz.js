import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../Quiz.css';
import ScorePage from './ScorePage';

const Quiz = () => {
  const { id } = useParams(); // Use useParams to get the quiz title from the URL
  const [quiz, setQuiz] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 5;

  useEffect(() => {
    // Fetch quiz data from the Rails API using the title parameter
    fetch(`/quizzes/show_by_title/${encodeURIComponent(id)}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to fetch quiz: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Received quiz data:', data);
        setQuiz(data);
      })
      .catch(error => {
        console.error('Error fetching quiz data:', error);
        // Handle error appropriately
      });
  }, [id]); // Add 'id' to the dependency array

  const handleAnswerSelect = (questionId, answerId) => {
    setSelectedAnswers(prevAnswers => ({ ...prevAnswers, [questionId]: answerId }));
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    const incorrectAnswersList = [];

    // Check if quiz is available and has questions
    if (quiz && quiz.questions) {
      // Loop through questions and check if selected answer is correct
      quiz.questions.forEach((question) => {
        const selectedAnswerId = selectedAnswers[question.id];
        const correctAnswer = question.answers.find((answer) => answer.correct);

        // Check if correctAnswer is defined before accessing its properties
        if (correctAnswer && selectedAnswerId === correctAnswer.id) {
          correctAnswers += 1;
        } else {
          // Track incorrect answers
          incorrectAnswersList.push({
            question,
            selectedAnswer: question.answers.find((answer) => answer.id === selectedAnswerId),
            correctAnswer,
          });
        }
      });
    }

    setIncorrectAnswers(incorrectAnswersList);

    return correctAnswers;
  };

  const handleSubmit = () => {
    // Check if all questions are answered before submitting
    const allQuestionsAnswered = quiz.questions.every(question => selectedAnswers[question.id]);

    if (allQuestionsAnswered) {
      // Calculate the score
      const userScore = calculateScore();

      // Update the state to indicate submission and set the score
      setSubmitted(true);
      setScore(userScore);
    } else {
      alert('Please answer all questions before submitting.');
    }
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  if (!quiz) {
    return <div>Loading...</div>;
  }

  if (submitted) {
    // If the quiz is submitted, render the ScorePage component
    return <ScorePage score={score} totalQuestions={quiz.questions.length} incorrectAnswers={incorrectAnswers} />;
  }

  const startQuestionIndex = (currentPage - 1) * questionsPerPage;
  const endQuestionIndex = startQuestionIndex + questionsPerPage;
  const currentQuestions = quiz.questions.slice(startQuestionIndex, endQuestionIndex);

  return (
    <div className='quizpage'>
      <img className='quiz-img' src='https://apptraitsolutions.com/wp-content/uploads/2021/01/C88IZyEo7g-1.jpg' alt='quiz logo'/>
      <h3 className='topic'>{quiz.topic}</h3>
      <h4 className='subtopic'>{quiz.subtopic}</h4>
      <h1 className='quiz-title'>{quiz.title}</h1>
      {currentQuestions.map((question, index) => (
        <div key={question.id}>
         <h6 className='question'>{`${startQuestionIndex + index + 1}. ${question.content}`}</h6>
          <ul className='answers'>
            {question.answers.map(answer => (
              <li key={answer.id}>
                <label className='radio-btn'>
                  <input 
                    type="radio"
                    name={`question_${question.id}`}
                    value={answer.id}
                    checked={selectedAnswers[question.id] === answer.id}
                    onChange={() => handleAnswerSelect(question.id, answer.id)}
                  />
                  {answer.content}
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div className="pagination-buttons">
        <button className="pagination-btn" onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <button className="pagination-btn" onClick={handleNextPage} disabled={endQuestionIndex >= quiz.questions.length}>
          Next
        </button>
      </div>
      {currentPage === Math.ceil(quiz.questions.length / questionsPerPage) && (
        <button className='submit-btn' onClick={handleSubmit} disabled={submitted}>
          {submitted ? 'Quiz Submitted' : 'Submit Quiz'}
        </button>
      )}
    </div>
  );
};

export default Quiz;

// // Quiz.js
// import React, { useState, useEffect } from 'react';
// import '../Quiz.css';
// import ScorePage from './ScorePage';

// const Quiz = () => {
//   const [quiz, setQuiz] = useState(null);
//   const [selectedAnswers, setSelectedAnswers] = useState({});
//   const [submitted, setSubmitted] = useState(false);
//   const [score, setScore] = useState(null);
//   const [incorrectAnswers, setIncorrectAnswers] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const questionsPerPage = 5;

//   useEffect(() => {
//     // Fetch quiz data from  Rails API
//     fetch('/quizzes') 
//       .then(response => response.json())
//       .then(data => {
//         console.log('Received data:', data);
//         setQuiz(data[0]); 
//       })
//       .catch(error => console.error('Error fetching quiz data:', error));
//   }, []);

//   const handleAnswerSelect = (questionId, answerId) => {
//     setSelectedAnswers(prevAnswers => ({ ...prevAnswers, [questionId]: answerId }));
//   };

//   const calculateScore = () => {
//     let correctAnswers = 0;
//     const incorrectAnswersList = [];

//     // Check if quiz is available and has questions
//     if (quiz && quiz.questions) {
//       // Loop through questions and check if selected answer is correct
//       quiz.questions.forEach((question) => {
//         const selectedAnswerId = selectedAnswers[question.id];
//         const correctAnswer = question.answers.find((answer) => answer.correct);

//         // Check if correctAnswer is defined before accessing its properties
//         if (correctAnswer && selectedAnswerId === correctAnswer.id) {
//           correctAnswers += 1;
//         } else {
//           // Track incorrect answers
//           incorrectAnswersList.push({
//             question,
//             selectedAnswer: question.answers.find((answer) => answer.id === selectedAnswerId),
//             correctAnswer,
//           });
//         }
//       });
//     }

//     setIncorrectAnswers(incorrectAnswersList);

//     return correctAnswers;
//   };

//   const handleSubmit = () => {
//     // Check if all questions are answered before submitting
//     const allQuestionsAnswered = quiz.questions.every(question => selectedAnswers[question.id]);

//     if (allQuestionsAnswered) {
//       // Calculate the score
//       const userScore = calculateScore();

//       // Update the state to indicate submission and set the score
//       setSubmitted(true);
//       setScore(userScore);
//     } else {
//       alert('Please answer all questions before submitting.');
//     }
//   };

//   const handleNextPage = () => {
//     setCurrentPage(prevPage => prevPage + 1);
//   };

//   const handlePreviousPage = () => {
//     setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
//   };

//   if (!quiz) {
//     return <div>Loading...</div>;
//   }

//   if (submitted) {
//     // If the quiz is submitted, render the ScorePage component
//     return <ScorePage score={score} totalQuestions={quiz.questions.length} incorrectAnswers={incorrectAnswers} />;
//   }

//   const startQuestionIndex = (currentPage - 1) * questionsPerPage;
//   const endQuestionIndex = startQuestionIndex + questionsPerPage;
//   const currentQuestions = quiz.questions.slice(startQuestionIndex, endQuestionIndex);

//   return (
//     <div className='quizpage'>
//       <img className='quiz-img' src='https://apptraitsolutions.com/wp-content/uploads/2021/01/C88IZyEo7g-1.jpg' alt='quiz logo'/>
//       <h3 className='topic'>{quiz.topic}</h3>
//       <h4 className='subtopic'>{quiz.subtopic}</h4>
//       <h1 className='quiz-title'>{quiz.title}</h1>
//       {currentQuestions.map(question => (
//         <div key={question.id}>
//           <h6 className='question'>{question.content}</h6>
//           <ul className='answers'>
//             {question.answers.map(answer => (
//               <li key={answer.id}>
//                 <label className='radio-btn'>
//                   <input 
//                     type="radio"
//                     name={`question_${question.id}`}
//                     value={answer.id}
//                     checked={selectedAnswers[question.id] === answer.id}
//                     onChange={() => handleAnswerSelect(question.id, answer.id)}
//                   />
//                   {answer.content}
//                 </label>
//               </li>
//             ))}
//           </ul>
//         </div>
//       ))}
//       <div className="pagination-buttons">
//         <button className="pagination-btn" onClick={handlePreviousPage} disabled={currentPage === 1}>
//           Previous
//         </button>
//         <button className="pagination-btn" onClick={handleNextPage} disabled={endQuestionIndex >= quiz.questions.length}>
//           Next
//         </button>
//       </div>
//       {currentPage === Math.ceil(quiz.questions.length / questionsPerPage) && (
//         <button className='submit-btn' onClick={handleSubmit} disabled={submitted}>
//           {submitted ? 'Quiz Submitted' : 'Submit Quiz'}
//         </button>
//       )}
//     </div>
//   );
// };

// export default Quiz;

