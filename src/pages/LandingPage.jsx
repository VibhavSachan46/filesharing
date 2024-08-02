import React from 'react';
import fileImg from '../assets/file.png';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate()

    const handleLogin = () => {
        navigate('/login')
    }

    const handleSignup = () => {
        navigate('/signup')
    }
    return (
        <div className='bg-[#4a7aff] min-h-screen flex flex-col'>
            {/* Navbar */}
            <div className='text-3xl text-white py-8 px-8'>
                FlickFile
            </div>

            {/* Main body */}
            <div className='flex flex-col md:flex-row items-center md:items-start flex-1'>
                <div className='flex flex-col mt-8 md:mt-32 px-8 md:px-48 w-full md:w-3/5'>
                    <h1 className='text-4xl md:text-5xl font-bold text-richblue-5 justify-center items-center'>
                        Welcome To
                        <span className='block md:inline text-4xl md:text-5xl text-white'> FlickFile</span>
                    </h1>
                    <p className='mt-4 md:mt-8 text-lg md:text-2xl text-white'>
                        Welcome to FlickFile - your go-to solution for seamless file sharing! Effortlessly upload your files to the cloud and generate secure, shareable links in seconds. Experience the future of file sharing with speed, security, and simplicity all in one place.
                    </p>

                    <div className='flex gap-6 md:gap-14 mt-8 md:mt-16'>
                        <button
                            onClick={handleLogin}
                            className="bg-blue-300 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
                        >
                            Login
                        </button>
                        <button
                            onClick={handleSignup}
                            className="bg-blue-300 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
                        >
                            Signup
                        </button>
                    </div>
                </div>

                <div className='w-full md:w-2/5 flex items-center justify-center mt-8 md:mt-0'>
                    <img src={fileImg} alt="File Sharing" className='max-w-full h-auto px-8 md:px-0' />
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
