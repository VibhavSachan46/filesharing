import React, { useState } from 'react';
import { IoCloudUploadOutline } from "react-icons/io5";
import { TbHistoryToggle } from "react-icons/tb";
import { CiShare2 } from "react-icons/ci";
import History from "../components/History";
import Share from "../components/Share";
import Upload from "../components/Upload";

const Dashboard = () => {
  const [selectedComponent, setSelectedComponent] = useState('upload');

  const renderContent = () => {
    switch (selectedComponent) {
      case 'upload':
        return <Upload />;
      case 'history':
        return <History />;
      case 'share':
        return <Share />;
      default:
        return <Upload />;
    }
  };

  const getSidebarItemClasses = (componentName) => {
    return selectedComponent === componentName
      ? 'flex justify-center items-center gap-4 cursor-pointer text-blue-300'
      : 'flex justify-center items-center gap-4 cursor-pointer text-richblack-200';
  };

  return (
    <div className='flex flex-col md:flex-row w-screen h-screen text-center'>
      {/* Left component => Navigation bar */}
      <div className='bg-black w-full md:w-[20%] flex flex-col text-2xl p-4 md:p-0'>
        <p className='font-semibold text-5xl my-8 md:my-16 font-inter text-white'>
          Flick Files
        </p>

        <div className='flex flex-col gap-8'>
          <div
            className={getSidebarItemClasses('upload')}
            onClick={() => setSelectedComponent('upload')}
          >
            <IoCloudUploadOutline />
            <p>Upload</p>
          </div>

          <div
            className={getSidebarItemClasses('history')}
            onClick={() => setSelectedComponent('history')}
          >
            <TbHistoryToggle />
            <p>History</p>
          </div>

          <div
            className={getSidebarItemClasses('share')}
            onClick={() => setSelectedComponent('share')}
          >
            <CiShare2 />
            <p>Share</p>
          </div>
        </div>
      </div>

      {/* Right part => Content */}
      <div className='bg-richblack-25 w-full md:w-[80%] p-4'>
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;
