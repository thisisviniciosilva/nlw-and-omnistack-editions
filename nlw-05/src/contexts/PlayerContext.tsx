import { createContext, ReactNode, useContext, useState } from "react";

type Episode = {
  url: string;
  title: string;
  members: string;
  duration: number;
  thumbnail: string;
};

type PlayerContextData = {
  currentEpisodeIndex: number;
  episodesList: Array<Episode>;
  isLooping: boolean;
  isPlaying: boolean;
  isShuffling: boolean;
  hasNext: boolean;
  hasPrevious: boolean;
  clearPlayerState: () => void;
  play: (episode: Episode) => void;
  playList: (list: Array<Episode>, index: number) => void;
  playNext: () => void;
  playPrevious: () => void;
  setIsPlayingState: (state: boolean) => void;
  toggleLoop: () => void;
  togglePlay: () => void;
  toggleShuffle: () => void;
};

type PlayerContextProviderProps = {
  children: ReactNode;
};

const PlayerContext = createContext({} as PlayerContextData);

export function PlayerContextProvider({
  children,
}: PlayerContextProviderProps) {
  const [episodesList, setEpisodesList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);

  const hasNext = isShuffling || currentEpisodeIndex + 1 < episodesList.length;
  const hasPrevious = currentEpisodeIndex > 0;

  function clearPlayerState() {
    setEpisodesList([]);
    setCurrentEpisodeIndex(0);
  }

  function play(episode: Episode) {
    setEpisodesList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }

  function playList(list: Array<Episode>, index: number) {
    setEpisodesList(list);
    setCurrentEpisodeIndex(index);
    setIsPlaying(true);
  }

  function playNext() {
    if (isShuffling) {
      const randomNextEpisodeIndex = Math.floor(
        Math.random() * episodesList.length
      );

      setCurrentEpisodeIndex(randomNextEpisodeIndex);
    } else if (hasNext) {
      setCurrentEpisodeIndex(currentEpisodeIndex + 1);
    }
  }

  function playPrevious() {
    if (hasPrevious) {
      setCurrentEpisodeIndex(currentEpisodeIndex - 1);
    }
  }

  function setIsPlayingState(state: boolean) {
    setIsPlaying(state);
  }

  function toggleLoop() {
    setIsLooping(!isLooping);
  }

  function toggleShuffle() {
    setIsShuffling(!isShuffling);
  }

  function togglePlay() {
    setIsPlaying(!isPlaying);
  }

  return (
    <PlayerContext.Provider
      value={{
        currentEpisodeIndex,
        episodesList,
        isLooping,
        isPlaying,
        isShuffling,
        hasNext,
        hasPrevious,
        clearPlayerState,
        play,
        playList,
        playNext,
        playPrevious,
        setIsPlayingState,
        toggleLoop,
        togglePlay,
        toggleShuffle,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  return useContext(PlayerContext);
}

export default PlayerContext;
