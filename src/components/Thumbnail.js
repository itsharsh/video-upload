import React, { useState, useEffect, useRef } from "react";

const Thumbnail = ({ videoUrl, onSelectThumbnail }) => {
  const [thumbnails, setThumbnails] = useState([]);
  const videoRef = useRef(null);

  useEffect(() => {
    if (!videoUrl) {
      return;
    }
    const video = videoRef.current;
    video.crossOrigin = "anonymous";
    video.addEventListener("loadeddata", generateThumbnails);
    return () => video.removeEventListener("loadeddata", generateThumbnails);
  }, [videoUrl]);

  const generateThumbnails = () => {
    const video = videoRef.current;
    const interval = video.duration / 5;
    const thumbnailsArray = [];

    for (let i = 0; i < 5; i++) {
      const canvas = document.createElement("canvas");
      canvas.width = 160;
      canvas.height = 90;
      const ctx = canvas.getContext("2d");

      video.currentTime = i * interval;
      video.addEventListener("seeked", function onSeeked() {
        ctx.drawImage(video, 0, 0, 160, 90);
        thumbnailsArray.push(canvas.toDataURL());
        if (thumbnailsArray.length === 5) {
          setThumbnails(thumbnailsArray);
        }
        video.removeEventListener("seeked", onSeeked);
      });
    }
  };

  return (
    <div className="thumbnail-picker">
      <video
        ref={videoRef}
        src={videoUrl}
        style={{ display: "none" }}
        controls
        crossOrigin="anonymous"
      ></video>
      <div className="thumbnails">
        {thumbnails.map((thumbnail, index) => (
          <img
            key={index}
            src={thumbnail}
            alt={`thumbnail ${index}`}
            onClick={() => onSelectThumbnail(thumbnail)}
            crossOrigin="anonymous"
          />
        ))}
      </div>
    </div>
  );
};

export default Thumbnail;
