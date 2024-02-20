import React, { useState } from "react";
import "../AdminDashboard.css";

const AdminDashboard = () => {
  const [quizTitle, setQuizTitle] = useState("");
  const [questions, setQuestions] = useState([
    { content: "", answers: [{ content: "" }], correctAnswerId: null },
  ]);

  const handleQuizTitleChange = (e) => {
    setQuizTitle(e.target.value);
  };

  const handleAddQuestion = () => {
    setQuestions((prevQuestions) => [
      ...prevQuestions,
      { content: "", answers: [{ content: "" }], correctAnswerId: null },
    ]);
  };

  const handleAddAnswer = (questionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].answers.push({ content: "" });
    setQuestions(updatedQuestions);
  };

  const handleSaveQuiz = async () => {
    try {
      const quizData = {
        title: quizTitle,
        questions_attributes: questions.map((question) => ({
          content: question.content,
          answers_attributes: question.answers.map((answer, answerIndex) => ({
            content: answer.content,
            correct: answerIndex === question.correctAnswerId,
          })),
        })),
      };

      const token = localStorage.getItem("jwtToken");

      const response = await fetch("/create-quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quiz: quizData }),
      });

      if (!response.ok) {
        throw new Error("Error creating quiz: " + response.statusText);
      }

      const data = await response.json();
      console.log("Quiz created successfully:", data);
      // Optionally, you can redirect the admin or perform other actions
    } catch (error) {
      console.error("Error saving quiz:", error);
    }
  };

  return (
    <div className="admin-dashboard-container">
      <h1>Create Quiz</h1>

      <label>
        Quiz Title:
        <input
          className="text-box"
          type="text"
          value={quizTitle}
          onChange={handleQuizTitleChange}
        />
      </label>

      {/* Map through existing questions and display them */}
      {questions.map((question, index) => (
        <div key={index} className="quiz-form-container">
          <h2>{`Question ${index + 1}`}</h2>
          <label>
            Question Content:
            <input
              type="text"
              className="question-input"
              value={question.content}
              onChange={(e) => {
                const updatedQuestions = [...questions];
                updatedQuestions[index].content = e.target.value;
                setQuestions(updatedQuestions);
              }}
            />
          </label>
          <br />
          <h3>Answers:</h3>
          {question.answers.map((answer, answerIndex) => (
            <div key={answerIndex} className="answer-container">
              <label>
                Answer {String.fromCharCode(97 + answerIndex)}:
                <input
                  type="text"
                  className="answer-input"
                  value={answer.content}
                  onChange={(e) => {
                    const updatedQuestions = [...questions];
                    updatedQuestions[index].answers[answerIndex].content =
                      e.target.value;
                    setQuestions(updatedQuestions);
                  }}
                />
              </label>
            </div>
          ))}
          <button
            className="add-answer-button"
            onClick={() => handleAddAnswer(index)}
          >
            Add Answer
          </button>
          <br />
          <label className="correct-answer-label">
            Correct Answer:
            <select
  className="correct-answer-select"
  value={question.correctAnswerId}
  onChange={(e) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].correctAnswerId = parseInt(
      e.target.value,
      10
    );
    setQuestions(updatedQuestions);
  }}
>
  {question.answers.map((answer, answerIndex) => (
    <option key={answerIndex} value={answerIndex}>
      {String.fromCharCode(97 + answerIndex)}
    </option>
  ))}
</select>


          </label>
          <br />
        </div>
      ))}

      {/* Button to save the quiz */}
      <button className="save-quiz-button" onClick={handleSaveQuiz}>
        Save Quiz
      </button>

      {/* Button to add a new question */}
      <button className="add-question-button" onClick={handleAddQuestion}>
        Add Question
      </button>
    </div>
  );
};

export default AdminDashboard;



