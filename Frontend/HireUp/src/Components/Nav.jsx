import React from 'react'
import { Link } from 'react-router-dom'
import dash from '../Images/RecruiterNav/dash4.png'
import calender from '../Images/RecruiterNav/calender.png'
import jobs from '../Images/RecruiterNav/jobs.png'
import community from '../Images/RecruiterNav/community.png'
import tests from '../Images/RecruiterNav/tests.png'
import Settings from '../Images/RecruiterNav/settings.png'
import { User } from 'lucide-react';


function Nav() {
    return (
        <div>
            <nav className='flex flex-col justify-evenly items-center sticky h-[95vh] bg-[#3A175C] rounded-3xl px-5 py-10'>
                <div className='flex flex-col justify-center items-center gap-7 h-full'>

                <Link to={'/recruiter/dashboard'}>
                <img  className='w-10' src={dash} alt="" />
                </Link>
                <Link>
                <img  className='w-10' src={calender} alt="" />
                </Link>
                <Link to={'/recruiter/results'}>
                <img  className='w-10' src={community} alt="" />
                </Link>
                <Link to={'/recruiter/addjob'}>
                <img  className='w-10' src={jobs} alt="" />
                </Link>
                <Link to={'/recruiter/testcreation'}>
                <img  className='w-8' src={tests} alt="" />
                </Link>
                </div>
                <div>
                <Link to={'/recruiter/profile'}>
                <User size={35} className=' text-white' />
                </Link>
                </div>
            </nav>
        </div>
    )
}

export default Nav
