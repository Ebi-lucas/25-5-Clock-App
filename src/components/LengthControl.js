const LengthControl = ({ title, idPrefix, length, onIncrement, onDecrement }) => {
  return (
    <div className="length-control">
      <h2 id={`${idPrefix}-label`}>{title}</h2>
      <div>
        <button id={`${idPrefix}-decrement`} onClick={onDecrement}>-</button>
        <span id={`${idPrefix}-length`}>{length}</span>
        <button id={`${idPrefix}-increment`} onClick={onIncrement}>+</button>
      </div>
    </div>
  );
};

export default LengthControl;
