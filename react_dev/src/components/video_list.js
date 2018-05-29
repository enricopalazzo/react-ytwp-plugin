import React from 'react';
import VideoListItem from './video_list_item';

const VideoList = (props) => {
  const videoItems = props.videos.map((video) => {
    return (
      <VideoListItem
        key={video.etag}
        onVideoSelect={props.onVideoSelect}
        video={video} />
    );
  });
  return (
    <ul className="col-sm-12 col-md-12 col-lg-4 video-list-container">
      {videoItems}
    </ul>
  );
};

export default VideoList;
