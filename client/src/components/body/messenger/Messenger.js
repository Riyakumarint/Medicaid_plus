import "./messenger.css";
import Conversation from "./intComp/Conversation.js";
import Message from "./intComp/Message.js";
import ChatOnline from "./intComp/ChatOnline";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import SideNav from "../../body/profile/sidenav/SideNav";
import Send from "../../../images/send.png";
import Call from "../../../images/video.svg";
import Conver from "../../../images/chat_doc.png";
const initialState = {
  name: "",
  password: "",
  cf_password: "",
  err: "",
  success: "",
};
export default function Messenger() {
  const { user, isAdmin } = useSelector((state) => state.auth);
  const token = useSelector((state) => state.token);
  const users = useSelector((state) => state.users);

  const [data, setData] = useState(initialState);
  const { name, password, cf_password, err, success } = data;

  const [avatar, setAvatar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [callback, setCallback] = useState(false);

  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessages, setNewMessage] = useState("");
  const [arrivalMessages, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUserse] = useState([]);

  const socket = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

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
  }, [user]);

  const scrollRef = useRef();
  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("/conversations/" + user._id);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("/messages/" + currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      text: text,
      avatar: user.avatar,
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
      <SideNav />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input
              placeholder="Search for Doctor"
              className="chatMenuInput"
            />
            {conversations.map((c) => (
              <div onClick={() => setCurrentChat(c)}>
                {c ? (
                  <Conversation conversation={c} currentUser={user} />
                ) : (
                  <div>problem</div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages?.map((m) => (
                    <div ref={scrollRef}>
                      <Message message={m} own={m.sender === user._id} />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    rows="3"
                    cols="30"
                    type="description"
                    className="chatMessageInput"
                    placeholder="Write Something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    name="Chatmessage"
                    value={newMessages}
                  ></textarea>

                  <img
                    src={Send}
                    alt=" "
                    className="btnS"
                    onClick={handleSubmit}
                  />
                  <img
                    src={Call}
                    alt=" "
                    className="btnC"
                    onClick={handleSubmit_video}
                  />
                </div>
              </>
            ) : (
              <span className="noConversationText">
                {/* Open A Conversation */}
                <img src={Conver} alt="" />
              </span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            {console.log("Online User: " + onlineUsers)}
            <ChatOnline
              onlineUsers={onlineUsers}
              currentId={user._id}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div>
      </div>
    </>
  );
}
