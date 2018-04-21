const music = require('musicmatch')({apikey: process.env.MUSIXMATCH_API_KEY, format: "json", appid: ""});

function getMetadata(name, artist){
  return music.matcherTrack({q_track: name, q_artist: artist }).then(function(data) {
    let trackInfo = data.message.body.track

    return constructMinimalTrackPayload(trackInfo);
  }).catch(function(err){
    console.log("Error: ", err);
  });
}

module.exports.getMetadata = getMetadata;

function constructMinimalTrackPayload(payload) {
  const genres = payload && payload.primary_genres.music_genre_list.map((genre) => {
    return genre.music_genre.music_genre_name
  });

  let obj = payload && {
    name: payload.track_name,
    rating: payload.track_rating,
    length: payload.track_length,
    release_date: payload.first_release_date,
    genres: genres,
    album: {
      name: payload.album_name
    }
  };

  return obj;
}
