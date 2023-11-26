

import React, { useState } from "react";
import axios from "axios";

import "./home.css"; // Import your CSS files
import "./header.css";

const Home = () => {
  const [files, setFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    console.log(files)

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      if (!selectedFile) {
        console.error("No file selected.");
        return;
      }

      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await axios.post(
        "https://dull-red-rooster-tie.cyclic.app/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("File uploaded successfully:", response.data.data);

      // Assuming the response contains information about the uploaded file
      setFiles([...files, response.data]);
    } catch (error) {
      console.error("Error uploading file:", error.message);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="nav-bar">
        <a href="" className="back-icon" style={{ visibility: "hidden" }}>
          <i
            className="fa-solid fa-circle-arrow-left"
            style={{ color: "#b8b8b8" }}
          ></i>
        </a>
        <div className="title">CSV Upload</div>
      </div>

      {/* Upload */}
      <div className="container">
        {/* Main text */}
        <div className="center-text">
          <h1>Upload a File Here</h1>
          <p>Reads CSV file and displays its content in tabular form</p>
        </div>

        {/* Upload box */}
        <form encType="multipart/form-data">
          <div className="input-container">
            <input
              type="file"
              id="csvFile"
              name="file"
              accept=".csv"
              onChange={handleFileChange}
            />
            <button className="upload-btn" type="button" onClick={handleUpload}>
              Upload
            </button>
          </div>
        </form>
      </div>

      {/* Show uploaded files */}
      <div className="files-list" style={{ marginBottom: "50px" }}>
        <div className="list-center-text">
          <h2>Uploaded files</h2>
        </div>

        {files.length === 0 ? (
          <div className="no-file">No files to show!</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Date</th>
                <th>Time (UTC)</th>
                <th>View</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
                              {files.map((file) => (
                                  <tr key={file.file}>
                                      <td>{file.fileName}</td>
                                      <td>{new Date(file.createdAt).toLocaleDateString()}</td>
                                      <td>{new Date(file.createdAt).toLocaleTimeString()}</td>
                  <td>
                    <a href={`/view/${file.file}`} className="view-link">
                      <i className="fa-solid fa-arrow-up-right-from-square"></i>
                    </a>
                  </td>
                  <td>
                    <a href={`/delete/${file.file}`} className="delete-link">
                      <i
                        className="fa-regular fa-trash-can"
                        style={{ color: "#f00" }}
                      ></i>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Home;
