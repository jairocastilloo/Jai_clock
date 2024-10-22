import { useState } from "react";
import "./App.css";
import { Container, Row, Col } from "react-bootstrap";
import { IoMdArrowDropupCircle, IoMdArrowDropdownCircle } from "react-icons/io";
import { TimerProps } from "./types.ts";
import Timer from "./Timer.tsx";
import { HiMiniPlayPause } from "react-icons/hi2";
import { GrPowerReset } from "react-icons/gr";
import { PiLineVerticalBold } from "react-icons/pi";
const defaultTimerState: TimerProps = {
  isActive: false,
  isSession: true,
  breakTime: 5,
  sessionTime: 25,
};
function App() {
  const [timerState, setTimerState] = useState<TimerProps>(defaultTimerState);
  const decreaseBreakTime = () => {
    if (timerState.isActive === false) {
      if (timerState.breakTime > 1) {
        setTimerState((prevState) => ({
          ...prevState,
          breakTime: prevState.breakTime - 1,
        }));
      }
    }
  };
  const increaseBreakTime = () => {
    if (timerState.isActive === false) {
      if (timerState.breakTime < 60) {
        setTimerState((prevState) => ({
          ...prevState,
          breakTime: prevState.breakTime + 1,
        }));
      }
    }
  };
  const decreaseSessionTime = () => {
    if (timerState.isActive === false) {
      if (timerState.sessionTime > 1) {
        setTimerState((prevState) => ({
          ...prevState,
          sessionTime: prevState.sessionTime - 1,
        }));
      }
    }
  };
  const increaseSessionTime = () => {
    if (timerState.isActive === false) {
      if (timerState.sessionTime < 60) {
        setTimerState((prevState) => ({
          ...prevState,
          sessionTime: prevState.sessionTime + 1,
        }));
      }
    }
  };
  const playPause = () => {
    setTimerState((prevState) => ({
      ...prevState,
      isActive: !prevState.isActive,
    }));
  };

  return (
    <>
      <Container className="p-5">
        <h1 className="text-center">Jairo's 25 + 5 Clock</h1>
        <Row>
          <Col
            md={6}
            className="d-flex justify-content-center align-items-center flex-column mb-2">
            <h2 id="break-label">Break Length</h2>
            <h3>
              <IoMdArrowDropdownCircle
                className="forPointer mb-1"
                onClick={decreaseBreakTime}
                id="break-decrement"
              />
              <span className="px-3" id="break-length">
                {timerState.breakTime}
              </span>

              <IoMdArrowDropupCircle
                className="forPointer mb-1"
                onClick={increaseBreakTime}
                id="break-increment"
              />
            </h3>
          </Col>
          <Col
            md={6}
            className="d-flex justify-content-center align-items-center flex-column mb-2">
            <h2 id="session-label">Session Length</h2>
            <h3>
              <IoMdArrowDropdownCircle
                className="forPointer mb-1"
                onClick={decreaseSessionTime}
                id="session-decrement"
              />
              <span className="px-3" id="session-length">
                {timerState.sessionTime}
              </span>
              <IoMdArrowDropupCircle
                className="forPointer mb-1"
                onClick={increaseSessionTime}
                id="session-increment"
              />
            </h3>
          </Col>
        </Row>
        <div className="d-flex justify-content-center align-items-center">
          <div className="watch d-flex justify-content-center align-items-center flex-column border border-4 border-white rounded rounded-5 p-1">
            <Timer TimerData={timerState}></Timer>
            <div className="fs-1">
              <HiMiniPlayPause
                className="forPointer"
                onClick={playPause}
                id="start_stop"
              />
              <PiLineVerticalBold className="mx-2" />
              <GrPowerReset
                className="forPointer"
                onClick={() => setTimerState(defaultTimerState)}
                id="reset"
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default App;
