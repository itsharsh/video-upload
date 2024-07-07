import React, { useState } from "react";
import FileUpload from "./components/FileUpload";
import Thumbnail from "./components/Thumbnail";

const App = () => {
  const [videoUrl, setVideoUrl] = useState(
    "https://firebasestorage.googleapis.com/v0/b/video-upload-8cccf.appspot.com/o/files%2F1%20-%20How%20to%20Get%20Help.mp4?alt=media&token=a884c751-c22e-4a9d-a2a9-aa0ec667fab6"
  );
  const [selectedThumbnail, setSelectedThumbnail] = useState("");

  const handleUpload = (url) => {
    setVideoUrl(url);
  };

  const handleSelectThumbnail = (thumbnail) => {
    setSelectedThumbnail(thumbnail);
  };

  return (
    <div className="app">
      <h1>Video Upload</h1>
      <FileUpload onUpload={handleUpload} />
      {videoUrl && <Thumbnail videoUrl={videoUrl} onSelectThumbnail={handleSelectThumbnail} />}
      {selectedThumbnail && (
        <div className="selected-thumbnail">
          <h2>Selected Thumbnail</h2>
          <img src={selectedThumbnail} alt="Selected Thumbnail" />
        </div>
      )}
    </div>
  );
};

export default App;
