import React from "react";

// es komponenti pasuxismgebelia mtlianad rac gamodis
// UI ze mtavari komponentebi mat shekrebaze

const LibrarySong = ({
  song,
  setCurrentSong,
  songs,
  id,
  audioRef,
  isPlaying,
  setSongs,
}) => {
  // musikas vcvlit da current musikas vxdit imas romelic gvinda iyos
  const songSelectHandler = async () => {
    await setCurrentSong(song);
    // add active state
    const newSongs = songs.map((song) => {
      if (song.id === id) {
        return {
          ...song,
          active: true,
        };
      } else {
        return {
          ...song,
          active: false,
        };
      }
    });
    setSongs(newSongs);
  };

  //Set Active in library
  if (isPlaying) audioRef.current.play();

  return (
    <div
      onClick={songSelectHandler}
      className={`library-song ${song.active ? "selected" : ""}`}
    >
      <img alt={song.name} src={song.cover}></img>
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
