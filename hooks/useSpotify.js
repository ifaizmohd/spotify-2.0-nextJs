import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
});

const useSpotify = () => {
  const { data: session } = useSession();
  useEffect(() => {
    if (session) {
      if (session.error === "RefreshAccessTokenError") {
        signIn().catch((err) =>
          console.log("error occurred while signin in >>> ", err)
        );
      }
      spotifyApi.setAccessToken(session.user.accessToken);
    }
  }, [session, spotifyApi]);
  return spotifyApi;
};

export default useSpotify;
