import React from 'react';
import Nav from '../../Components/Nav';

function Results() {
  // Example data for ranking results
  const results = [
    { name: 'Priya Sharma', rank: 1 },
    { name: 'John Doe', rank: 2 },
    { name: 'Alice Cooper', rank: 3 },
    { name: 'Bob Marley', rank: 4 },
    { name: 'Charlie Brown', rank: 5 },
  ];

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
        minHeight: '100vh', // Ensure full viewport height
        display: 'flex',
        padding: '20px', // Consistent padding
      }}
      className="font-sora"
    >
      <Nav />
      <div className="mx-auto flex flex-col items-center w-full max-w-7xl">
        {/* Header (Optional: Add a title if needed) */}
        {/* <h1 className="text-3xl font-bold text-white mb-8">Results</h1> */}

        <div className="container mx-auto flex w-full space-x-4">
          {/* Results Panel */}
          <div className="bg-[#ffffff54] rounded-xl shadow-md p-6 w-full md:w-1/2">
            <h2 className="text-xl font-semibold text-purple-700 mb-4">
              View Result
            </h2>
            <div className="space-y-3">
              {/* Map through the results array */}
              {results.map((result) => (
                <div
                  key={result.rank}
                  className="flex items-center justify-between py-2 border-b last:border-b-0"
                >
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full bg-gray-400"></span>
                    <span>
                      {result.name} Rank {result.rank}
                    </span>
                  </div>
                  <span className="text-purple-700 cursor-pointer">
                    view stats-&gt;
                  </span>
                </div>
              ))}
              <div className="text-purple-700 cursor-pointer text-right">
                view all-&gt;
              </div>
            </div>
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
                  'Did not attempt',
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