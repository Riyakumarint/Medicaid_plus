import "./message.css";
import { format } from "timeago.js";

export default function Message(props) {
  return (
    <div className={props.own ? "message own" : "message"}>
      <div className="messageTop-new">
        <img
          className="messageImg"
          src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          alt=""
        />
        <p className="messageText-new">{props.message.text}</p>
      </div>
      <div className="messageBottom">{format(props.message.createdAt)}</div>
    </div>
  );
}
