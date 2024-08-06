import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
const BASE_URL = process.env.REACT_APP_BASE_URL

const Upload = ({ setSelectedComponent }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState('');

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleUpload = async () => {
    console.log(`Bearer ${localStorage.getItem('token_filesharing')}`);

    if (!selectedFile || !title) {
      toast.error('Please select a file and enter a title to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('title', title);

    try {
      const toastId = toast.loading("Uploading your file...");
      const response = await axios.post(`${BASE_URL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token_filesharing')}`,
        },
        withCredentials: true,
      });

      // console.log("response is", response);
      // console.log("response 2 is", response.data);
      // console.log("response 3 is", response.data.success);
      if (response.data.success) {
        toast.success("File uploaded successfully");
        setSelectedComponent('history'); // Navigate to the history component
      }
      toast.dismiss(toastId);
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error("Failed to upload file");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-3 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">Upload File</h1>
        <div className="space-y-6">
          <input
            type="text"
            placeholder="Title"
            onChange={handleTitleChange}
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-40"
            required
          />
          <input
            type="file"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
          />
          <button
            onClick={handleUpload}
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default Upload;
