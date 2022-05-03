import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectDetailEvent } from "../store/event/selector";
import { getDetailEvent } from "../store/event/actions";
import { useEffect } from "react";

export default function DetailPage() {
  const params = useParams();
  const dispatch = useDispatch();
  const oneEvent = useSelector(selectDetailEvent);
  // console.log("oneEvent", oneEvent);

  //get one event (by id), using func from actions
  const getOneEvent = async () => dispatch(await getDetailEvent(params.id));

  useEffect(() => {
    getOneEvent();
  }, []);

  return (
    <div>
      {!oneEvent ? (
        "Loading"
      ) : (
        <div key={oneEvent.id}>
          <h3>{oneEvent.title}</h3>
          <img src={oneEvent.mainImage} style={{ width: 500 }} />
          <p>{oneEvent.description}</p>
          <p>
            <span style={{ fontWeight: "bold" }}>When: </span>
            {oneEvent.date}
          </p>
          <p>
            <span style={{ fontWeight: "bold" }}>Location: </span>
            {oneEvent.place}
          </p>
          <button>BUY A TICKET</button>
        </div>
      )}
    </div>
  );
}
