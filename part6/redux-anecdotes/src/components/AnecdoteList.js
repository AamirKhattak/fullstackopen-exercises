import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import {
  create as createNotification,
  remove as removeNotification,
} from "../reducers/notificationReducer";

export default function AnecdoteList() {
  const anecdotes = useSelector(({ anecdote }) =>
    anecdote.sort((a, b) => b.votes - a.votes)
  );
  const dispatch = useDispatch();

  const vote = (id, anecdote) => {
    console.log("vote", id);
    
    dispatch(createNotification(`you voted '${anecdote}'`));
    dispatch(voteAnecdote(id));
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
            <button onClick={() => vote(anecdote.id, anecdote.content)}>
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
