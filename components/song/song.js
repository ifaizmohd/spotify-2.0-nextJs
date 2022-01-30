import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../../atoms/songAtom";
import useSpotify from "../../hooks/useSpotify";

const Song = ({ track, order }) => {
  const { album, artists } = track;
  const spotifyApi = useSpotify();
  const [currentTrackId, setCurrentTrackId] = useRecoilState(
    currentTrackIdState
  );
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const playsong = () => {
    console.log("current track --- ", track);
    setCurrentTrackId(track.id);
    setIsPlaying(true);
    spotifyApi
      .play({
        uris: [track.uri],
      })
      .catch((err) =>
        console.log("error occurred while playing the song >>> ", err)
      );
  };
  return (
    <div
      className="grid grid-cols-2 text-gray-500 cursor-pointer hover:bg-gray-900 rounded-lg"
      onClick={playsong}
    >
      <div className="flex items-center space-x-2">
        <p>{order + 1}</p>
        <img className="w-10 h-10" src={album?.images?.[0].url} alt="" />
        <div className="">
          <p className="w-36 lg:w-64 truncate text-white">{track.name}</p>
          <p>{artists[0].name}</p>
        </div>
      </div>
      <div className="flex items-center justify-between ml-auto md:ml-0">
        <p className="hidden md:inline">{album.name}</p>
        <p>
          {Math.floor((track.duration_ms / 1000 / 60) << 0)}:
          {Math.floor((track.duration_ms / 1000) % 60)}
        </p>
      </div>
    </div>
  );
};

export default Song;
