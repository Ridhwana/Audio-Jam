import React, { Component } from 'react';

import logo from './logo.svg';

import Songs from './models/songs';
import AudioPlayer from './components/AudioPlayer';
import SongInfo from './components/SongInfo';
import SongList from './components/SongList';

import './styles/App.css';
import {Grid, Paper, AppBar, Toolbar, Typography, CircularProgress} from 'material-ui'

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      response: '',
      selectedSong: null,
      isLoading: true
    };

    this.onSongSelect = this.onSongSelect.bind(this);
  }

  componentDidMount() {
    Songs.list().then((res) => {
         this.setState({ response: res, selectedSong: res[0], isLoading: false})
      }).catch(err => console.log(err));
  }

  onSongSelect(song) {
    console.log(song);
    this.setState({
      selectedSong: song
    })
  }

  render() {
    return (
      <div>
        <AppBar position="static" color="default">
          <Toolbar>
              <img  className="logo" src={logo}></img>
              <span className="title" >Audio Jam</span>
          </Toolbar>
        </AppBar>

        <div className="container">
          {this.state.isLoading && <div className="loading-spinner"><CircularProgress className="loading-spinner__circular-progress"/></div>}
          {
            this.state.selectedSong &&
            (<AudioPlayer selectedSong={this.state.selectedSong} />)
          }

          <div className={'flexGrow'}>
            <Grid container spacing={24}>
              <Grid item xs={12} sm={4}>
                { this.state.selectedSong && (<SongInfo selectedSong={this.state.selectedSong}/>)}
              </Grid>
              <Grid item xs={12} sm={8}>
                <SongList songs={this.state.response} selectedSong={this.state.selectedSong} onSongSelect={this.onSongSelect}/>
              </Grid>
            </Grid>
          </div>

        </div>
      </div>
    );
  }
}

export default App;
