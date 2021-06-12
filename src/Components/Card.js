import React, { useState, useEffect } from "react";
import './Card.css';
var api = ["https://kontests.net/api/v1/all"];

function Card() {
  var [Data, setData] = useState([]);
  let today = new Date();
  fetch(api)
    .then((res) => res.json())
    .then((json) => setData(json))
    .catch((err) => console.error(err));
  return (
    <>
      <div>
        {Data.sort(function (a, b) {
          return new Date(b.date) - new Date(a.date);
        }).map((item) => {
          const url = JSON.stringify(item.url);
          url.concat("#");
          function handleClick() {
            window.location.href = url;
          }
          var x = item.start_time;
          //date
          var contestDate = new Date(x);
          var day = contestDate.getDate();
          var month = contestDate.getMonth();
          var year = contestDate.getFullYear();
          var hours = contestDate.getHours();
          var minutes = contestDate.getMinutes();
          var ampm = hours >= 12 ? "pm" : "am";
          hours = hours % 12;
          hours = hours ? hours : 12;
          minutes = minutes < 10 ? "0" + minutes : minutes;
          //Now for endDate
          if (today < contestDate) {
            return (
              <div  className="Card">
                <div className="card text-center" style={{ width: "18rem" }}>
                  <div className="card-body">
                    <h3 className="card-title">{JSON.stringify(item.site)}</h3>
                    <h5 className="card-text">{JSON.stringify(item.name)}</h5>
                    <p className="card-text">
                      Start Date: {day}/{month}/{year}
                    </p>
                    <p className="card-text">
                      Start Time: {hours}:{minutes}
                      {ampm}
                    </p>
                    <button onClick={handleClick} className="btn btn-primary">
                      Let's Go
                    </button>
                  </div>
                </div>
                <br/>
              </div>
            );
          }
        })}
      </div>
    </>
  );
}

export default Card;
