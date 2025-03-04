import React from 'react'
import bg from '../Images/Landing/bg.png'
import logo from '../Images/Landing/logo.png'
import { NavLink } from 'react-router-dom'
import blue_button_gradient from '../Images/Landing/blue_button_gradient.png'
import ReviewsSection from '../Components/ReviewSection'

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
                <section className='max-w-[90%] md:max-w-[60%] sm:mx-12 mx-10 xl:ml-44'>
                    <div className='flex flex-col items-left justify-start gap-6 '>
                        <h2 className='xl:text-6xl md:text-5xl text-4xl font-medium font-Orbitron flex flex-col'>
                            <span className='bg-gradient-to-r from-[#00C2FF] to-[#E100FF] text-transparent bg-clip-text'>
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
                </section>
      Glowing effect
      <div className="absolute w-64 h-32 bg-purple-500 opacity-50 blur-3xl rounded-full"></div>

      {/* Button */}
      <button className="relative px-8 py-4 text-white text-2xl font-semibold rounded-full bg-transparent border-none cursor-pointer">
        Hire Smarter
      </button>


            </header>
            <section >

            <ReviewsSection />
            
            </section>

        </div>
    )
}

export default Landing

