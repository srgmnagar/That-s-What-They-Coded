import React, { useState, useEffect } from 'react';
import Nav from '../../Components/Nav';

function Results() {
  // State for storing results and loading state
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch results when component mounts
  useEffect(() => {
    const getResults = async () => {
      const api_link = 'http://127.0.0.1:8000/';
      try {
        const res = await fetch(api_link + 'base/rank/', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${JSON.parse(localStorage.getItem("authTokens")).access}`,
          },
        });
        const data = await res.json();

        if (res.status === 200) {
          setResults(data.ranked_candidates); // Set the results in state
        } else {
          console.log(data);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched or error occurs
      }
    };

    getResults();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  // Example data for question stats
  const questionStats = {
    totalQuestions: 15,
    currentQuestion: 1,
    category: 'HARD',
    attemptedCorrectly: 50,
    attemptedIncorrectly: 248,
    notAttempted: 100,
  };

  return (
    <div
      style={{
        background:
          'linear-gradient(115deg, rgba(38, 0, 74, 0.73) 2.22%, rgba(105, 36, 171, 0.59) 103.12%)',
        minHeight: '100vh',
        display: 'flex',
        padding: '20px',
      }}
      className="font-sora"
    >
      <Nav />
      <div className="mx-auto flex flex-col items-center w-full max-w-7xl">
        <div className="container mx-auto flex w-full space-x-4">
          {/* Results Panel */}
          <div className="bg-[#ffffff54] rounded-xl shadow-md p-6 w-full md:w-1/2">
            <h2 className="text-xl font-semibold text-purple-700 mb-4">
              View Result
            </h2>

            {/* Loading Indicator */}
            {loading ? (
              <div className="text-center text-white">Loading results...</div>
            ) : (
              <div className="space-y-3">
                {/* Check if results is an array before using .map() */}
                {Array.isArray(results) && results.length > 0 ? (
                  results.map((result) => (
                    <div
                      key={result.candidate_id}
                      className="flex items-center justify-between py-2 border-b last:border-b-0"
                    >
                      <div className="flex items-center space-x-2">
                        <span className="w-3 h-3 rounded-full bg-gray-400"></span>
                        <span>
                          {result.name} Rank {result.rank} - Test Score: {result.test_score}
                        </span>
                      </div>
                      <span className="text-purple-700 cursor-pointer">
                        view stats-&gt;
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-white">No results found.</div>
                )}
                <div className="text-purple-700 cursor-pointer text-right">
                  view all-&gt;
                </div>
              </div>
            )}
          </div>

          {/* Question Panel */}
          <div className="bg-white rounded-xl shadow-md p-6 w-full md:w-1/2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-purple-700">
                Question {questionStats.currentQuestion}/{questionStats.totalQuestions}
              </h2>
              <div>
                <button className="bg-purple-700 text-white rounded-full w-8 h-8 flex items-center justify-center">
                  &lt;
                </button>
                <button className="bg-purple-700 text-white rounded-full w-8 h-8 flex items-center justify-center">
                  &gt;
                </button>
              </div>
            </div>
            <p className="text-sm text-pink-500 font-bold uppercase mb-2">
              Category: {questionStats.category}
            </p>
            <div className="space-y-2">
              <p>
                Number of candidates who attempted correctly:{' '}
                {questionStats.attemptedCorrectly}
              </p>
              <p>
                Number of candidates who attempted incorrectly:{' '}
                {questionStats.attemptedIncorrectly}
              </p>
              <p>
                Number of candidates who did not attempt:{' '}
                {questionStats.notAttempted}
              </p>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-purple-700 mb-2">
                View Candidates:
              </h3>
              <div className="space-y-2">
                {[ 
                  'Attempted Correctly', 
                  'Attempted Incorrectly', 
                  'Did not attempt' 
                ].map((status, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 p-2 rounded cursor-pointer"
                  >
                    {status}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Results;
