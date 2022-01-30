import SpotifyWebApi from "spotify-web-api-node";

const scopes = [
  "ugc-image-upload",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-follow-modify",
  "user-follow-read",
  "user-library-read",
  "streaming",
  "user-read-playback-position",
  "playlist-modify-private",
  "playlist-read-collaborative",
  "playlist-read-private",
  "user-top-read",
  "playlist-modify-public",
  "user-read-currently-playing",
  "user-read-recently-played",
].join(",");

const params = {
  scope: scopes,
};

const queryParamString = new URLSearchParams(params);

const LOGIN_URL =
  "https://accounts.spotify.com/authorize?" + queryParamString.toString();

export { LOGIN_URL };
