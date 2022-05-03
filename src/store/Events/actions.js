import { apiUrl } from "../../config/constants";
import axios from "axios";

export const GET_EVENTS = "getEvents/events";
export const LOGIN_SUCCESS = "loginSuccess/events";
export const INCREMENT_LIKES = "incrementLikes/events";

export const loginSuccess = (artistWithToken) => {
  return {
    type: LOGIN_SUCCESS,
    payload: artistWithToken,
  };
};

const getEvents = (events) => ({
  type: GET_EVENTS,
  payload: { events },
});

const incrementLikes = (likes) => ({
  type: INCREMENT_LIKES,
  payload: likes,
});

export const fetchEvents = async (dispatch, getState) => {
  const response = await axios.get(`${apiUrl}/events`);
  dispatch(getEvents(response.data.events));
  console.log(response);
};

export const updateLike = (id, like) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.patch(`${apiUrl}/events/${id}`, {
        like: like + 1,
      });
      dispatch(fetchEvents);
      dispatch(incrementLikes(id));
    } catch (error) {
      console.log(error.message);
    }
  };
};
