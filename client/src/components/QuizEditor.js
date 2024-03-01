import React, { useState, useEffect } from 'react';
import '../QuizEditor.css';

const QuizEditor = () => {
  const [selectedQuizId, setSelectedQuizId] = useState(null);
  const [quizzes, setQuizzes] = useState([]);
  const [quiz, setQuiz] = useState(null);
  const [newQuestionContent, setNewQuestionContent] = useState('');
  const [newAnswers, setNewAnswers] = useState([
    { content: '', correct: false },
    { content: '', correct: false },
    { content: '', correct: false },
    { content: '', correct: false },
  ]);

  useEffect(() => {
    fetch('/quizzes')
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to fetch quizzes: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setQuizzes(data);
      })
      .catch(error => {
        console.error('Error fetching quizzes:', error);
      });
  }, []);

  useEffect(() => {
    if (selectedQuizId) {
      fetch(`/quizzes/show_by_title/${selectedQuizId}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Failed to fetch quiz: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          setQuiz(data);
        })
        .catch(error => {
          console.error('Error fetching quiz data:', error);
        });
    }
  }, [selectedQuizId]);

  const handleDeleteQuiz = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const response = await fetch(`/quizzes/${encodeURIComponent(quiz.title)}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error deleting quiz: ${response.statusText}`);
      }

      window.location.href = '/';
    } catch (error) {
      console.error('Error deleting quiz:', error);
    }
  };

  const handleDeleteQuestion = async (questionId) => {
    try {
      const token = localStorage.getItem("jwtToken");
      const response = await fetch(`/quizzes/${selectedQuizId}/questions/${questionId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error deleting question: ${response.statusText}`);
      }

      setQuiz(prevQuiz => ({
        ...prevQuiz,
        questions: prevQuiz.questions.filter(q => q.id !== questionId),
      }));
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  };

  const handleQuizSelectionChange = (event) => {
    const selectedId = event.target.value;
    setSelectedQuizId(selectedId);
  };

  const handleNewAnswerChange = (answerIndex, event) => {
    const updatedAnswers = [...newAnswers];
    updatedAnswers[answerIndex].content = event.target.value;
    setNewAnswers(updatedAnswers);
  };
  // Change the function name here as well
const handleNewAnswerCorrectIndexChange = (answerIndex) => {
  const updatedAnswers = [...newAnswers];
  updatedAnswers.forEach((answer, index) => {
    answer.correct = index === answerIndex;
  });
  setNewAnswers(updatedAnswers);
};


const handleAddQuestion = async () => {
  if (!selectedQuizId) {
    console.error('Quiz ID is undefined.');
    return;
  }

  try {
    const token = localStorage.getItem('jwtToken');
    const response = await fetch(`/quizzes/${encodeURIComponent(selectedQuizId)}/questions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        content: newQuestionContent,
        answers_attributes: newAnswers.map(answer => ({ content: answer.content, correct: answer.correct })),
      }),
    });

    if (!response.ok) {
      throw new Error(`Error adding question: ${response.statusText}`);
    }

    const responseData = await response.json();

    setQuiz(prevQuiz => ({
      ...prevQuiz,
      questions: [...prevQuiz.questions, responseData],
    }));

    setNewQuestionContent('');
    setNewAnswers([
      { content: '', correct: false },
      { content: '', correct: false },
      { content: '', correct: false },
      { content: '', correct: false },
    ]);
  } catch (error) {
    console.error('Error adding question:', error);
  }
};

  return (
    <div className="quiz-editor-container">
      <h1 className="quiz-editor-title">Edit Quiz: {quiz && quiz.title}</h1>

      <select onChange={handleQuizSelectionChange}>
        <option value="">Select a quiz</option>
        {quizzes.map(q => (
          <option key={q.id} value={q.title}>{q.title}</option>
        ))}
      </select>

      <button className="delete-quiz-button" onClick={handleDeleteQuiz}>Delete Quiz</button>

      <form>
        <label>
          New Question:
          <input type="text" value={newQuestionContent} onChange={(e) => setNewQuestionContent(e.target.value)} />
        </label>
        {/* Map through new answers and display them */}
        {newAnswers.map((answer, index) => (
          <div key={index} className="new-answer-container">
            <label>
              Answer {String.fromCharCode(97 + index)}:
              <input
                type="text"
                value={answer.content}
                onChange={(e) => handleNewAnswerChange(index, e)}
              />
            </label>
          </div>
        ))}

        <label className="correct-answer-label">
          Correct Answer:
          <select
            className="correct-answer-select"
            value={newAnswers.findIndex(answer => answer.correct)}
            onChange={(e) => handleNewAnswerCorrectIndexChange(parseInt(e.target.value, 10))}
          >
            {newAnswers.map((answer, index) => (
              <option key={index} value={index}>
                {String.fromCharCode(97 + index)}
              </option>
            ))}
          </select>
        </label>

        <button type="button" onClick={handleAddQuestion}>
          Add Question
        </button>
      </form>

      {quiz && quiz.questions.map((question, index) => (
        <div key={index} className="question-container">
          <h2 className="question-title">Question: {question.content}</h2>
          <button className="delete-question-button" onClick={() => handleDeleteQuestion(question.id)}>Delete Question</button>
        </div>
      ))}
    </div>
  );
};

export default QuizEditor;


// import React, { useState, useEffect } from 'react';
// import '../QuizEditor.css';

// const QuizEditor = () => {
//   const [selectedQuizId, setSelectedQuizId] = useState(null);
//   const [quizzes, setQuizzes] = useState([]);
//   const [quiz, setQuiz] = useState(null);
//   const [newQuestionContent, setNewQuestionContent] = useState('');
//   const [newAnswers, setNewAnswers] = useState([
//     { content: '', correct: false },
//     { content: '', correct: false },
//     { content: '', correct: false },
//     { content: '', correct: false },
//   ]);
//   const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(null);

