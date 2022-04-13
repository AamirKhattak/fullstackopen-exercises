import React, { useEffect } from "react";
import { connect } from "react-redux";
import { voteAnecdote, initializeAnecdotes } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

function AnecdoteList(props) {
  useEffect(() => {
    props.initializeAnecdotes();
  }, []);

  const {anecdotes} = props;

  const vote = (anecdote) => {
    props.setNotification(`you voted '${anecdote.content}'`, 5);
    props.voteAnecdote(anecdote);
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

const mapDispatchToProps = {
  setNotification,
  voteAnecdote,
  initializeAnecdotes,
};

const mapStateToProps = (state) => {
  const filter = state.filter.toLowerCase();
  let anecdotes = state.anecdote.filter((anecdote) =>
    anecdote.content.toLowerCase().includes(filter)
  );
  return {
    anecdotes: anecdotes.sort((a, b) => b.votes - a.votes),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList);
