import { connect } from "react-redux";
import { setFilter } from "../reducers/filterReducer";

const Filter = (props) => {
  const handleChange = (event) => {
    // input-field value is in variable event.target.value
    const filterText = event.target.value;
    props.setFilter(filterText);
  };
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

const mapDispatchToProps = {
  setFilter
};

export default connect(null, mapDispatchToProps)(Filter);
