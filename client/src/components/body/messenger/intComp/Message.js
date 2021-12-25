import "./message.css";
import { format } from "timeago.js";

export default function Message(props) {
  return (
    <div className={props.own ? "message own" : "message"}>
      <div className="messageTop-new">
        <img className="messageImg" src={props.message.avatar} alt="" />
        <p className="messageText-new">{props.message.text}</p>
      </div>
      <div className="messageTime">{format(props.message.createdAt)}</div>
    </div>
  );
}
