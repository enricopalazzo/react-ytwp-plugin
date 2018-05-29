import React from 'react';
import { MoonLoader } from 'react-spinners';
const VideoDetail = ({ video }) => {
  if (!video) {
    return <div><MoonLoader
      color={'#006699'}
      loading={true}
    /></div>
  }
  const videoId = video.id.videoId;
  const videoUrl = `https://www.youtube.com/embed/${videoId}`;
  return (
    <div className="video-detail col-sm-12 col-md-12 col-lg-8">
      <div className="embed-responsive embed-responsive-16by9">
        <iframe className="embed-responsive-item" src={videoUrl} />
      </div>
      <div className="details">
        <div><h3>{video.snippet.title}</h3></div>
        <div>{video.snippet.description}</div>
      </div>
    </div>
  );
};

export default VideoDetail;