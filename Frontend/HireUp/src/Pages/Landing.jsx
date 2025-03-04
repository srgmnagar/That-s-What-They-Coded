import React from 'react'
import bg from '../Images/Landing/bg.png'
import logo from '../Images/Landing/logo.png'

const Landing = () => {
    return (
        <div className='bg-gradient-to-b from-[#19133D] to-[#151A27] min-h-screen'>
            <header
                style={{
                    backgroundImage: `url(${bg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center 22%',
                    backgroundRepeat: 'no-repeat'
                }}
                className='w-full h-[120vh] opacity-100'
            >
                <div className='flex justify-end items-center px-12 py-3'>
                    <img src={logo} className='w-44' alt="" />
                </div>
                <section className='w-11/12 lg:w-2/5 lg:ml-44'>
                <div className='flex flex-col items-left gap-6 '>
                    <h2 className='text-6xl font-medium font-Orbitron'>
                        <span className='bg-gradient-to-r from-[#00C2FF] to-[#E100FF] text-transparent bg-clip-text'>
                        SKILLS OVER RESUMES
                        </span>
                    </h2>
                    <h2 className='text-3xl font-light font-Sora'>
                        <span className='bg-gradient-to-r from-[#00C2FF] to-[#E100FF] text-transparent bg-clip-text'>
                        Earn XP, Get Hired & Build Your Future
                        </span>
                    </h2>

                </div>
                </section>

            </header>
        </div>
    )
}

export default Landing

