const Filter = ({ filterText, handleOnChangeFilter }) => {
  return (
    <div>
      filter shown with{" "}
      <input value={filterText} onChange={handleOnChangeFilter} />
    </div>
  );
};

export default Filter;
