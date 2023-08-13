import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import "./LiveSessions.css";

function LiveSessions(props) {

  const [sessions, setSessions] = useState([]);
  const [password, setPassword] = useState("");
  const [selectedSession, setSelectedSession] = useState();
  const [gettedDistance, setgettedDistance] = useState(false);
  const [distance, setDistance] = useState(1000);
  const [session, setSession] = useState({});
  const [showalert, setShowalert] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    const getSessions = async () => {
      try {
        const response = await axios.post("/get-sessions");
        setSessions(response.data.sessions);
      } catch (error) {
        console.error(error);
      }
    };
    getSessions();
  });

  function handleDivision() {
    // Code to process the payment goes here...

    // Once the payment is complete, show the success message
    setShowSuccessMessage(true);

    // After 10 seconds, hide the success message
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  }


  // function getLocation() {

  //     if (navigator.geolocation) {
  //         navigator.geolocation.getCurrentPosition(showPosition);
  //     } else {
  //         alert("loacation not found");
  //     }

  //     function showPosition(position) {
  //         // x.innerHTML = "Latitude: " + position.coords.latitude +
  //         // "<br>Longitude: " + position.coords.longitude;
  //         calcCrow(position.coords.latitude, position.coords.longitude, session.latitude, session.longitude);
  //     }
  // }

  // function calcCrow(lat1, lon1, lat2, lon2) {
  //     console.log(lat1 + " " + lon1 + "  " + lat2 + " " + lon2);
  //     var R = 6371; // km
  //     var dLat = toRad(lat2 - lat1);
  //     var dLon = toRad(lon2 - lon1);
  //     var lat1 = toRad(lat1);
  //     var lat2 = toRad(lat2);

  //     var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
  //         Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  //     var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  //     var d = R * c;
  //     setDistance(d);
  // }

  // Converts numeric degrees to radians
  function toRad(Value) {
    return Value * Math.PI / 180;
  }

  function getLocation() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      } else {
        reject(new Error("Location not found"));
      }
    });
  }

  function calcCrow(lat1, lon1, lat2, lon2) {
    console.log(lat1 + " " + lon1 + "  " + lat2 + " " + lon2);
    var R = 6371000; // meters
    var dLat = toRad(lat2 - lat1);
    var dLon = toRad(lon2 - lon1);
    var lat1 = toRad(lat1);
    var lat2 = toRad(lat2);

    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return Promise.resolve(d);
}

  async function getDistance() {
    try {
      const position = await getLocation();
      const distance = await calcCrow(position.coords.latitude, position.coords.longitude, session.latitude, session.longitude);
      setDistance(distance);
      // the code after setDistance will be executed only after the distance is calculated and set
    } catch (error) {
      alert(error.message);
    }
  }


  function handleClick(session) {
    setSession(session);
    getDistance();
    console.log(distance);
    if (distance < 2000) {
      axios.post("/give-attendance", { session: session }).then((res) => {
        if (res.data.message === "success") {
          setShowalert(`Attendacne marked ${distance}`);
          handleDivision();
          // alert("Attendacne marked")
        }
        else {
          setShowalert(`Attendacne Already marked ${distance}`);
          handleDivision();
        }
      });
    } else {
      alert("You are not in class!");
    }
  }

  function handleAttendanceSubmission() {
    if (password) {
      axios.post("/submit-attendance", { sessionId: selectedSession._id, password: password })
        .then(res => {
          if (res.data.message === "Attendance submitted successfully") {
            alert("Attendance submitted successfully");
            setSelectedSession(null);
          }
          else {
            alert(res.data.message);
          }
        });
      setPassword("");
    }
    else {
      alert("Enter Password");
    }
  }

  function handleChange(e) {
    setPassword(e.target.value);
  }

  return (
<>
  {showSuccessMessage && (
    <div className="alert alert-success d-flex align-items-center position-fixed top-0 start-50 translate-middle-x" role="alert">
      <i className="fas fa-check-circle me-2"></i>
      <div>
        {showalert}
      </div>
    </div>
  )}
  <div className="container" style={{ maxWidth: "55%" }}>
    <hr />
    <h1 className="text-center my-4">Sessions</h1>
    <ul className="list-group">
      {sessions.map((session) => {
        return (
          <li key={session._id} className="list-group-item d-flex justify-content-between align-items-center">
            {session.currentDate} {session.currentTime}
            {session.isOn && (
              <button type="button" className="btn btn-danger" onClick={() => handleClick(session)}>
                Give Attendance
              </button>
            )}
          </li>
        );
      })}
    </ul>
  </div>
</>
  );

}
// 
export default LiveSessions;


{/* <div className="modal centered-modal" style={{ display: "block" }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Enter Password to Submit Attendance</h5>
                                <button type="button" className="close" onClick={() => setSelectedSession(null)}>&times;</button>
                            </div>
                            <div className="modal-body">
                                <input type="password" className="form-control" placeholder="Enter password" onChange={handleChange} value={password} />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setSelectedSession(null)}>Cancel</button>
                                <button type="button" className="btn btn-primary" onClick={handleAttendanceSubmission}>Submit Attendance</button>
                            </div>
                        </div>
                    </div>
                </div> */}


              //   <div class="alert alert-success d-flex align-items-center" role="alert">
              //   <i class="fas fa-check-circle me-2"></i>
              //   <div>
              //     Payment successful
              //   </div>
              // </div>