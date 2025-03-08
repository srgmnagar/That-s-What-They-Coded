// import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

// function Test() {
//   const navigate = useNavigate(); // Initialize the useNavigate hook
//   const [questions, setQuestions] = useState([
//     {
//       question: "What is the capital of France?",
//       options: ["Berlin", "Madrid", "Paris", "Rome"],
//       correctAnswer: "Paris",
//       selectedAnswer: null,
//     },
//     {
//       question: "What is 2 + 2?",
//       options: ["3", "4", "5", "6"],
//       correctAnswer: "4",
//       selectedAnswer: null,
//     },
//     {
//       question: "Which planet is known as the Red Planet?",
//       options: ["Earth", "Mars", "Jupiter", "Venus"],
//       correctAnswer: "Mars",
//       selectedAnswer: null,
//     },
//   ]);

//   const [timeRemaining, setTimeRemaining] = useState(120); // 2 minutes (120 seconds)
//   const [testCompleted, setTestCompleted] = useState(false);
//   const tabSwitchCount = useRef(0);

//   useEffect(() => {
//     if (timeRemaining > 0 && !testCompleted) {
//       const timer = setInterval(() => {
//         setTimeRemaining((prevTime) => prevTime - 1);
//       }, 1000);

//       return () => clearInterval(timer);
//     } else if (timeRemaining === 0 && !testCompleted) {
//       setTestCompleted(true);
//       alert("Time's up!");
//       navigate("/candidate/dashboard"); // Navigate to /candidate/dashboard when time's up
//     }
//   }, [timeRemaining, testCompleted, navigate]);

//   useEffect(() => {
//     const disableRightClick = (e) => e.preventDefault();
//     document.addEventListener("contextmenu", disableRightClick);

//     return () => {
//       document.removeEventListener("contextmenu", disableRightClick);
//     };
//   }, []);

//   const handleAnswerSelection = (questionIndex, answer) => {
//     const updatedQuestions = questions.map((q, index) => {
//       if (index === questionIndex) {
//         return { ...q, selectedAnswer: answer };
//       }
//       return q;
//     });
//     setQuestions(updatedQuestions);
//   };

//   const useTabActive = () => {
//     useEffect(() => {
//       const handleVisibilityChange = () => {
//         if (document.hidden) {
//           tabSwitchCount.current++;
//           if (tabSwitchCount.current >= 2) { // Set the tab switch limit to 2
//             setTestCompleted(true);
//             alert("Test ended due to excessive tab switching.");
//             navigate("/candidate/dashboard"); // Navigate to /candidate/dashboard when test ends due to tab switching
//             return;
//           }
//           alert(`Tab change detected. You have ${2 - tabSwitchCount.current} attempts left.`);
//           window.focus(); // Force focus back to the test window
//         }
//       };

//       document.addEventListener('visibilitychange', handleVisibilityChange);

//       return () => {
//         document.removeEventListener('visibilitychange', handleVisibilityChange);
//       };
//     }, []);
//   };

//   useTabActive(); // Call the hook to enable tab change prevention

//   const preventCopyPaste = (e) => {
//     e.preventDefault();
//     alert("Copying and pasting is disabled.");
//     return false;
//   };

//   const formatTime = (seconds) => {
//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = seconds % 60;
//     return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
//   };

//   const calculateScore = () => {
//     let score = 0;
//     questions.forEach((q) => {
//       if (q.selectedAnswer === q.correctAnswer) {
//         score++;
//       }
//     });
//     return score;
//   };

//   const handleSubmit = () => {
//     setTestCompleted(true);
//     alert(`Test completed! Your score is: ${calculateScore()} / ${questions.length}`);
//     navigate("/candidate/dashboard"); // Navigate to /candidate/dashboard when the test is submitted
//   };

//   return (
//     <div className="p-4 no-select">
//       <style>
//         {`
//           .no-select {
//             user-select: none;
//             -webkit-user-select: none;
//             -moz-user-select: none;
//             -ms-user-select: none;
//           }
//         `}
//       </style>
//       <h1 className="text-2xl font-bold mb-4">Sample Test</h1>
//       <div className="mb-4">Time Remaining: {formatTime(timeRemaining)}</div>

//       {questions.map((question, index) => (
//         <div key={index} className="mb-4 p-4 border rounded no-select">
//           <p className="font-semibold">{question.question}</p>
//           <ul className="list-none">
//             {question.options.map((option, optionIndex) => (
//               <li key={optionIndex} className="my-2">
//                 <label className="inline-flex items-center">
//                   <input
//                     type="radio"
//                     name={`question-${index}`}
//                     value={option}
//                     checked={question.selectedAnswer === option}
//                     onChange={() => handleAnswerSelection(index, option)}
//                     disabled={testCompleted}
//                     onPaste={preventCopyPaste}
//                     onCopy={preventCopyPaste}
//                   />
//                   <span className="ml-2"
//                     onPaste={preventCopyPaste}
//                     onCopy={preventCopyPaste}
//                   >
//                     {option}
//                   </span>
//                 </label>
//               </li>
//             ))}
//           </ul>
//         </div>
//       ))}

