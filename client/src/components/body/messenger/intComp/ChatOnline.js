import "./chatOnline.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function ChatOnline(props) {
  const [friends, setFriends] = useState([]);
  const [onlinefriends, setOnlineFriends] = useState([]);
  const token = useSelector((state) => state.token);
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    const getFriends = async () => {
      // console.log("token: " + token);
      try {
        const res = await axios.get("/appointments/fetchAppointments", {
          headers: { Authorization: token },
        });
        setFriends(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getFriends();
  }, [props.currentId, token]);

  useEffect(() => {
    setOnlineFriends(
      friends.filter((f) => props.onlineUsers.includes(f.doctortId))
    );
  }, [friends, props.onlineUsers]);
  // console.log("12589hbrs" + props.onlineUsers);

  const handleClick = async (user) => {
    try {
      const res = await axios.get(
        `/conversations/find/${props.currentId}/${user._id}`
      );
      props.setCurrentChat(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="chatOnline">
        {/* {console.log("Online Users: " + onlinefriends)} */}
        {onlinefriends?.map((o) => (
          <>
            <div
              className="chatOnlineFriend"
              onClick={() => {
                handleClick(o);
              }}
            >
              <div className="chatOnlineImgContainer">
                <img
                  className="chatOnlineImg"
                  src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                  alt=""
                />
                <div className="chatOnlineBadge"></div>
              </div>
              <span className="chatOnlineName">{o.userName}</span>
            </div>
          </>
        ))}
      </div>
    </>
  );
}
