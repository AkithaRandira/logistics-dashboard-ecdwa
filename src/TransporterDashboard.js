import React, { useState } from 'react';
import './TransporterDashboard.css';

const TransporterDashboard = ({ user, signOut }) => {
  const [file, setFile] = useState(null);
  const [uploadHistory, setUploadHistory] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) return;
    const newItem = {
      filename: file.name,
      uploadedAt: new Date().toLocaleString(),
    };
    setUploadHistory([newItem, ...uploadHistory]);
    setSuccessMessage(`✅ "${file.name}" uploaded successfully!`);
    setFile(null);

    setTimeout(() => setSuccessMessage(''), 3000);
  };

  return (
    <div className="dashboard">
      <div className="header">
        <h1>Welcome, {user?.username}</h1>
        <button onClick={signOut}>Sign Out</button>
      </div>

      <div className="upload-box">
        <h2> Upload Excel File</h2>
        <input type="file" accept=".xlsx,.xls" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>
        {successMessage && <p className="success">{successMessage}</p>}
      </div>

      <div className="history-box">
        <h3> Upload History <span className="count">({uploadHistory.length})</span></h3>
        {uploadHistory.length === 0 ? (
          <p className="empty">No uploads yet.</p>
        ) : (
          <ul>
            {uploadHistory.map((item, index) => (
              <li key={index}>
                📄 <strong>{item.filename}</strong>
                <span className="timestamp">{item.uploadedAt}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TransporterDashboard;
