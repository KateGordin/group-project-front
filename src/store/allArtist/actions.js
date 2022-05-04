import { apiUrl } from "../../config/constants";
import axios from "axios";

export const GET_ARTIST = "GET_ARTIST";

export const getArtists = (artist) => ({
  type: GET_ARTIST,
  payload: artist,
});

export const fetchArtist = (id) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`${apiUrl}/events/artist/${id}`);

      console.log("data", response.data);

      dispatch(getArtists(response.data.artist));
    } catch (e) {
      console.log(e.message);
    }
  };
};
