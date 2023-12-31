import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import useClipboard from "react-use-clipboard";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import host from "../hostUrl";

const Dashboard = () => {
  const { currentUser } = useContext(AuthContext);
  const [textToCopy, setTextToCopy] = useState("");
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);

  const [isCopied, setCopied] = useClipboard(textToCopy, {
    successDuration: 1000,
  });
  const [notification, setNotification] = useState({
    message: "",
    isError: false,
  });

  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true });

  const { transcript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  const saveTranscriptToBackend = async () => {
    try {
      if (!currentUser || !currentUser.User._id) {
        return;
      }
      setSaving(true);
      SpeechRecognition.stopListening();

      const payload = {
        userId: currentUser.User._id,
        speechText: transcript,
        language: "en-IN",
      };

      await axios.post(`${host}/api/user/speech`, payload);
      
      setNotification({ message: "Transcript saved!", isError: false });
    } catch (error) {
      console.error("Error saving transcript:", error);
      setNotification({ message: "Error saving transcript!", isError: true });
    } finally {
      setSaving(false);
    }
  };

  const clearTranscript = () => {
    setTextToCopy("");
    SpeechRecognition.stopListening();
    navigate("/");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setNotification({ message: "", isError: false });
    }, 2000);
    return () => clearTimeout(timer);
  }, [notification]);

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  return (
    // <div className="container mt-5 custom-container">
    <div className="row justify-content-center">
      <center className=" m-4">
        <div className="col-md-8 custom-column">
          <div
            className="car custom-card mt-5"
            style={{ height: "32em", width: "50em", borderRadius: "15px" }}
          >
            <div className="card-body custom-card-body">
              <h2 className="card-title  " style={{ margin: "15px" }}>
                Voice to Text Translator
              </h2>
              <p> Instant Speech Recognition & Translation</p>
              <div
                className="border border-info p-4 mb-4 custom-transcript"
                style={{
                  height: "20em",
                  width: "41em",
                  borderRadius: "10px",
                  overflow: "auto",
                }}
                onClick={() => setTextToCopy(transcript)}
              >
                {transcript}
              </div>
              <div
                className="d-flex justify-content-between mb-3"
                style={{ margin: "50px" }}
              >
                <button
                  className="btn btn-outline-info"
                  onClick={() => {
                    setTextToCopy(transcript);
                    setCopied();
                  }}
                >
                  {isCopied ? "Copied!" : "Copy to clipboard"}
                </button>
                <button
                  className="btn btn-outline-info"
                  onClick={startListening}
                >
                  Start Speaking
                </button>
                <button
                  className="btn btn-outline-info"
                  onClick={SpeechRecognition.stopListening}
                >
                  Stop Speaking
                </button>
                <button
                  className="btn btn-outline-info"
                  onClick={saveTranscriptToBackend}
                >
                  {saving ? "Saving..." : "Save & Translate"}
                </button>
                <button
                  className="btn btn-outline-info"
                  onClick={clearTranscript}
                >
                  Clear
                </button>
              </div>
              {notification.message && (
                <div
                  className={`notification ${
                    notification.isError ? "error" : "success"
                  }`}
                >
                  {notification.message}
                </div>
              )}
            </div>
          </div>
        </div>
      </center>
      {/* </div> */}
    </div>
  );
};

export default Dashboard;
