import React from "react";
import "./chat_component.css";
import logo from "../../../images/video.svg";
import Chat from "../../../images/chat.png";
import Close from "../../../images/close.png";
import Send from "../../../images/send.png";
import Message from "../messenger/intComp/Message.js";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { io } from "socket.io-client";
const initialState = {
  name: "",
  password: "",
  cf_password: "",
  err: "",
  success: "",
};
export default function Chat_Component(props) {
  const auth = useSelector((state) => state.auth);
  const token = useSelector((state) => state.token);
  const scrollRef = useRef();
  const users = useSelector((state) => state.users);

  const { user, isAdmin } = auth;
  const [data, setData] = useState(initialState);
  const { name, password, cf_password, err, success } = data;

  // const [avatar, setAvatar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [callback, setCallback] = useState(false);
  // console.log(user);

  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessages, setNewMessage] = useState("");
  const [arrivalMessages, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUserse] = useState([]);
  const t =
    "/conversations/find/" +
    props.appointment.doctortId +
    "/" +
    props.appointment.patienttId;
  // console.log(t);
  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        avatar: user.avatar,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, [user, callback]);

  useEffect(() => {
    arrivalMessages &&
      currentChat?.members.includes(arrivalMessages.sender) &&
      setMessages((prev) => [...prev, arrivalMessages]);
  }, [arrivalMessages, currentChat]);

  useEffect(() => {
    socket?.current.emit("addUser", user._id);
    socket?.current.on("getUsers", (users) => {
      setOnlineUserse(users);
    });
    // console.log(onlineUsers);
  }, [user]);
  const socket = useRef();

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("/messages/" + currentChat?._id);
        setMessages(res.data);
        // console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);
  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(t);
        setCurrentChat(res.data);
        // console.log("Heyyyyy" + res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [props.appointment]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("kky:   " + newMessages);
    if (newMessages !== "") {
      const message = {
        sender: user._id,
        avatar: user.avatar,
        text: newMessages,
        conversationId: currentChat._id,
      };
      const receiverId = currentChat.members.find(
        (member) => member !== user._id
      );
      socket.current.emit("sendMessage", {
        senderId: user._id,
        avatar: user.avatar,
        receiverId: receiverId,
        text: newMessages,
      });
      try {
        const res = await axios.post("/messages", message);
        setMessages([...messages, res.data]);
        // console.log(res.data);
        setNewMessage("");
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleSubmit_video = async (e) => {
    e.preventDefault();
    const text = "http://localhost:3001/" + user._id;
    setNewMessage(text);
    const message = {
      sender: user._id,
      avatar: user.avatar,
      text: text,
      conversationId: currentChat._id,
    };
    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );
    socket.current.emit("sendMessage", {
      senderId: user._id,
      avatar: user.avatar,
      receiverId: receiverId,
      text: text,
    });
    const tab = window.open(text, "_blank");
    try {
      const res = await axios.post("/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="container px-4 px-lg-5">
        <button
          className="open-button"
          onClick={() => {
            document.getElementById("myForm").style.display = "block";
          }}
        >
          <img src={Chat} />
        </button>

        <div className="chat-popup" id="myForm">
          <div className="wrapper">
            <div className="box1">
              <h1>Chat</h1>
            </div>

            <div className="box2 Video_chat">
              <form action="#" id="video-container">
                <input
                  type="image"
                  name="VideoInp"
                  id="VideoInp"
                  src={logo}
                  onClick={handleSubmit_video}
                />
              </form>
            </div>
          </div>
          <label Htmlfor="msg">
            <b>Messages</b>
          </label>
          <div className="containerM">
            {messages?.map((m) => (
              <div ref={scrollRef}>
                <Message message={m} own={m.sender === user._id} />
              </div>
            ))}
          </div>
          <div className="send">
            <form action="#" id="send-container">
              <div className="chat_btns">
                <textarea
                  type="text"
                  name="messageInp"
                  id="messageInp"
                  onChange={(e) => setNewMessage(e.target.value)}
                  name="Chatmessage"
                  value={newMessages}
                ></textarea>

                {/* <button className="btnM" onClick={handleSubmit}>Send</button> */}

                <img
                  src={Send}
                  alt=" "
                  className="btnM"
                  onClick={handleSubmit}
                />

                {/* <button type="button" className="btnM cancel" onClick={() => { document.getElementById("myForm").style.display = "none"; }}>Close</button> */}
              </div>
              <img
                src={Close}
                alt=" "
                className="btn_cancel"
                onClick={() => {
                  document.getElementById("myForm").style.display = "none";
                }}
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
