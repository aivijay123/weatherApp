import React, { useEffect, useState } from "react";
import "../Style.css";

const Tempapp = () => {
  const [list, setList] = useState();
  const [max, setMax] = useState(0); 
  const [min, setMin] = useState(0); 
  const [search, setSearch] = useState("");
  const [tempSearch, setTempSearch] = useState("");

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      setSearch(tempSearch);
    }
  };

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=de5c6020872de9aa093bae85f596e1af&units=metric`;
        const response = await fetch(url);
        const resjson = await response.json();

        if (resjson.main) {
          setList(resjson.main.temp);
          setMax(resjson.main.temp_max);
          setMin(resjson.main.temp_min);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchApi();
  }, [search]);

  return (
    <>
      <div className="box">
        <div className="search">
          <div className="inputData">
            <input
              type="search"
              className="inputField"
              value={tempSearch}
              onChange={(e) => setTempSearch(e.target.value)}
              onKeyPress={handleSearch}
            />
            {list !== undefined && (
              <>
                <div className="street-view">
                  <i className="fa-solid fa-street-view"></i>
                  <h4>{search}</h4>
                </div>
                <div className="icon">
                  <h2 className="head">{list} °C</h2>
                </div>
                <p>Max - {max} °C</p>
                <p>Min - {min} °C</p>
              </>
            )}
            {list === undefined && (              
             <>
              <div className="street-view">
                  <i className="fa-solid fa-street-view"></i>
                </div>
                <div className="icon">
                  <h2 className="head">°C</h2>
                </div>
                <p>Max - °C</p>
                <p>Min - °C</p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Tempapp;
