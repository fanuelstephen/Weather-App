import React, { useState, useEffect } from "react";
import { IoIosSearch } from "react-icons/io";
import DateTimeComponent from "./DateTimeComponent";

function WeatherApp() {
  const [data, setData] = useState("");
  const [inputValue, SetInputValue] = useState("New York");
  const [loading, setLoading] = useState(false);

  const apiKey = "4fa0bd45ac1327865d6b3764e242ec6d";
  const search = async (city) => {
    setLoading(true);
    const URL = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`;

    try {
      const responce = await fetch(URL);
      if (!responce.ok) {
        throw new Error("check the fetch");
      }
      const data = await responce.json();

      setData(data);
    } catch (error) {
      console.error("there is something wrogn with the fetch", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    search(inputValue);
    search("");
  }, [inputValue]);

  return (
    <div className="weartherApp ">
      <div className="search-container">
        <div className="search-details">
          <div className="search-container">
            <input
              type="text"
              id="city"
              name="title"
              value={inputValue}
              className="city"
              placeholder="Enter the City Name"
              onChange={(e) => SetInputValue(e.target.value)}
            />
            <button className="search-icon">
              <IoIosSearch
                onClick={() => {
                  search(inputValue);
                }}
              />
            </button>
          </div>

          {loading ? (
            <p>loading...</p>
          ) : (
            <div className="weather-info">
              <p className="city-name">{data.name}</p>
              <div>
                <img
                  src={`http://openweathermap.org/img/w/${
                    data.icon || "10d"
                  }.png`}
                  alt="cloud"
                />
                {data && data.main && (
                  <span className="city-temp">{data.main.temp}</span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <DateTimeComponent />
    </div>
  );
}

export default WeatherApp;
