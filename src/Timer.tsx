import { TimerProps } from "./types";
import { useEffect, useState, useRef } from "react";
const Timer = ({ TimerData }: { TimerData: TimerProps }) => {
  const [seconds, setSeconds] = useState(TimerData.sessionTime * 60);
  const [secondsBreak, setSecondsBreak] = useState(TimerData.breakTime * 60);
  const [isItSession, setIsItSession] = useState(TimerData.isSession);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return (
      (minutes < 10 ? "0" + minutes.toString() : minutes) +
      ":" +
      (seconds < 10 ? "0" + seconds.toString() : seconds)
    );
  };
  useEffect(() => {
    setSeconds(TimerData.sessionTime * 60);
    setSecondsBreak(TimerData.breakTime * 60);

    return () => {};
  }, [TimerData.sessionTime, TimerData.breakTime]);

  useEffect(() => {
    let interval: number | null = null;

    if (isItSession) {
      if (TimerData.isActive && seconds >= 0) {
        console.log("Session: " + formatTime(seconds));
        console.log(typeof seconds, seconds);

        interval = window.setInterval(() => {
          setSeconds((prevSeconds) => prevSeconds - 1);
        }, 1000);
      } else if (seconds < 0) {
        clearInterval(interval!);
        setIsItSession(false);
        setSecondsBreak(TimerData.breakTime * 60);
        if (audioRef.current) {
          audioRef.current.play();
        }
      }
    } else {
      if (TimerData.isActive && secondsBreak >= 0) {
        console.log("Break: " + formatTime(secondsBreak));
        console.log(typeof secondsBreak, secondsBreak);
        interval = window.setInterval(() => {
          setSecondsBreak((prevSecondsBreak) => prevSecondsBreak - 1);
        }, 1000);
      } else if (secondsBreak < 0) {
        clearInterval(interval!);
        setIsItSession(true);
        setSeconds(TimerData.sessionTime * 60);
        if (audioRef.current) {
          audioRef.current.play();
        }
      }
    }

    return () => clearInterval(interval!);
  }, [TimerData.isActive, isItSession, seconds, secondsBreak]);

  return (
    <>
      <div className="d-flex justify-content-center align-items-center flex-column">
        <h1 id="timer-label">{isItSession ? "Session" : "Break"}</h1>
        <div
          id="time-left"
          className="text-center"
          style={{ fontSize: "60px" }}>
          {
            TimerData.isActive
              ? isItSession
                ? formatTime(seconds)
                : formatTime(secondsBreak)
              : formatTime(TimerData.sessionTime * 60) // Display the session time in minutes when not active
          }
        </div>
        <audio
          id="beep"
          ref={audioRef}
          src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav"
        />
      </div>
    </>
  );
};
export default Timer;
