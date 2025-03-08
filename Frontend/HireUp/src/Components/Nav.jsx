import React from 'react'
import { Link } from 'react-router-dom'
import dash from '../Images/RecruiterNav/dash4.png'
import calender from '../Images/RecruiterNav/calender.png'
import jobs from '../Images/RecruiterNav/jobs.png'
import community from '../Images/RecruiterNav/community.png'
import tests from '../Images/RecruiterNav/tests.png'

function Nav() {
    return (
        <div>
            <nav className='flex flex-col justify-center items-center gap-9 h-full bg-[#3A175C] rounded-3xl px-5 py-10'>
                <Link>
                <img  className='w-10' src={dash} alt="" />
                </Link>
                <Link>
                <img  className='w-10' src={calender} alt="" />
                </Link>
                <Link>
                <img  className='w-10' src={community} alt="" />
                </Link>
                <Link>
                <img  className='w-10' src={jobs} alt="" />
                </Link>
                <Link>
                <img  className='w-8' src={tests} alt="" />
                </Link>
            </nav>
        </div>
    )
}

export default Nav
