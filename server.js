const express = require('express');
const path    = require('path');
const fs      = require('fs');
const app     = express();
const port    = process.env.PORT || 5000

const songLibrary         = require('./songLibrary');
const songMetadataLibrary = require('./songMetadataLibrary');

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.get('/api/v1/songs', (request, response) => {
  getFileDetails().then((details) =>  {

    let payload = constructPayload(details);
    payload.then((data) => {
      response.json(data);
    });

  }).catch((err) => {
    console.log('error', err);
  })

});

function getSongMetadata(name, artist) {
  return songMetadataLibrary.getMetadata(name, artist);
}

function constructPayload(fileDetails) {

  let promises = fileDetails.map((obj) => {
    obj.filename = obj.name;
    const song = addNameAndArtist(obj);

    return getSongMetadata(song.name, song.artist).then((data) => {
      return {
        title: song.name,
        artist: song.artist,
        id: song.id,
        filename: song.filename,
        metadata: data || {}
      };
    });
  });

  return Promise.all(promises);
}

function addNameAndArtist(song) {
  song.artist = song.name.split('-')[0].trim();
  song.name   = song.name.split('-')[1].split('.')[0].trim();
  return song;
}

function getFileDetails() {
  return songLibrary.listFiles()
}

app.listen(port, () => console.log(`Listening on port ${port}`))
