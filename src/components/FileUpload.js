import React, { useState } from "react";
import { storage } from "../services/media-upload";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
const FileUpload = ({ onUpload }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    const selected = e.target.files[0];
    if (selected?.type.includes("video")) {
      setFile(selected);
      setError("");
    } else {
      setFile(null);
      setError("Please select a valid video file");
    }
  };

  const handleUpload = () => {
    if (!file) return;

    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgress(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          onUpload(url);
        });
      }
    );
  };

  return (
    <div className="file-upload">
      <input type="file" onChange={handleChange} />
      <button onClick={handleUpload}>Upload</button>
      <div className="progress-bar" style={{ width: `${progress}%` }}>
        {progress}%
      </div>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default FileUpload;
