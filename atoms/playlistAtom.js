const { atom } = require("recoil");

export const playlistAtom = atom({
  key: "playlistAtom",
  default: null,
});
// default playlist id - 0sOSUL6koKa76FDwAJhiOA
export const playlistIdState = atom({
  key: "playlistIdState",
  default: "",
});
