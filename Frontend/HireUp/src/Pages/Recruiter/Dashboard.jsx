import React from 'react'
import Nav from '../../Components/Nav'


function Dashboard() {
  return (
    <div className='bg-[#26004A] h-screen flex gap-10'>
        <Nav/>
        <section className='flex flex-col gap-16  font-Sora'>
            <div className='text-5xl pt-7 text-violet-100 font-black '>
                SM Softwares
            </div>
            <div className='flex md:flex-row flex-col justify-between gap-10'>
                <div className='bg-purple-200 rounded-3xl px-5 pr-32 py-7 flex justify-between gap-10 flex-col items-left text-violet-950'>
                    <div className=' text-2xl font-semibold'>Jobs Posted</div>
                    <div className=' text-6xl font-extrabold'>0</div>
                </div>
                <div className='bg-purple-200 rounded-3xl px-5 pr-32 py-7 flex justify-between flex-col items-left text-violet-950'>
                    <div className=' text-2xl font-semibold'>Jobs Posted</div>
                    <div className=' text-6xl font-extrabold'>0</div>
                </div>
                <div className='bg-purple-200 rounded-3xl px-5 pr-32 py-7 flex justify-between flex-col items-left text-violet-950'>
                    <div className=' text-2xl font-semibold'>Jobs Posted</div>
                    <div className=' text-6xl font-extrabold'>0</div>
                </div>
            </div>
        </section>
    </div>
  )
}

export default Dashboard
