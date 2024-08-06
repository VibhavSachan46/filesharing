import React, { useEffect, useState } from 'react';
import { MdDelete } from "react-icons/md";
import axios from 'axios';
import { FaCopy } from "react-icons/fa";
import toast from 'react-hot-toast';
import { FaRegFileAudio } from "react-icons/fa6";

const History = () => {
  const [uploadHistory, setUploadHistory] = useState([]);
  const [userDetails, setUserDetails] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      const toastId = toast.loading("Loading...");
      try {
        const token = localStorage.getItem('token_filesharing'); // Retrieve token from local storage
        const response = await axios.get('http://localhost:4000/api/v1/auth/getUserDetails', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setUploadHistory(response.data.userDetail.uploadedURLS);
        setUserDetails(response.data.userDetail);
        toast.dismiss(toastId);
      } catch (error) {
        setError(error.message);
        toast.dismiss(toastId);
      }
    };

    fetchHistory();
  }, []);

  const handleCopy = (url) => {
    navigator.clipboard.writeText(url).then(() => {
      toast.success('URL copied to clipboard!');
    }).catch((err) => {
      toast.error('Failed to copy URL');
      console.error('Could not copy text: ', err);
    });
  };

  const handleDelete = async (fileId) => {
    const toastId = toast.loading("Deleting...");
    try {
      const token = localStorage.getItem('token_filesharing');
      await axios.delete(`http://localhost:4000/api/v1/file/${fileId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setUploadHistory(uploadHistory.filter(item => item._id !== fileId));
      toast.dismiss(toastId);
      toast.success('File deleted successfully!');
    } catch (error) {
      toast.dismiss(toastId);
      toast.error('Failed to delete file');
      console.error('Error deleting file: ', error);
    }
  };

  if (error) return <div>Error: {error}</div>;

  return (
    <div className='p-4'>
      {/* Navbar */}
      <div className='flex items-center justify-between p-4 bg-gray-800 text-black rounded-lg mb-8'>
        <div className='flex items-center'>
          <h2 className='text-xl font-semibold mr-4'>Welcome, <span className='font-bold'>{userDetails.firstName}</span>  <span className='font-bold'>{userDetails.lastName}</span></h2>
          <img src={userDetails.image} alt="profile" className='h-16 w-16 rounded-full' />
        </div>
      </div>
      <h2 className="text-2xl font-bold mb-4">History</h2>
      <div className=''>
        {uploadHistory.length > 0 ? (
          <ul>
            {uploadHistory.map((item) => (
              <li key={item._id} className="mb-4 p-4 bg-gray-100 rounded-lg shadow-md bg-richblue-100">
                <div className="flex items-center justify-between">
                  {
                    item.fileType === "image/jpeg" ||
                      item.fileType === "image/png" ||
                      item.fileType === "image/jpg" ? (
                      <img
                        src={item.url}
                        alt={item.name}
                        className="w-16 h-16 mr-4 rounded-full"
                        onError={(e) => e.target.style.display = 'none'}
                      />
                    ) : (
                      <FaRegFileAudio className="w-16 h-16 mr-4 rounded-full" />
                    )
                  }
                  <div className='flex flex-col md:flex-row gap-4 w-full items-center'>
                    <div className='flex-1'>
                      <p><strong>Name:</strong> {item.name}</p>
                    </div>
                    <div className='flex-1'>
                      <p><strong>Size:</strong> {item.size} MB</p>
                    </div>
                    <div className='flex-1'>
                      <p><strong>Type:</strong> {item.fileType}</p>
                    </div>
                    <div className='flex-1'>
                      <p><strong>Uploaded At:</strong> {new Date(item.createdAt).toLocaleString()}</p>
                    </div>
                    <div className='flex gap-8 text-xl'>
                      <MdDelete
                        className='cursor-pointer text-red-500'
                        onClick={() => handleDelete(item._id)}
                      />
                      <FaCopy
                        className='cursor-pointer text-blue-500'
                        onClick={() => handleCopy(item.url)} />
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No upload history available.</p>
        )}
      </div>
    </div>
  );
}

export default History;
