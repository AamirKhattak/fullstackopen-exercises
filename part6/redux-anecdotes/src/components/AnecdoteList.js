import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setAnecdote,
  voteAnecdote,
  initializeAnecdotes,
} from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

export default function AnecdoteList() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, []);

  const anecdotes = useSelector((state) => {
    const filter = state.filter.toLowerCase();
    let anecdote = state.anecdote.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(filter)
    );

    return anecdote.sort((a, b) => b.votes - a.votes);
  });

  const vote = (anecdote) => {
    dispatch(setNotification(`you voted '${anecdote.content}'`, 5));
    dispatch(voteAnecdote(anecdote));
  };

  return (
    <div>
      {" "}
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
}
