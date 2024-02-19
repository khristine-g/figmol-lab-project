// // AdminDashboard.js
// import React, { useState } from 'react';

// import '../AdminDashboard.css';

// const AdminDashboard = () => {
//   const [quizTitle, setQuizTitle] = useState('');
//   const [topic, setTopic] = useState('');
//   const [subtopic, setSubtopic] = useState('');
//   const [questions, setQuestions] = useState([]);

//   const handleQuizTitleChange = (e) => {
//     setQuizTitle(e.target.value);
//   };

//   const handleTopicChange = (e) => {
//     setTopic(e.target.value);
//   };

//   const handleSubtopicChange = (e) => {
//     setSubtopic(e.target.value);
//   };

//   const handleAddQuestion = (question) => {
//     setQuestions((prevQuestions) => [...prevQuestions, question]);
//   };

//   const handleSaveQuiz = () => {
//     const quizData = {
//       title: quizTitle,
//       topic: topic,
//       subtopic: subtopic,
//       questions: questions,
//     };

//     const token = localStorage.getItem('jwtToken');

//     fetch('/create-quiz', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`,
//       },
//       body: JSON.stringify(quizData),
//     })
//       .then(response => {
//         if (response.ok) {
//           return response.json();
//         } else {
//           return Promise.reject('Error creating quiz: ' + response.statusText);
//         }
//       })
//       .then(data => {
//         console.log('Quiz created successfully:', data);
//         // Optionally, you can redirect the admin or perform other actions
//       })
//       .catch(error => {
//         console.error(error);
//       });
//   };

//   return (
//     <div className="admin-dashboard-container">
//       <h1>Create Quiz</h1>
     
//       <label>
//         Topic:
//         <input  className='text-box'type="text" value={topic} onChange={handleTopicChange} />
//       </label>
//       <label>
//         Subtopic:
//         <input className='text-box'type="text" value={subtopic} onChange={handleSubtopicChange} />
//       </label>
//       <label>
//         Quiz Title:
//         <input className='text-box'type="text" value={quizTitle} onChange={handleQuizTitleChange} />
//       </label>
    
//       <button className="save-quiz-button" onClick={handleSaveQuiz}>Save Quiz</button>
//     </div>
//   );
// };

// export default AdminDashboard;


