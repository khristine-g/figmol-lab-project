

import React, { useState, useEffect } from 'react';
import '../QuizEditor.css';

const QuizEditor = () => {
  const [selectedQuizId, setSelectedQuizId] = useState(null);
  const [quizzes, setQuizzes] = useState([]);
  const [quiz, setQuiz] = useState(null);
  const [newQuestionContent, setNewQuestionContent] = useState('');
  const [newAnswers, setNewAnswers] = useState([{ content: '', correct: false }]);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(0);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(null);

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
    setSelectedQuestionIndex(null);
  };

  const handleNewAnswerChange = (questionIndex, answerIndex, event) => {
    const updatedQuizzes = [...quizzes];
    updatedQuizzes[questionIndex].answers[answerIndex].content = event.target.value;
    setQuizzes(updatedQuizzes);
  };

  const handleNewAnswerCorrectChange = (questionIndex, answerIndex) => {
    const updatedQuizzes = [...quizzes];
    updatedQuizzes[questionIndex].correctAnswerIndex = answerIndex;
    setQuizzes(updatedQuizzes);
  };

  const handleAddAnswer = () => {
    if (selectedQuestionIndex !== null) {
      setQuizzes((prevQuizzes) => {
        const updatedQuizzes = [...prevQuizzes];
        const newAnswer = { content: '', correct: false };
        updatedQuizzes[selectedQuestionIndex].answers.push(newAnswer);
        return updatedQuizzes;
      });
    }
  };
  const handleNewQuestionSubmit = async (event) => {
    event.preventDefault();

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
          correct_answer_index: correctAnswerIndex,
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
      setNewAnswers([{ content: '', correct: false }]);
      setCorrectAnswerIndex(0);
    } catch (error) {
      console.error('Error adding question:', error);
    }
  };

  const handleAddQuestion = () => {
    if (selectedQuizId) {
      setQuizzes(prevQuizzes => {
        const updatedQuizzes = [...prevQuizzes];
        const newQuestion = {
          content: '',
          answers: [{ content: '', correct: false }],
          correctAnswerIndex: 0,
        };
        updatedQuizzes.push(newQuestion);
        return updatedQuizzes;
      });

      setSelectedQuestionIndex(quizzes.length);
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
              <input
                type="text"
                value={answer.content}
                onChange={(e) => handleNewAnswerChange(selectedQuestionIndex, index, e)}
              />
            </label>
          </div>
        ))}

        <label className="correct-answer-label">
          Correct Answer:
          <select
            className="correct-answer-select"
            value={selectedQuestionIndex !== null ? quizzes[selectedQuestionIndex].correctAnswerIndex : 0}
            onChange={(e) => handleNewAnswerCorrectChange(selectedQuestionIndex, parseInt(e.target.value, 10))}
          >
            {selectedQuestionIndex !== null && quizzes[selectedQuestionIndex].answers.map((answer, answerIndex) => (
              <option key={answerIndex} value={answerIndex}>
                {String.fromCharCode(97 + answerIndex)}
              </option>
            ))}
          </select>
        </label>

        <button className="add-answer-button" onClick={handleAddAnswer}>
          Add Answer
        </button>

        <button className="add-question-button" onClick={handleAddQuestion}>
          Add Question
        </button>

        <button type="submit">Add Question</button>
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

