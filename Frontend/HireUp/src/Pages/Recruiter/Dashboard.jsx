import React from 'react';
import Nav from '../../Components/Nav';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { ArrowRight } from 'lucide-react';

ChartJS.register(ArcElement, Tooltip, Legend);

function Dashboard() {
    // Pie chart data
    const jobsChartData = {
        labels: ['Active', 'Other'],
        datasets: [{
            data: [63, 279],
            backgroundColor: ['#DF72D9', '#DCC8FF'],
            borderWidth: 1
        }]
    };

    const testsChartData = {
        labels: ['Active', 'Other'],
        datasets: [{
            data: [85, 168],
            backgroundColor: ['#DF72D9', '#DCC8FF'],
            borderWidth: 1
        }]
    };

    const candidatesChartData = {
        labels: ['Selected', 'Rejected', 'Pending', 'Other'],
        datasets: [{
            data: [69, 42, 420, 1306],
            backgroundColor: ['#e4c6ff', '#DCC8FF', '#9b6cc3', '#734b96'],
            borderWidth: 1
        }]
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } }
    };

    return (
        <div className='h-screen flex gap-10 p-5' style={{ background: 'linear-gradient(115deg, rgba(38, 0, 74, 0.73) 2.22%, rgba(105, 36, 171, 0.59) 103.12%)' }}>
            <Nav />
            <section className='flex flex-col gap-16'>
                <div className='text-5xl text-violet-100 font-semibold font-exo'>SM Softwares</div>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                    {/* Jobs Card */}
                    <div className='bg-[#ffffff27] backdrop-blur-sm rounded-3xl text-violet-100 py-4 px-6'>
                        <div className='text-2xl font-semibold mb-2'>Jobs</div>
                        <div className='text-5xl font-bold mb-4'>342</div>
                        <div className='text-violet-200 mb-4'>Active: {jobsChartData.datasets[0].data[0]}</div>
                        <div className='h-40'><Pie data={jobsChartData} options={chartOptions} /></div>
                        <button className='flex items-center gap-2 mt-4 text-violet-200 hover:text-white transition-colors'>
                            Go to Jobs <ArrowRight size={20} />
                        </button>
                    </div>

                    {/* Tests Card */}
                    <div className='bg-[#ffffff27] backdrop-blur-sm rounded-3xl text-violet-100 py-4 px-6'>
                        <div className='text-2xl font-semibold mb-2'>Tests</div>
                        <div className='text-5xl font-bold mb-4'>231</div>
                        <div className='text-violet-200 mb-4'>Active: {testsChartData.datasets[0].data[0]}</div>
                        <div className='h-40'><Pie data={testsChartData} options={chartOptions} /></div>
                        <button className='flex items-center gap-2 mt-4 text-violet-200 hover:text-white transition-colors'>
                            Go to Tests <ArrowRight size={20} />
                        </button>
                    </div>

                    {/* Candidates Card */}
                    <div className='bg-[#ffffff27] backdrop-blur-sm rounded-3xl text-violet-100 py-4 px-6'>
                        <div className='text-2xl font-semibold mb-2'>Candidates</div>
                        <div className='text-5xl font-bold mb-4'>1495</div>
                        <div className='space-y-1 text-violet-200'>
                            <div>Selected: {candidatesChartData.datasets[0].data[0]}</div>
                            <div>Rejected: {candidatesChartData.datasets[0].data[1]}</div>
                            <div>Pending: {candidatesChartData.datasets[0].data[2]}</div>
                        </div>
                        <div className='h-40'><Pie data={candidatesChartData} options={chartOptions} /></div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Dashboard;