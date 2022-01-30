import { shuffle } from "lodash";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { playlistAtom, playlistIdState } from "../../atoms/playlistAtom";
import useSpotify from "../../hooks/useSpotify";
import Songs from "../songs/songs";

const { ChevronDownIcon } = require("@heroicons/react/outline");
const { useSession, signOut } = require("next-auth/react");

const colors = [
  "from-indigo-500",
  "from-blue-500",
  "from-green-500",
  "from-red-500",
  "from-yellow-500",
  "from-pink-500",
  "from-purple-500",
];

const Center = () => {
  const [color, setColor] = useState(null);
  const { data: session } = useSession();
  const [playlist, setPlaylist] = useRecoilState(playlistAtom);
  const playlistId = useRecoilValue(playlistIdState);
  const spotifyApi = useSpotify();

  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [playlistId]);

  useEffect(() => {
    if (spotifyApi.getAccessToken())
      spotifyApi
        .getPlaylist(playlistId)
        .then((data) => {
          setPlaylist(data.body);
        })
        .catch((err) => console.log("Something went wrong!..", err));
  }, [spotifyApi, playlistId]);

  return (
    <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide">
      <header className="absolute top-5 right-8">
        <div
          className="flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2 text-white"
          onClick={signOut}
        >
          <img
            className="rounded-full w-10 h-10"
            src={session?.user?.image}
            alt=""
          />
          <h2 className="text-white">{session?.user.name}</h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>
      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white padding-8`}
      >
        <img
          className="h-44 w-44 shadow-2xl m-10"
          src={playlist?.images?.[0]?.url}
          alt=""
        />
        <div className="m-10">
          <h2 className="text-2xl md:text-3xl xl:text-5xl">{playlist?.name}</h2>
        </div>
      </section>
      <Songs />
    </div>
  );
};

export default Center;
