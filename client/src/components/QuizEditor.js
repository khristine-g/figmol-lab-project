// QuizEditor.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../QuizEditor.css'; // Import your CSS file

const QuizEditor = () => {
  const [selectedQuizId, setSelectedQuizId] = useState(null);
  const { id } = useParams();

  const [quizzes, setQuizzes] = useState([]);
  const [quiz, setQuiz] = useState(null);

  const [newQuestionContent, setNewQuestionContent] = useState('');
  const [newAnswers, setNewAnswers] = useState([{ content: '', correct: false }]);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(0);

  useEffect(() => {
    // Fetch all quizzes for the dropdown
    fetch('/quizzes')
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to fetch quizzes: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Received quiz data:', data);
        setQuizzes(data);
      })
      .catch(error => {
        console.error('Error fetching quizzes:', error);
        // Handle error appropriately
      });
  }, []);

  useEffect(() => {
    // Fetch quiz data from the Rails API using the selectedQuizId
    if (selectedQuizId) {
      fetch(`/quizzes/show_by_title/${encodeURIComponent(selectedQuizId)}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Failed to fetch quiz: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          console.log('Received quiz data:', data);
          setQuiz(data);
          // Update selectedQuizId with the actual quiz title
          setSelectedQuizId(data.title);
        })
        .catch(error => {
          console.error('Error fetching quiz data:', error);
          // Handle error appropriately
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
  
      // Redirect to the home page or any other desired page after deletion
      window.location.href = '/';
    } catch (error) {
      console.error('Error deleting quiz:', error);
      // Handle error appropriately
    }
  };
  const handleDeleteQuestion = async (questionId) => {
    try {
      const token = localStorage.getItem("jwtToken");
  
      if (quiz) {
        const response = await fetch(`/quizzes/${encodeURIComponent(quiz.id)}/questions/${encodeURIComponent(questionId)}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
  
        if (!response.ok) {
          throw new Error(`Error deleting question: ${response.statusText}`);
        }
  
        // Update state to trigger re-render
        setQuiz(prevQuiz => ({
          ...prevQuiz,
          questions: prevQuiz.questions.filter(q => q.id !== questionId),
        }));
      } else {
        console.error('Error deleting question: Quiz is undefined');
      }
    } catch (error) {
      console.error('Error deleting question:', error);
      // Handle error appropriately
    }
  };
  
  
  const handleQuizSelectionChange = (event) => {
    const selectedId = event.target.value;
    setSelectedQuizId(selectedId);
  };

  const handleNewQuestionSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("jwtToken");

      const response = await fetch(`/quizzes/${encodeURIComponent(id)}/questions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          content: newQuestionContent,
          answers_attributes: newAnswers.map(answer => ({ content: answer.content, correct: answer.correct })),
          correct_answer_index: correctAnswerIndex,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error adding question: ${response.statusText}`);
      }

      // Refresh quiz data after adding a question
      window.location.reload();
    } catch (error) {
      console.error('Error adding question:', error);
      // Handle error appropriately
    }
  };

  const handleNewAnswerChange = (index, event) => {
    const updatedAnswers = [...newAnswers];
    updatedAnswers[index].content = event.target.value;
    setNewAnswers(updatedAnswers);
  };

  const handleNewAnswerCorrectChange = (index) => {
    setCorrectAnswerIndex(index);
  };

  return (
    <div className="quiz-editor-container">
      <h1 className="quiz-editor-title">Edit Quiz: {quiz && quiz.title}</h1>

      {/* Dropdown for selecting quizzes */}
      <select onChange={handleQuizSelectionChange}>
        <option value="">Select a quiz</option>
        {quizzes.map(q => (
          <option key={q.id} value={q.title}>{q.title}</option>
        ))}
      </select>

      <button className="delete-quiz-button" onClick={handleDeleteQuiz}>Delete Quiz</button>

      {/* Form for adding a new question */}
      <form onSubmit={handleNewQuestionSubmit}>
        <label>
          New Question:
          <input type="text" value={newQuestionContent} onChange={(e) => setNewQuestionContent(e.target.value)} />
        </label>

        {/* Map through new answers and display them */}
        {newAnswers.map((answer, index) => (
          <div key={index} className="new-answer-container">
            <label>
              Answer {String.fromCharCode(97 + index)}:
              <input type="text" value={answer.content} onChange={(e) => handleNewAnswerChange(index, e)} />
            </label>
          </div>
        ))}

        {/* Dropdown for selecting the correct answer */}
        <label className="correct-answer-label">
          Correct Answer:
          <select
            className="correct-answer-select"
            value={correctAnswerIndex}
            onChange={(e) => handleNewAnswerCorrectChange(parseInt(e.target.value, 10))}
          >
            {newAnswers.map((answer, answerIndex) => (
              <option key={answerIndex} value={answerIndex}>
                {String.fromCharCode(97 + answerIndex)}
              </option>
            ))}
          </select>
        </label>

        {/* Button to add a new answer */}
        <button className="add-answer-button" onClick={() => setNewAnswers(prevAnswers => [...prevAnswers, { content: '', correct: false }])}>
          Add Answer
        </button>

        {/* Button to submit the new question */}
        <button type="submit">Add Question</button>
      </form>

      {quiz && quiz.questions.map((question) => (
        <div key={question.id} className="question-container">
          <h2 className="question-title">Question: {question.content}</h2>
          <button className="delete-question-button" onClick={() => handleDeleteQuestion(question.id)}>Delete Question</button>
          {/* Additional UI for editing question can be added here */}
        </div>
      ))}
    </div>
  );
};

export default QuizEditor;
