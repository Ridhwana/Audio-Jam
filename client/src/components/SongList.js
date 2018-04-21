import React, { Component } from 'react';
import moment from 'moment';

class SongList extends Component {
  render() {
    return (this.props.songs && this.props.songs.map( (song, index) => {
      return (
        <div className={`song ${(song.id === this.props.selectedSong.id) ? 'song--selected': 'song--non-selected'}`} key={index} onClick={() => this.props.onSongSelect(song)}>
          <div className="song__track">
            <span className="song__name">{song.title}</span>
            <span className="sub-text">by</span>
            <span className="song__artist">{song.artist}</span>
            <span className="song__length">{moment.utc(song.metadata.length*1000).format('mm:ss')}</span>
          </div>
        </div>
      )
    }))
  }
}

export default SongList;
