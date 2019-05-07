import * as types from "./../constants/ActionTypes";
import v4 from 'uuid/v4';
//Exports a function that return an action object
export const nextLyric = (currentSongId) => ({
  type: types.NEXT_LYRIC,
  currentSongId
});

export const restartSong = (currentSongId) => ({
  type: types.RESTART_SONG,
  currentSongId
});

export const changeSong = (newSelectedSongId) => ({
  type: types.CHANGE_SONG,
  newSelectedSongId
});

export const requestSong = (title, localSongId) => ({
  type: types.REQUEST_SONG,
  title,
  songId:localSongId
});

export function fetchSongId(title) {
  return function (dispatch) {
    const localSongId = v4();
    dispatch(requestSong(title, localSongId));
    title = title.replace(' ', '_');
    return fetch('http://api.musixmatch.com/ws/1.1/track.search?&q_track=' + title + '&page_size=1&s_track_rating=desc&apikey=9e33a8e5a55944afef07cf34b7b7728b').then(
      response => response.json(),
      error => console.log('An error occurred.', error)
    ).then(function(json) {
      console.log('CHECK OUT THIS SWEET API RESPONSE:', json)
    });
  };
}
