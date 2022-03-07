const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

const Part = ({part, exc}) => {
  return <p>{part} {exc}</p>
}

const Content = ({ part1, exc1, part2, exc2, part3, exc3 }) => {
  return (
    <div>
      <Part part={part1} exc={exc1}/>
      <Part part={part2} exc={exc2}/>
      <Part part={part3} exc={exc3}/>
    </div>
  );
};

const Total = ({total}) => {
  return <p>Number of exercises {total}</p>
}

const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  return (
    <div>
      <Header course={course} />
      <Content
        part1={part1}
        exc1={exercises1}
        part2={part2}
        exc2={exercises2}
        part3={part3}
        exc3={exercises3}
      />
      <Total total={exercises1 + exercises2 + exercises3} />
    </div>
  );
};

export default App;
