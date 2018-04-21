import React, { Component } from 'react';
import moment from 'moment';
import art from '../art.jpg';

var SongInfo =  (props) => {
  return (
    <div className="song__details">
      <img className="song__album-art" src={art}></img>
      <div className="song__detail-container">
        <div className="song__detail detail--name">
          <span className="label">Track Name</span>: <span className="value">{props.selectedSong.metadata.name}</span>
        </div>
        <div className="song__detail detail--genre">
          <span className="label">Genre</span>: <span className="value">{props.selectedSong.metadata.genres}</span>
        </div>
        <div className="song__detail detail--rating">
          <span className="label">Rating</span>: <span className="value">{props.selectedSong.metadata.rating}%</span>
        </div>
        <div className="song__detail detail--rating">
          <span className="label">Length</span>: <span className="value">{moment.utc(props.selectedSong.metadata.length*1000).format('mm:ss')}</span>
        </div>
        <div className="song__detail detail--album-name">
          <span className="label">Album Name</span>: <span className="value">{props.selectedSong.metadata.album && props.selectedSong.metadata.album.name}</span>
        </div>
        <div className="song__detail detail--artist-name">
          <span className="label">Artist Name</span>: <span className="value">{props.selectedSong.artist}</span>
        </div>
        <div className="song__detail detail--release-date">
          <span className="label">Release Date</span>: <span className="value">{moment(props.selectedSong.metadata.release_date).format('DD MMMM YYYY ')}</span>
        </div>
      </div>
    </div>
  )
}

export default SongInfo;
