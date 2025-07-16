const Controls = ({ onStartStop, onReset }) => {
  return (
    <div className="controls">
      <button id="start_stop" onClick={onStartStop}>Start/Stop</button>
      <button id="reset" onClick={onReset}>Reset</button>
    </div>
  );
};

export default Controls;
