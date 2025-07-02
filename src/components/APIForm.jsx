const APIForm = ({ inputs, handleChange, onSubmit, inputsInfo }) => {
  return (
    <div>
      <h2>Select Your Image Attributes:</h2>
      <form className="form-container">
        {inputs &&
          Object.entries(inputs).map(([category, value], index) => (
            <li className="form" key={index}>
              <h2>{category}</h2>
              <input
                type="text"
                name={category}
                value={value}
                placeholder="Input this attribute..."
                onChange={handleChange}
                className="textbox"
              />
              <br />
              <p>{inputsInfo[index]}</p>
            </li>
          ))}
      </form>
      <button
        type="button"
        className="button"
        style={{ gridColumn: "span 1" }}
        onClick={onSubmit}
      >
        Take that Pic! 📸
      </button>
    </div>
  );
};

export default APIForm;