//   useEffect(() => {
//     fetch('/quizzes')
//       .then(response => {
//         if (!response.ok) {
//           throw new Error(`Failed to fetch quizzes: ${response.status}`);
//         }
//         return response.json();
//       })
//       .then(data => {
//         setQuizzes(data);
//       })
//       .catch(error => {
//         console.error('Error fetching quizzes:', error);
//       });
//   }, []);

//   useEffect(() => {
//     if (selectedQuizId) {
//       fetch(`/quizzes/show_by_title/${selectedQuizId}`)
//         .then(response => {
//           if (!response.ok) {
//             throw new Error(`Failed to fetch quiz: ${response.status}`);
//           }
//           return response.json();
//         })
//         .then(data => {
//           setQuiz(data);
//         })
//         .catch(error => {
//           console.error('Error fetching quiz data:', error);
//         });
//     }
//   }, [selectedQuizId]);

//   const handleDeleteQuiz = async () => {
//     try {
//       const token = localStorage.getItem("jwtToken");
//       const response = await fetch(`/quizzes/${encodeURIComponent(quiz.title)}`, {
//         method: "DELETE",
//         headers: {
//           "Authorization": `Bearer ${token}`,
//         },
//       });

//       if (!response.ok) {
//         throw new Error(`Error deleting quiz: ${response.statusText}`);
//       }

//       window.location.href = '/';
//     } catch (error) {
//       console.error('Error deleting quiz:', error);
//     }
//   };

//   const handleDeleteQuestion = async (questionId) => {
//     try {
//       const token = localStorage.getItem("jwtToken");
//       const response = await fetch(`/quizzes/${selectedQuizId}/questions/${questionId}`, {
//         method: "DELETE",
//         headers: {
//           "Authorization": `Bearer ${token}`,
//         },
//       });

//       if (!response.ok) {
//         throw new Error(`Error deleting question: ${response.statusText}`);
//       }

//       setQuiz(prevQuiz => ({
//         ...prevQuiz,
//         questions: prevQuiz.questions.filter(q => q.id !== questionId),
//       }));
//     } catch (error) {
//       console.error('Error deleting question:', error);
//     }
//   };

//   const handleQuizSelectionChange = (event) => {
//     const selectedId = event.target.value;
//     setSelectedQuizId(selectedId);
//     setSelectedQuestionIndex(null);
//   };

//   const handleNewAnswerChange = (answerIndex, event) => {
//     const updatedAnswers = [...newAnswers];
//     updatedAnswers[answerIndex].content = event.target.value;
//     setNewAnswers(updatedAnswers);
//   };

//   const handleNewAnswerCorrectChange = (answerIndex) => {
//     const updatedAnswers = [...newAnswers];
//     updatedAnswers.forEach((answer, index) => {
//       answer.correct = index === answerIndex;
//     });
//     setNewAnswers(updatedAnswers);
//   };

//   const handleAddQuestion = async () => {
//     if (!selectedQuizId) {
//       console.error('Quiz ID is undefined.');
//       return;
//     }

//     try {
//       const token = localStorage.getItem('jwtToken');
//       const response = await fetch(`/quizzes/${encodeURIComponent(selectedQuizId)}/questions`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           content: newQuestionContent,
//           answers_attributes: newAnswers.map(answer => ({ content: answer.content, correct: answer.correct })),
//         }),
//       });

//       if (!response.ok) {
//         throw new Error(`Error adding question: ${response.statusText}`);
//       }

//       const responseData = await response.json();

//       setQuiz(prevQuiz => ({
//         ...prevQuiz,
//         questions: [...prevQuiz.questions, responseData],
//       }));

//       setNewQuestionContent('');
//       setNewAnswers([
//         { content: '', correct: false },
//         { content: '', correct: false },
//         { content: '', correct: false },
//         { content: '', correct: false },
//       ]);
//     } catch (error) {
//       console.error('Error adding question:', error);
//     }
//   };

//   return (
//     <div className="quiz-editor-container">
//       <h1 className="quiz-editor-title">Edit Quiz: {quiz && quiz.title}</h1>

//       <select onChange={handleQuizSelectionChange}>
//         <option value="">Select a quiz</option>
//         {quizzes.map(q => (
//           <option key={q.id} value={q.title}>{q.title}</option>
//         ))}
//       </select>

//       <button className="delete-quiz-button" onClick={handleDeleteQuiz}>Delete Quiz</button>

//       <form>
//         <label>
//           New Question:
//           <input type="text" value={newQuestionContent} onChange={(e) => setNewQuestionContent(e.target.value)} />
//         </label>
//         {/* Map through new answers and display them */}
//         {newAnswers.map((answer, index) => (
//           <div key={index} className="new-answer-container">
//             <label>
//               Answer {String.fromCharCode(97 + index)}:
//               <input
//                 type="text"
//                 value={answer.content}
//                 onChange={(e) => handleNewAnswerChange(index, e)}
//               />
//             </label>
//             <input
//               type="radio"
//               name="correctAnswer"
//               checked={answer.correct}
//               onChange={() => handleNewAnswerCorrectChange(index)}
//             />
//             <span>Correct Answer</span>
//           </div>
//         ))}
        
//         <button type="button" onClick={handleAddQuestion}>
//           Add Question
//         </button>
//       </form>

//       {quiz && quiz.questions.map((question, index) => (
//         <div key={index} className="question-container">
//           <h2 className="question-title">Question: {question.content}</h2>
//           <button className="delete-question-button" onClick={() => handleDeleteQuestion(question.id)}>Delete Question</button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default QuizEditor;


