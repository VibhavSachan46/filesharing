import React, { useState } from 'react';
import { IoCloudUploadOutline } from "react-icons/io5";
import { TbHistoryToggle } from "react-icons/tb";
import { IoLogOutOutline } from "react-icons/io5";
import History from "../components/History";
import Upload from "../components/Upload";

const Dashboard = () => {
  const [selectedComponent, setSelectedComponent] = useState('upload');

  const renderContent = () => {
    switch (selectedComponent) {
      case 'upload':
        return <Upload setSelectedComponent={setSelectedComponent} />;
      case 'history':
        return <History />;
      default:
        return <Upload setSelectedComponent={setSelectedComponent} />;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token_filesharing');
    // Redirect to login page or show a message
    window.location.href = '/'; // or use your routing library to navigate
  };

  const getSidebarItemClasses = (componentName) => {
    return selectedComponent === componentName
      ? 'flex justify-center items-center gap-4 cursor-pointer text-blue-300'
      : 'flex justify-center items-center gap-4 cursor-pointer text-richblack-200';
  };

  return (
    <div className='flex flex-col md:flex-row h-full'>
      {/* Left component => Navigation bar */}
      <div className='bg-black w-full max-h-full md:w-[20%] flex flex-col text-2xl p-4 md:p-0 items-center'>
        <p className='font-semibold text-5xl my-8 md:my-16 font-inter text-white'>
          Flick Files
        </p>

        <div className='flex flex-col gap-8'>
          <button
            className={getSidebarItemClasses('upload')}
            onClick={() => setSelectedComponent('upload')}
          >
            <IoCloudUploadOutline />
            <p>Upload</p>
          </button>

          <button
            className={getSidebarItemClasses('history')}
            onClick={() => setSelectedComponent('history')}
          >
            <TbHistoryToggle />
            <p>History</p>
          </button>

          <button
            className='flex justify-center items-center gap-4 cursor-pointer text-richblack-200'
            onClick={handleLogout}
          >
            <IoLogOutOutline />
            <p>
              Log Out
            </p>
          </button>

        </div>
      </div>

      {/* Right part => Content */}
      <div className='bg-richblue-200 w-full max-h-full md:w-[80%] p-4 flex-grow'>
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;
