import "./conversation.css";
import axios from "axios";
import { useState, useEffect } from "react";
export default function Conversation(props) {
  const [username, setUsername] = useState("");
  const [userimg, setUserimg] = useState(null);

  useEffect(() => {
    const doc_use_Id = props.conversation?.members?.find(
      (m) => m !== props.currentUser._id
    );
    const getUser = async () => {
      try {
        const res = await axios.get("/user/conInfo/" + doc_use_Id);
        setUsername(res.data.name);
        setUserimg(res.data.avatar);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [props.currentUser, props.conversation]);

  return (
    <>
      <div className="conversation">
        <img
          className="conversationImg"
          src={
            userimg
              ? userimg
              : "https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          }
          alt=""
        />
        <spam className="conversationName">
          {username ? username : "NO User"}
        </spam>
      </div>
    </>
  );
}
