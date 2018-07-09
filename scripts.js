//lyric info
const songList = {
  1: "Fare you well, my honey, fare you well my only true one, All the birds that were singing are flown, except you alone, Going to leave this brokedown palace, On my hand and knees, i will roll roll roll, Make myself a bed in the waterside, In my time, i will roll roll roll, In a bed, in a bed, by the waterside i will lay my head, Listen to the river sing sweet songs, to rock my soul".split(', '),
  2: "Twenty-five years and my life is still, Trying to get up that great big hill of hope, For a destination, I realized quickly when I knew I should, That the world was made up of this brotherhood of man, For whatever that means, And so I cry sometimes when I'm lying in bed, Just to get it all out what's in my head, And I, I am feeling a little peculiar, And so I wake in the morning and I step outside, And I take a deep breath and I get real high, and I Scream from the top of my lungs, What's going on?, And I say hey yeah yeah hey yeah yeah, I said hey what's going on?, And I say hey yeah yeah hey yeah yeah,I said hey what's going on?".split(', ')
};


//INITIAL REDUX STATE
const initialState = {
  currentSongId: null,
  songsById: {
    1: {
      title: "Brokedown Palace",
      artist: "Grateful Dead",
      songId: 1,
      songArray: songList[1],
      arrayPosition: 0,
    },
    2: {
      title: "What's Goin' On",
      artist: "Four Non-Blondes",
      songId: 2,
      songArray: songList[2],
      arrayPosition: 0,
    }
  }
};


// REDUX REDUCER
const lyricChangeReducer = (state = initialState.songsById, action) => {
  let newArrayPosition;
  let newSongsByIdEntry;
  let newSongsByIdStateSlice;
  switch (action.type) {
    case 'NEXT_LYRIC':
      newArrayPosition = state[action.currentSongId].arrayPosition + 1;
      newSongsByIdEntry = Object.assign({}, state[action.currentSongId], {
        arrayPosition: newArrayPosition
      })
      newSongsByIdStateSlice = Object.assign({}, state, {
        [action.currentSongId]: newSongsByIdEntry
      });
      return newSongsByIdStateSlice;

    case 'RESTART_SONG':
      newSongsByIdEntry = Object.assign({}, state [action.currentSongId], {
        arrayPosition: 0
      })
      newSongsByIdStateSlice = Object.assign({}, state, {
        [action.currentSongId]: newSongsByIdEntry
      });
      return newSongsByIdStateSlice;
    default:
      return state;
  }
}

const songChangeReducer = (state = initialState.songsById, action) => {
  switch (action.type){
    case 'CHANGE_SONG':
      return action.newSelectedSongId
    default:
      return state;
  }
}


// JEST TESTS + SETUP
const { expect } = window;

expect(lyricChangeReducer(initialState.songsById, { type: null })).toEqual(initialState.songsById);

expect(lyricChangeReducer(initialState.songsById, { type: 'NEXT_LYRIC', currentSongId: 2 })).toEqual({
  1: {
    title: "Brokedown Palace",
    artist: "Grateful Dead",
    songId: 1,
    songArray: songList[1],
    arrayPosition: 0,
  },
  2: {
    title: "What's Goin' On",
    artist: "Four Non-Blondes",
    songId: 2,
    songArray: songList[2],
    arrayPosition: 1,
  }
});

expect(lyricChangeReducer(initialState.songsById, { type: 'RESTART_SONG', currentSongId: 1 })).toEqual({
  1: {
    title: "Brokedown Palace",
    artist: "Grateful Dead",
    songId: 1,
    songArray: songList[1],
    arrayPosition: 0,
  },
  2: {
    title: "What's Goin' On",
    artist: "Four Non-Blondes",
    songId: 2,
    songArray: songList[2],
    arrayPosition: 0,
  }
});

expect(songChangeReducer(initialState, { type: null })).toEqual(initialState);

expect(songChangeReducer(initialState.currentSongId, { type: 'CHANGE_SONG', newSelectedSongId: 1 })).toEqual(1);


// REDUX STORE
const { createStore } = Redux;
const store = createStore(lyricChangeReducer);


//RENDERING STATE IN DOM
// const renderLyrics = () => {
//   const lyricsDisplay = document.getElementById('lyrics');
//   while (lyricsDisplay.firstChild) {
//     lyricsDisplay.removeChild(lyricsDisplay.firstChild);
//   }
//   const currentLine = store.getState().songLyricsArray[store.getState().arrayPosition];
//   const renderedLine = document.createTextNode(currentLine);
//   document.getElementById('lyrics').appendChild(renderedLine);
// }
//
// window.onload = function() {
//   renderLyrics();
// }
//
//
// //CLICK LISTENER
// const userClick = () => {
//   const currentState = store.getState();
//   if (currentState.arrayPosition === currentState.songLyricsArray.length - 1) {
//     store.dispatch({ type: 'RESTART_SONG'} );
//   } else {
//     store.dispatch({ type: 'NEXT_LYRIC'} );
//   }
// }
//
//
// //SUBSCRIBE TO REDUX STORE
// store.subscribe(renderLyrics);
