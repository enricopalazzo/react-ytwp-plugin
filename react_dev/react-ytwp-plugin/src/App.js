import _ from 'lodash';
import React, { Component } from 'react';
import YTSearch from 'youtube-api-search';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      selectedVideo: null,
      channelId: window.channelID,
      API_KEY: window.API_KEY
    };

    this.videoSearch(window.TERM);
  }
  componentWillMount() {
    console.log(this.state);


  }
  videoSearch(term) {
    console.log(this.state);
    YTSearch({
      key: this.state.API_KEY,
      term: term,
      limit: 20,
      channelId: this.state.channelId,
    },
      (videos) => {
        this.setState({
          videos: videos,
          selectedVideo: videos[0]
        });
      });
  }
  render() {
    const videoSearch = _.debounce(term => {
      this.videoSearch(term);
    }, 300);
    return (
      <div>
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList
          onVideoSelect={selectedVideo => this.setState({ selectedVideo })}
          videos={this.state.videos} />
      </div>
    );
  }
}

export default App;
