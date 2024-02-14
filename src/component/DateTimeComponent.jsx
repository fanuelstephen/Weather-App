import React, { useEffect, useState } from "react";

const DateTimeComponent = () => {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  function updateClock() {
    let h = new Date().getHours();
    let m = new Date().getMinutes();
    const date = new Date().toDateString();
    let ampm = "AM";
    if (h > 12) {
      h = h - 12;
      ampm = "PM";
    }
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;

    setTime(`${h}:${m} ${ampm}`);
    setDate(`${date}`);

    setTimeout(updateClock, 1000);
  }
  useEffect(() => {
    updateClock();
  }, []);
  return (
    <div className="clock">
      <div className="clock-container">
        <div className="time">
          <div>{time}</div>
        </div>
        <div>
          <span id="calendar">{date}</span>
        </div>
      </div>
    </div>
  );
};

export default DateTimeComponent;
