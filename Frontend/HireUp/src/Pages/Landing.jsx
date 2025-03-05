import React from 'react'
import '../App.css';
import bg from '../Images/Landing/bg.png'
import logo from '../Images/Landing/logo.png'
import { NavLink } from 'react-router-dom'
import ReviewsSection from '../Components/ReviewSection'
import arrow from '../Images/Landing/arrow.png'
import chatbot from '../Images/Landing/chatbot.png'

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
                <div className='flex justify-end items-center px-5 sm:px-12 py-3'>
                    <img src={logo} className='sm:w-44 w-28' alt="" />
                </div>
                <section className='max-w-[90%] md:max-w-[90%] sm:mx-12 md:ml-28 mx-10 xl:ml-44'>
                    <div className='flex flex-col items-left justify-start gap-6 '>
                        <h2 className='xl:text-6xl md:text-5xl text-4xl font-medium font-Orbitron flex flex-col'>
                            <span className=' bg-gradient-to-r from-[#00C2FF] to-[#E100FF] text-transparent bg-clip-text'>
                                SKILLS OVER
                            </span>
                            <span className='bg-gradient-to-r from-[#00C2FF] to-[#E100FF] text-transparent bg-clip-text'>
                                RESUMES
                            </span>
                        </h2>
                        <h2 className='xl:text-3xl sm:text-2xl text-xl font-light font-Sora'>
                            <span className='bg-gradient-to-r from-[#00C2FF] to-[#E100FF] text-transparent bg-clip-text'>
                                Earn XP, Get Hired & Build Your Future
                            </span>
                        </h2>

                    </div>
                    <div className='mt-72 md:mt-96 lg:mt-0'>
                        <div className='mt-28'>
                            <div className="absolute w-36 h-7 sm:w-52 sm:h-10 bg-[#4A9BD4] opacity-1 blur-xl rounded-full"></div>
                            <NavLink className="font-Orbitron relative px-3 sm:px-8 py-2 text-white text-lg sm:text-xl font-normal rounded-full bg-transparent border-none cursor-pointer">
                                Hire Smarter
                            </NavLink>
                        </div>
                        <div className='mt-32 md:mt-48 lg:mt-40 flex justify-end mx-3 sm:mx-12'>
                            <div>
                                <div className="absolute w-36 h-7 sm:w-52 sm:h-10 bg-[#a569dd] opacity-1 blur-xl rounded-full"></div>
                                <NavLink className="font-Orbitron relative  px-3 sm:px-8 py-2 text-white text-lg sm:text-xl font-normal rounded-full bg-transparent border-none cursor-pointer">
                                    Take a Test
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </section>
                <div className='flex justify-center items-center mt-32 flex-col gap-9'>
                    <h2 className='xl:text-4xl md:text-3xl text-xl font-medium font-Orbitron flex flex-col'>
                        <span className='bg-gradient-to-r from-[#C4E0FF] to-[#2D68A9] text-transparent bg-clip-text'>
                            Who are We?
                        </span>
                    </h2>
                    <img className='w-24' src={arrow} alt="" />
                </div>
            </header>
            <section className='start relative flex flex-col items-center justify-center gap-20'>
                <div>
                <img className='absolute md:w-[8%] w-[17%] right-[8%] top-[4%]' src={chatbot} alt="" />
                <div style={
                    {
                        background: " radial-gradient(circle at 50% 60%, rgb(74 39 125 / 63%) 0%, rgba(138, 99, 205, 0.09) 100%)",
                        borderradius: "40px",
                        lineHeight: "1.8",

                    }
                } className='relative w-[85%] sm:w-[80%] sm:px-24 sm:py-16  px-12 py-7 mx-auto mt-20 rounded-3xl   text-white font-Exo sm:text-2xl text-lg font-extralight'>
                    HireUp is a smart competency platform that redefines hiring and skill assessment. We empower candidates to showcase their strengths through structured evaluations while providing recruiters with data-driven talent insights. With gamified XP rewards, adaptive tests, and AI-driven analytics, we make career growth and hiring smarter, faster, and more efficient.
                </div>
                </div>
                <h2 className='xl:text-4xl md:text-3xl text-xl font-medium font-Orbitron flex flex-col'>
                    <span className='bg-gradient-to-r from-[#C4E0FF] to-[#2D68A9] text-transparent bg-clip-text'>
                        Why Us?
                    </span>
                </h2>
                <div
                    style={{
                        background: 'linear-gradient(90deg, rgba(3, 133, 187, 0.70) 0%, rgba(5, 51, 81, 0.70) 100%)'
                    }}
                    className=' text-white font-Exo w-full  py-10 flex justify-evenly '>
                        <div className='flex flex-col items-center justify-center gap-2 text-center'>
                            <h2 className='text-2xl sm:text-4xl lg:text-7xl font-bold'>80+</h2>
                            <p className='text-lg align-middle sm:text-xl lg:text-3xl font-light'>trusted companies</p>
                        </div>
                        <div className='flex flex-col items-center gap-2 text-center'>
                            <h2 className='text-2xl sm:text-4xl lg:text-7xl font-bold'>1 lakh+</h2>
                            <p className='text-lg align-middle sm:text-xl lg:text-3xl font-light'>satisfied candidates</p>
                        </div>
                        <div className='flex flex-col items-center gap-2 text-center'>
                            <h2 className='text-2xl sm:text-4xl lg:text-7xl font-bold'>440+</h2>
                            <p className='text-lg align-middle sm:text-xl lg:text-3xl font-light'>positive reviews</p>
                        </div>
                </div>

            </section>
            <section className='start' >

                <ReviewsSection  />

            </section>

        </div>
    )
}

export default Landing

