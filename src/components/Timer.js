const Timer = ({ mode, timeLeft }) => {
  const formatTime = (time) => {
    const m = Math.floor(time / 60);
    const s = time % 60;
    return `${m < 10 ? "0" : ""}${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="timer">
      <h2 id="timer-label">{mode}</h2>
      <h1 id="time-left">{formatTime(timeLeft)}</h1>
    </div>
  );
};

export default Timer;
