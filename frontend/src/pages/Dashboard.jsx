// Dashboard.jsx (Part 1)
import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext'; // Update with the correct path
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import useClipboard from 'react-use-clipboard';
import axios from 'axios';
import './Dashboard.css'; // Import your CSS file here
import { useNavigate } from 'react-router-dom'
import host from '../hostUrl';

const Dashboard = () => {
  const { currentUser } = useContext(AuthContext);
  const [textToCopy, setTextToCopy] = useState('');
  const navigate = useNavigate();
  const [isCopied, setCopied] = useClipboard(textToCopy, {
    successDuration: 1000
  });
  const [notification, setNotification] = useState({ message: '', isError: false });

  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });

  const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  const saveTranscriptToBackend = async () => {
    try {

      console.log(currentUser)
      if (!currentUser || !currentUser.User._id) {
        return;
      }
      
      const payload = {
        userId: currentUser.User._id,
        speechText: transcript,
        language: 'en-IN'
      };
      console.log(payload)
      console.log(host)
      await axios.post(`${host}/api/user/speech`, payload);
      
      console.log("YEEES")
      setNotification({ message: 'Transcript saved!', isError: false });
    } catch (error) {
      console.error('Error saving transcript:', error);
      setNotification({ message: 'Error saving transcript!', isError: true });
    }
  };


  const clearTranscript = () => {
    setTextToCopy('');
    SpeechRecognition.stopListening();
    navigate("/");
  };



  useEffect(() => {
    const timer = setTimeout(() => {
      setNotification({ message: '', isError: false });
    }, 2000);
    return () => clearTimeout(timer);
  }, [notification]);

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  return (
    <div className="dashboard-container">
      <div className="speech-container">
        <div className="container">
          <h2>Speech to Text Converter</h2>
          <div className="main-content" onClick={() => setTextToCopy(transcript)}>
            {transcript}
          </div>
          <div className="btn-style">
            <button onClick={() => { setTextToCopy(transcript); setCopied(); }}>
              {isCopied ? 'Copied!' : 'Copy to clipboard'}
            </button>
            <button onClick={startListening}>Start Speaking</button>
            <button onClick={SpeechRecognition.stopListening}>Stop Speaking</button>
            <button onClick={saveTranscriptToBackend}>Save Transcript</button>
            <button onClick={clearTranscript}>Clear</button>
          </div>
        </div>
      </div>
      {notification.message && (
        <div className={`notification ${notification.isError ? 'error' : 'success'}`}>
          {notification.message}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
