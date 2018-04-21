import React, { Component } from 'react';

class AudioPlayer extends Component {

  componentDidUpdate() {
    this.audioPlayerRef.play();
  }

  render() {
    return(
      <div className="audio-player__container">
        <audio className="audio-player" src={`https://docs.google.com/uc?export=download&id=${this.props.selectedSong.id}`} controls ref={(ref) => this.audioPlayerRef = ref} ></audio>
      </div>
    )
  }
}

export default AudioPlayer;
