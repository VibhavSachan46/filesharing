import React, { useState } from 'react';
import axios from 'axios';

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    console.log("UPlaoded")
    // if (!selectedFile) {
    //   alert('Please select a file to upload.');
    //   return;
    // }

    // const formData = new FormData();
    // formData.append('file', selectedFile);

    // try {
    //   const response = await axios.post('YOUR_UPLOAD_ENDPOINT_HERE', formData, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     },
    //     onUploadProgress: (progressEvent) => {
    //       const { loaded, total } = progressEvent;
    //       setUploadProgress(Math.round((loaded * 100) / total));
    //     },
    //   });
    //   setUploadStatus('Upload successful!');
    // } catch (error) {
    //   setUploadStatus('Upload failed.');
    //   console.error('Error uploading file:', error);
    // }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-3 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">Upload File</h1>
        <div className="space-y-6">
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
        {uploadProgress > 0 && (
          <div className="mt-4 w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        )}
        {uploadStatus && <p className="mt-4 text-center">{uploadStatus}</p>}
      </div>
    </div>
  );
};

export default Upload;

