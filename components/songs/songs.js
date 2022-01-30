import React from "react";
import { useRecoilValue } from "recoil";
import { playlistAtom } from "../../atoms/playlistAtom";
import Song from "../song/song";

const Songs = () => {
  const playlist = useRecoilValue(playlistAtom);
  return (
    <div className="px-8 flex flex-col space-y-1 pb-28 text-white">
      {playlist?.tracks.items?.map((tracks, i) => (
        <Song key={tracks.track.id} track={tracks.track} order={i} />
      ))}
    </div>
  );
};

export default Songs;
