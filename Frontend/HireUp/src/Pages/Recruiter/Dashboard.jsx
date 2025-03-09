import React from 'react'
import Nav from '../../Components/Nav'
import { Chart } from 'react-google-charts';
import { ArrowRight } from 'lucide-react';



function Dashboard() {
    // Data for the donut charts
    const jobsData = [
        ['Status', 'Count'],
        ['Active', 63],
        ['Other', 279],
    ];

    const testsData = [
        ['Status', 'Count'],
        ['Active', 63],
        ['Other', 168],
    ];

    const candidatesData = [
        ['Status', 'Count'],
        ['Selected', 63],
        ['Rejected', 63],
        ['Pending', 63],
        ['Other', 1306],
    ];

    const chartOptions = {
        pieHole: 0.7,
        backgroundColor: 'transparent',
        legend: 'none',
        pieSliceBorderColor: 'transparent',
        colors: ['#DF72D9', '#DCC8FF'],
        chartArea: { width: '100%', height: '100%' },
        width: 150,
        height: 150,
    };

    const candidatesChartOptions = {
        ...chartOptions,
        colors: ['#e4c6ff', '#DCC8FF', '#9b6cc3', '#734b96'],
    };


    return (
        <div
            style={{
                background: 'linear-gradient(115deg, rgba(38, 0, 74, 0.73) 2.22%, rgba(105, 36, 171, 0.59) 103.12%)'
            }} className='h-screen flex gap-10 p-5'>
            <Nav />
            <section className='flex flex-col gap-16 '>
                <div className='text-5xl  text-violet-100 font-semibold font-exo'>
                    SM Softwares
                </div>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                    {/* Jobs Card */}
                    <div className='bg-[#ffffff27] backdrop-blur-sm rounded-3xl  text-violet-100 py-4 px-6'>
                        <div className='flex gap-20 items-center justify-between'>
                            <div>
                                <h2 className='text-2xl font-semibold mb-2'>Jobs</h2>
                                <div className='text-5xl font-bold mb-4'>342</div>
                                <div className='text-violet-200'>Active: 63</div>
                            </div>
                            <Chart
                                className='my-auto'
                                chartType="PieChart"
                                data={jobsData}
                                options={chartOptions}
                            />
                        </div>
                        <button className='flex items-center gap-2 mt-4 text-violet-200 hover:text-white transition-colors'>
                            Go to Jobs <ArrowRight size={20} />
                        </button>
                    </div>

                    {/* Tests Card */}
                    <div className='bg-[#ffffff27] backdrop-blur-sm rounded-3xl  text-violet-100 py-4 px-6'>
                        <div className='flex gap-20 items-center justify-between'>
                            <div>
                                <h2 className='text-2xl font-semibold mb-2'>Tests</h2>
                                <div className='text-5xl font-bold mb-4'>231</div>
                                <div className='text-violet-200'>Active: 85</div>
                            </div>
                            <Chart className='my-auto'
                                chartType="PieChart"
                                data={testsData}
                                options={chartOptions}
                            />
                        </div>
                        <button className='flex items-center gap-2 mt-4 text-violet-200 hover:text-white transition-colors'>
                            Go to Tests <ArrowRight size={20} />
                        </button>
                    </div>

                    {/* Candidates Card */}
                    <div className='bg-[#ffffff27] backdrop-blur-sm rounded-3xl  text-violet-100 py-4 px-6'>
                        <div className='flex gap-20 items-center justify-between'>
                            <div>
                                <h2 className='text-2xl font-semibold mb-2'>Candidates</h2>
                                <div className='text-5xl font-bold mb-4'>1495</div>
                                <div className='space-y-1'>
                                    <div className='text-violet-200'>Selected: 63</div>
                                    <div className='text-violet-200'>Rejected: 63</div>
                                    <div className='text-violet-200'>Pending: 63</div>
                                </div>
                            </div>
                            <Chart
                                chartType="PieChart"
                                data={candidatesData}
                                options={candidatesChartOptions}
                            />
                        </div>
                    </div>
                </div>
                <div className='flex justify-between text-white'>
                {/* <div className='bg-[#B99AEB66] flex gap-3'> 
                    <p className='text-2xl font-semibold'>Domains</p>
                    <p className='text-sm font-medium'>Check applications from the domains</p>
                </div> */}
                </div>
                

            </section>
        </div>
    )
}

export default Dashboard
