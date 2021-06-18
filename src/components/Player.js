import React, { useEffect } from "react";
import { FaPlay, FaAngleLeft, FaAngleRight, FaPause } from "react-icons/fa";

// es komponenti pasuxismgebelia player_ze
// time-control div pasuxismgebelia drois machvenebelze musikis
// play-control pasuxismgebelia im gilakebze romlitac timers vakontrolebt

const Player = ({
  setSongInfo,
  songInfo,
  isPlaying,
  setIsPlaying,
  audioRef,
  setCurrentSong,
  songs,
  setSongs,
  currentSong,
  song,
}) => {
  // Event Handler for play pause/start music
  const playMusicHandler = () => {
    // tu mimdinareobs musika pause tu ara play aseve icvleba state true dan falseshi
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  // musikis dawyebis damrgvalebis handleri
  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };
  // musikis buttonis gadaweva gadmoweva
  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  const skipSongHandler = async (direction) => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (direction === "skip-forward") {
      await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    }
    if (direction === "skip-back") {
      if ((currentIndex - 1) % songs.length === -1) {
        setCurrentSong(songs[songs.length - 1]);
        if (isPlaying) audioRef.current.play();
        return;
      }
      setCurrentSong(songs[(currentIndex - 1) % songs.length]);
    }
    if (isPlaying) audioRef.current.play();
  };

  useEffect(() => {
    const newSongs = songs.map((song) => {
      if (song.id === currentSong.id) {
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
  }, [currentSong]);

  const trackAnim = {
    transform: `translateX(${songInfo.animationPercetange}%)`,
  };

  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <div
          style={{
            background: `linear-gradient(to right,${currentSong.color[0]},${currentSong.color[1]})`,
          }}
          className="track"
        >
          <input
            onChange={dragHandler}
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            type="range"
          />
          <div style={trackAnim} className="animate-track"></div>
        </div>
        <p>{songInfo.duration ? getTime(songInfo.duration) : "6:96"}</p>
      </div>
      <div className="play-control">
        <FaAngleLeft size="40" onClick={() => skipSongHandler("skip-back")} />
        {!isPlaying ? (
          <FaPlay onClick={playMusicHandler} size="40" />
        ) : (
          <FaPause onClick={playMusicHandler} size="40" />
        )}
        <FaAngleRight
          size="40"
          onClick={() => skipSongHandler("skip-forward")}
        />
      </div>
    </div>
  );
};

export default Player;
