import { useState, useRef, useEffect } from "react";
import LengthControl from "./components/LengthControl";
import Timer from "./components/Timer";
import Controls from "./components/Controls";
import "./App.scss";

const App = () => {
  const [breakLength,   setBreakLength]   = useState(5);   
  const [sessionLength, setSessionLength] = useState(25);  
  const [timeLeft,      setTimeLeft]      = useState(25 * 60); 
  const [mode,          setMode]          = useState("Session"); 
  const [isRunning,     setIsRunning]     = useState(false);

  const intervalRef = useRef(null);
  const audioRef    = useRef(null);
  const modeRef     = useRef(mode);
  useEffect(() => { modeRef.current = mode; }, [mode]);

  const changeLength = (type, delta) => {
    if (isRunning) return;                       
    if (type === "break") {
      const nl = Math.min(60, Math.max(1, breakLength + delta));
      setBreakLength(nl);
      if (mode === "Break") setTimeLeft(nl * 60);
    } else {
      const nl = Math.min(60, Math.max(1, sessionLength + delta));
      setSessionLength(nl);
      if (mode === "Session") setTimeLeft(nl * 60);
    }
  };

  const startStop = () => {
    if (isRunning) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
      return;
    }

    intervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev === 0) {
          audioRef.current?.play();

          const nextMode = modeRef.current === "Session" ? "Break" : "Session";
          setMode(nextMode);

          return (nextMode === "Session" ? sessionLength : breakLength) * 60;
        }
        return prev - 1;
      });
    }, 1000);

    setIsRunning(true);
  };

  const reset = () => {
    clearInterval(intervalRef.current);
    setBreakLength(5);
    setSessionLength(25);
    setTimeLeft(25 * 60);
    setMode("Session");
    setIsRunning(false);
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };

  return (
    <div id="clock">
      <h1>25&nbsp;+&nbsp;5&nbsp;Clock</h1>

      <div className="settings">
        <LengthControl
          title="Break Length"
          idPrefix="break"
          length={breakLength}
          onIncrement={() => changeLength("break", 1)}
          onDecrement={() => changeLength("break", -1)}
        />
        <LengthControl
          title="Session Length"
          idPrefix="session"
          length={sessionLength}
          onIncrement={() => changeLength("session", 1)}
          onDecrement={() => changeLength("session", -1)}
        />
      </div>

      <Timer mode={mode} timeLeft={timeLeft} />
      <Controls onStartStop={startStop} onReset={reset} />

      <audio
        id="beep"
        preload="auto"
        ref={audioRef}
        src="https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg"
      />
    </div>
  );
};

export default App;