//       {!testCompleted && (
//         <button
//           onClick={handleSubmit}
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//         >
//           Submit Test
//         </button>
//       )}
//     </div>
//   );
// }

// export default Test;
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function Test() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([
    {
      question: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Rome"],
      correctAnswer: "Paris",
      selectedAnswer: null,
    },
    {
      question: "What is 2 + 2?",
      options: ["3", "4", "5", "6"],
      correctAnswer: "4",
      selectedAnswer: null,
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Venus"],
      correctAnswer: "Mars",
      selectedAnswer: null,
    },
  ]);

  const [timeRemaining, setTimeRemaining] = useState(120);
  const [testCompleted, setTestCompleted] = useState(false);
  const tabSwitchCount = useRef(0);

  useEffect(() => {
    if (timeRemaining > 0 && !testCompleted) {
      const timer = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (timeRemaining === 0 && !testCompleted) {
      setTestCompleted(true);
      alert("Time's up!");
      navigate("/candidate/dashboard");
    }
  }, [timeRemaining, testCompleted, navigate]);

  useEffect(() => {
    const disableRightClick = (e) => e.preventDefault();
    document.addEventListener("contextmenu", disableRightClick);

    return () => {
      document.removeEventListener("contextmenu", disableRightClick);
    };
  }, []);

  const handleAnswerSelection = (questionIndex, answer) => {
    const updatedQuestions = questions.map((q, index) => {
      if (index === questionIndex) {
        return { ...q, selectedAnswer: answer };
      }
      return q;
    });
    setQuestions(updatedQuestions);
  };

  const useTabActive = () => {
    useEffect(() => {
      const handleVisibilityChange = () => {
        if (document.hidden) {
          tabSwitchCount.current++;
          if (tabSwitchCount.current >= 2) {
            setTestCompleted(true);
            alert("Test ended due to excessive tab switching.");
            navigate("/candidate/dashboard");
            return;
          }
          alert(`Tab change detected. You have ${2 - tabSwitchCount.current} attempts left.`);
          window.focus();
        }
      };

      document.addEventListener('visibilitychange', handleVisibilityChange);

      return () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      };
    }, []);
  };

  useTabActive();

  const preventCopyPaste = (e) => {
    e.preventDefault();
    alert("Copying and pasting is disabled.");
    return false;
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q) => {
      if (q.selectedAnswer === q.correctAnswer) {
        score++;
      }
    });
    return score;
  };

  const handleSubmit = () => {
    setTestCompleted(true);
    alert(`Test completed! Your score is: ${calculateScore()} / ${questions.length}`);
    navigate("/candidate/dashboard");
  };

  return (
    <div className="min-h-screen p-6 px-10 no-select font-Sora" style={{
        background:
          'linear-gradient(115deg, rgba(38, 0, 74, 0.73) 2.22%, rgba(105, 36, 171, 0.59) 103.12%)',
      }}>
      <style>
        {`
          .no-select {
            user-select: none;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
          }
          .question-card {
            border-radius: 8px;
            padding: 16px;
            margin-bottom: 16px;
          }
          .option-label {
            display: flex;
            align-items: center;
            padding: 8px 16px;
            border-radius: 4px;
            margin-bottom: 4px;
            cursor: pointer;
          }
          .submit-button {
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
          }
        `}
      </style>
      <h1 className="text-5xl font-bold mb-4 font-Exo text-white">Test</h1>
      <div className="mb-4 text-2xl font-bold text-white">Time Remaining: {formatTime(timeRemaining)}</div>

      {questions.map((question, index) => (
        <div key={index} className="question-card bg-[#ffffff32]">
          <p className="font-semibold">{question.question}</p>
          <ul className="list-none">
            {question.options.map((option, optionIndex) => (
              <li key={optionIndex} className="my-2">
                <label className="option-label bg-purple-950 hover:bg-purple-900 transition-colors text-white">
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={option}
                    checked={question.selectedAnswer === option}
                    onChange={() => handleAnswerSelection(index, option)}
                    disabled={testCompleted}
                    onPaste={preventCopyPaste}
                    onCopy={preventCopyPaste}
                  />
                  <span className="ml-2" onPaste={preventCopyPaste} onCopy={preventCopyPaste}>
                    {option}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {!testCompleted && (
        <button className="submit-button bg-violet-950 hover:bg-violet-950 hover:scale-105 duration-200 transition-all" onClick={handleSubmit}>
          Submit Test
        </button>
      )}
    </div>
  );
}

export default Test;