import React, { useState, useRef } from 'react';
import { FileUp, X, Upload, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import axios from 'axios';
import Nav from '../../Components/Nav';


const ResumeUpload = () => {
  const [file, setFile] = useState(null);
  const api_link = "http://127.0.0.1:8000/"
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const validateFile = (file) => {
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type)) {
      setErrorMessage('Please upload a PDF, JPEG, or PNG file');
      return false;
    }

    if (file.size > maxSize) {
      setErrorMessage('File size must be less than 5MB');
      return false;
    }

    return true;
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && validateFile(droppedFile)) {
      setFile(droppedFile);
      setErrorMessage('');
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && validateFile(selectedFile)) {
      console.log(selectedFile);
      setFile(selectedFile);
      setErrorMessage('');
    }
  };

  const handleUpload = async () => {
    if (!file) return;
  
    const formData = new FormData();
    formData.append('resume_image', file);
  
    setUploadStatus('uploading');
    console.log(file);
    try {
      // Replace with your actual API endpoint
      const response = await fetch(api_link + 'base/extract_resume_skills/', {
        method: 'POST',
        body: formData,
        headers: {
          "Authorization": `Bearer ${JSON.parse(localStorage.getItem("authTokens")).access}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to upload file');
      }
  
      const data = await response.json();
      console.log(data);
      setUploadStatus('success');
      console.log('Upload successful:', data);
    } catch (error) {
      setUploadStatus('error');
      setErrorMessage('Failed to upload file. Please try again.');
      console.error('Upload error:', error);
    }
  };
  
  

  const handleRemoveFile = () => {
    setFile(null);
    setErrorMessage('');
    setUploadStatus('idle');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div
    style={{
      background: 'linear-gradient(115deg, rgba(38, 0, 74, 0.73) 2.22%, rgba(105, 36, 171, 0.73) 103.12%)'
    }} className="h-screen  flex p-5">
        <Nav/>
        <div className='flex justify-center items-center w-full'>
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileUp className="w-10 h-10 text-blue-600" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Scan Document to screen Resume
          </h2>
          <p className="text-gray-500">
            Upload your document in PDF, JPEG, or PNG format
          </p>
        </div>

        <div
          className={`border-2 border-dashed rounded-xl p-6 transition-colors ${
            isDragging
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:border-blue-500'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {!file ? (
            <div className="text-center">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Upload className="w-4 h-4 mr-2" />
                Choose File
              </button>
              <p className="mt-2 text-sm text-gray-500">
                or drag and drop your file here
              </p>
            </div>
          ) : (
            <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center space-x-3">
                <FileUp className="w-6 h-6 text-blue-600" />
                <span className="text-sm font-medium text-gray-900">
                  {file.name}
                </span>
              </div>
              <button
                onClick={handleRemoveFile}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {errorMessage && (
          <div className="mt-4 flex items-center text-red-600 text-sm">
            <AlertCircle className="w-4 h-4 mr-2" />
            {errorMessage}
          </div>
        )}

        <button
          onClick={handleUpload}
          disabled={!file || uploadStatus === 'uploading'}
          className={`mt-6 w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md text-white ${
            !file
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
        >
          {uploadStatus === 'uploading' ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Uploading...
            </>
          ) : uploadStatus === 'success' ? (
            <>
              <CheckCircle2 className="w-5 h-5 mr-2" />
              Uploaded Successfully
            </>
          ) : (
            'Upload'
          )}
        </button>
      </div>
        </div>
    </div>
  );
};

export default ResumeUpload;
