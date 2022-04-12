import React from "react";
import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import anecdotesService from "../services/anecdotes";

export default function AnecdoteForm() {
  const dispatch = useDispatch();

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    const anecdote = event.target.anecdote.value;
    event.target.anecdote.value = "";

    const savedAnecdoote = await anecdotesService.create(anecdote);
    dispatch(createAnecdote(savedAnecdoote));
  };

  return (
    <div>
      <h4>create new</h4>
      <form onSubmit={handleOnSubmit}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
}
