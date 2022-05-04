import { apiUrl } from "../../config/constants";
import axios from "axios";
import { selectToken, selectArtist } from "./selectors";

import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
  setMessage,
} from "../appState/actions";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const TOKEN_STILL_VALID = "TOKEN_STILL_VALID";
export const LOG_OUT = "LOG_OUT";
export const ARTIST_UPDATED = "ARTIST_UPDATED ";
export const EVENT_POST_SUCCESS = "EVENT_POST_SUCCESS";
export const EVENT_DELETE_SUCCESS = "EVENT_DELETE_SUCCESS";

//login
const loginSuccess = (artistWithToken) => {
  return {
    type: LOGIN_SUCCESS,
    payload: artistWithToken,
  };
};

export const login = (email, password) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, {
        email,
        password,
      });

      dispatch(loginSuccess(response.data));
      dispatch(showMessageWithTimeout("success", false, "welcome back!", 1500));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        //console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

//logOut
export const logOut = () => ({ type: LOG_OUT });

//signUp
export const signUp = (name, email, password, isArtist) => {
  console.log("sign", name);
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/auth/signup`, {
        name,
        email,
        password,
        isArtist,
      });

      dispatch(loginSuccess(response.data));
      dispatch(showMessageWithTimeout("success", true, "account created"));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

//get Artist with stored token
const tokenStillValid = (artistWithoutToken) => ({
  type: TOKEN_STILL_VALID,
  payload: artistWithoutToken,
});

export const getArtistWithStoredToken = () => {
  return async (dispatch, getState) => {
    // get token from the state
    const token = selectToken(getState());

    // if we have no token, stop
    if (token === null) return;

    dispatch(appLoading());
    try {
      // if we do have a token,
      // check wether it is still valid or if it is expired
      const response = await axios.get(`${apiUrl}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // token is still valid
      dispatch(tokenStillValid(response.data));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.message);
      } else {
        console.log(error);
      }
      // if we get a 4xx or 5xx response,
      // get rid of the token by logging out
      dispatch(logOut());
      dispatch(appDoneLoading());
    }
  };
};

//Update artist
export const artistUpdate = (artist) => ({
  type: ARTIST_UPDATED,
  payload: artist,
});

export const updateArtist = (name, email, image, id) => {
  return async (dispatch, getState) => {
    try {
      // const { token } = selectArtist(getState());
      const token = selectToken(getState());
      dispatch(appLoading());
      // console.log("action art",name, email, id);
      console.log("token", token);

      const response = await axios.patch(
        `${apiUrl}/events/${id}`,
        {
          name,
          email,
          image,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("update", response);

      dispatch(
        showMessageWithTimeout("success", false, "update successfull", 3000)
      );
      dispatch(artistUpdate(response));
      dispatch(appDoneLoading());
    } catch (e) {
      console.log(e.message);
    }
  };
};

//post events

export const eventPostSuccess = (event) => ({
  type: EVENT_POST_SUCCESS,
  payload: event,
});

export const postEvent = (
  title,
  description,
  date,
  address,
  mainImage,
  images,
  ticketPrice,
  seat
) => {
  return async (dispatch, getState) => {
    try {
      const { token } = selectArtist(getState());
      console.log("token", token);

      dispatch(appLoading());

      const response = await axios.post(
        `${apiUrl}/events/newEvent`,
        {
          title,
          description,
          date,
          address,
          mainImage,
          images,
          ticketPrice,
          seat,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Yep!", response.data);
      dispatch(showMessageWithTimeout("sucess", true, "event added", 1500));

      dispatch(eventPostSuccess(response.data.event));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

//delete event

export const eventDeleteSuccess = (id) => ({
  type: EVENT_DELETE_SUCCESS,
  payload: id,
});

export const deleteEvent = (id) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    const { token } = selectArtist(getState());

    //console.log(id);

    try {
      const response = await axios.delete(`${apiUrl}/events/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // console.log("Product deleted?", response);

      dispatch(eventDeleteSuccess(id));
      dispatch(appDoneLoading());
    } catch (e) {
      console.error(e);
    }
  };
};
