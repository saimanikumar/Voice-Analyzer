import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import "./Speeches.css"; // Import your CSS file for Speeches styling
import host from "../hostUrl";


const Speeches = () => {
  const { currentUser } = useContext(AuthContext);
  const [speeches, setSpeeches] = useState([]);
  const [loading, setLoading] = useState(true);


  const fetchSpeeches = async () => {
    try {
      const response = await axios.get(
        `${host}/api/user/speeches/${currentUser?.User?._id}`
      );
      setSpeeches(response.data);
    } catch (error) {
      console.error("Error fetching speeches:", error);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchSpeeches();
  }, []);

  const handleDelete = async (speechId) => {
    try {
      // Find the index of the speech being deleted
      const index = speeches.findIndex((speech) => speech._id === speechId);
      // Make a copy of speeches to update the state later
      const updatedSpeeches = [...speeches];
      // Set a loading state for the specific speech being deleted
      updatedSpeeches[index].deleting = true;
      setSpeeches(updatedSpeeches);

      // Perform the deletion
      await axios.delete(`${host}/api/user/speech/${speechId}`);
      // Fetch speeches again to update the list
      fetchSpeeches();
    } catch (error) {
      console.error("Error deleting speech:", error);
    }
  };

  return (
    <div className="speeches-container">
      <h2 style={{ marginBottom: "20px" }}>Your Speeches After Translation</h2>
      {loading ? (
        <p>Loading...</p>
      ) : speeches.length === 0 ? (
        <p>No Speeches Yet!</p>
      ) : (
        <div className="speech-cards">
          {speeches.map((speech) => (
            <div className="speech-card" key={speech._id}>
              <div className="speech-text">{speech.speechText}</div>
              <button
                onClick={() => handleDelete(speech._id)}
                disabled={speech.deleting} // Disable button when deleting
              >
                {speech.deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Speeches;
