import { GET_ARTIST } from "./actions";

const initialState = {
  artist:null,
};
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ARTIST:
      return { ...state, artist: action.payload };
    default:
      return state;
  }
}
