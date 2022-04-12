import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAnecdote, voteAnecdote, initializeAnecdotes  } from "../reducers/anecdoteReducer";
import anecdotesService from "../services/anecdotes";

import {
  create as createNotification,
  remove as removeNotification,
} from "../reducers/notificationReducer";

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
    dispatch(createNotification(`you voted '${anecdote.content}'`));
    dispatch(voteAnecdote(anecdote));
    // create/remove notification
    setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);
  };

  return (
    <div>
      {" "}
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
