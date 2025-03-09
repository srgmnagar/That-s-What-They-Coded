import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement } from 'chart.js';
import CandidateNav from '../../Components/CandidateNav';

// Register required chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement);

function CandidateDashboard() {
  const totalTestsTaken = 12;
  const jobsApplied = 4;
  const testScores = [85, 92, 78, 90];
  const percentileScores = [
    { test: 'Biology Test 1', percentile: 88 },
    { test: 'Genetics Test', percentile: 92 },
    { test: 'Biochemistry Test', percentile: 85 },
  ];
  const eligibilityStatus = [
    { job: 'Research Scientist (Biology)', eligible: true, reason: 'Strong research background' },
    { job: 'Lab Technician (Genetics)', eligible: false, reason: 'Lacks specific lab experience' },
    { job: 'Bioinformatics Analyst', eligible: true, reason: 'Proficient in data analysis' },
    { job: 'Clinical Research Associate', eligible: true, reason: 'Relevant clinical experience' },
  ];

  // Data for Test Scores (Bar Chart)
  const testScoresChartData = {
    labels: testScores.map((_, index) => `Test ${index + 1}`),
    datasets: [
      {
        label: 'Test Scores',
        data: testScores,
        backgroundColor: '#9370DB',
        borderColor: '#800080',
        borderWidth: 1,
      },
    ],
  };

  // Data for Percentile Scores (Line Chart)
  const percentileChartData = {
    labels: percentileScores.map((data) => data.test),
    datasets: [
      {
        label: 'Percentile Scores',
        data: percentileScores.map((data) => data.percentile),
        backgroundColor: 'rgba(128, 0, 128, 0.5)',
        borderColor: '#800080',
        borderWidth: 2,
        pointBackgroundColor: '#800080',
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="p-5 bg-gradient-to-r from-purple-100 via-purple-200 to-purple-300 min-h-screen flex">
      <CandidateNav />
      <div className="mx-auto w-3/4">
        <h1 className="text-3xl font-bold text-center mb-8 text-purple-800">Candidate Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Total Tests Taken */}
          <div className="bg-white p-6 rounded-lg shadow-md bg-opacity-90 backdrop-blur-md">
            <h2 className="text-xl font-semibold mb-2 text-purple-700">Total Tests Taken</h2>
            <p className="text-3xl font-bold text-gray-800">{totalTestsTaken}</p>
          </div>

          {/* Jobs Applied */}
          <div className="bg-white p-6 rounded-lg shadow-md bg-opacity-90 backdrop-blur-md">
            <h2 className="text-xl font-semibold mb-2 text-purple-700">Jobs Applied</h2>
            <p className="text-3xl font-bold text-gray-800">{jobsApplied}</p>
          </div>

          {/* Test Scores Chart */}
          <div className="bg-white p-6 rounded-lg shadow-md col-span-2 max-h-[60vh] pb-10 bg-opacity-90 backdrop-blur-md">
            <h2 className="text-xl font-semibold mb-4 text-purple-700">Test Scores</h2>
            <Bar data={testScoresChartData} options={{ responsive: true, maintainAspectRatio: false }} height={350} />
          </div>

          {/* Percentile Scores Chart */}
          <div className="bg-white p-6 rounded-lg shadow-md col-span-2 max-h-[60vh] pb-10 bg-opacity-90 backdrop-blur-md">
            <h2 className="text-xl font-semibold mb-4 text-purple-700">Percentile Scores</h2>
            <Line data={percentileChartData} options={{ responsive: true, maintainAspectRatio: false }} height={350} />
          </div>

          {/* Eligibility Status */}
          <div className="bg-white p-6 rounded-lg shadow-md col-span-2 bg-opacity-90 backdrop-blur-md">
            <h2 className="text-xl font-semibold mb-4 text-purple-700">Eligibility Status</h2>
            <ul className="space-y-2">
              {eligibilityStatus.map((status, index) => (
                <li
                  key={index}
                  className={`flex justify-between items-center p-2 rounded ${
                    status.eligible ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}
                >
                  <span>{status.job}</span>
                  <span>{status.eligible ? 'Eligible' : 'Not Eligible'}</span>
                  <span className="text-sm">{status.reason}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CandidateDashboard;
