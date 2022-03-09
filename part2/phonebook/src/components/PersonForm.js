const PersonForm = ({
  name,
  onChangeName,
  number,
  onChangeNumber,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={name} onChange={onChangeName} />
        <br />
        number: <input value={number} onChange={onChangeNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
