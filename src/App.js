// import hooks
import React, { useState, useRef } from "react";
// import components
import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";
import Nav from "./components/Nav";
import MusicData from "./data";
// import styles
import "./styles/app.scss";

const App = () => {
  // state for duration and current stage
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercetange: 0,
  });

  // musikis dawyebis da damtavrebis drois machveneblebi
  const songTimeHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const animation = Math.round((roundedCurrent / roundedDuration) * 100);
    setSongInfo({
      ...songInfo,
      currentTime: current,
      duration: duration,
      animationPercetange: animation,
    });
  };

  // playlistis gamochenis da dafarvis state

  // Refs
  const audioRef = useRef();
  // mtliani simgerebis data
  const [songs, setSongs] = useState(MusicData());
  // konkretuli simgera
  const [currentSong, setCurrentSong] = useState(songs[0]);
  // pausa da startis state
  const [isPlaying, setIsPlaying] = useState(false);
  const [libraryStatus, setLibraryStatus] = useState(false);

  const songEndHandler = async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    if (isPlaying) audioRef.current.play();
  };

  return (
    <div className={`App ${libraryStatus ? "library-active" : ""}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong} />
      <Player
        audioRef={audioRef}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        currentSong={currentSong}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
        songs={songs}
        setCurrentSong={setCurrentSong}
        setSongs={setSongs}
      />
      <Library
        audioRef={audioRef}
        setCurrentSong={setCurrentSong}
        songs={songs}
        isPlaying={isPlaying}
        setSongs={setSongs}
        setLibraryStatus={setLibraryStatus}
        libraryStatus={libraryStatus}
      />
      <audio
        onTimeUpdate={songTimeHandler}
        ref={audioRef}
        src={currentSong.audio}
        onLoadedMetadata={songTimeHandler}
        onEnded={songEndHandler}
      ></audio>
    </div>
  );
};

export default App;
