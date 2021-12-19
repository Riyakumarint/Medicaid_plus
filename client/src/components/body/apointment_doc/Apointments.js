import React from 'react'
import './style.css'
import logo from './logo2.png'


function Apointments() {
    return (
        <>
            <div className="container px-4 px-lg-5">
                <div className="row gx-4 gx-lg-5 justify-content-center">
                    <div className="col-md-10 col-lg-8 col-xl-7"> 
                        <br/>
                        <br/>
                        <br/>
                        <h1> Generate Priscription </h1>
                        <hr className="my-4" />
                            <div className="post-preview">
                                <a href="post.html">
                                    <h2 className="post-title">Apointment Details</h2>
                                </a>
                                <p className="post-meta">
                                    Details
                                </p>
                            </div>
                            <hr className="my-4" />
                                <div className="post-preview">
                                    <a href="post.html">
                                        <h2 className="post-title">Blood Pressures</h2>
                                    </a>
                                    <p className="post-meta">
                                        Details
                                    </p>
                                </div>
                                <hr className="my-4" />
                                    <div className="post-preview">
                                        <a href="post.html">
                                            <h2 className="post-title">Weight</h2>
                                        </a>
                                        <p className="post-meta">
                                            Details
                                        </p>
                                    </div>
                                    <hr className="my-4" />
                                    <div className="post-preview">
                                        <a href="post.html">
                                            <h2 className="post-title">Sugar</h2>
                                        </a>
                                        <p className="post-meta">
                                            Details
                                        </p>
                                    </div>
                                    <hr className="my-4" />
                        </div>
                                </div>
                                <button className="open-button" onClick={()=>{document.getElementById("myForm").style.display = "block";}}>Chat</button>

                                <div className="chat-popup" id="myForm">
                                    <div className="wrapper">
                                        <div className="box1">
                                            <h1>Chat</h1>
                                        </div>

                                        <div className="box2 Video_chat">
                                            <form action="#" id="video-container">
                                                <input type="image" name="VideoInp" id="VideoInp" src={logo} />
                                            </form>
                                        </div>
                                    </div>
                                    <label for="msg"><b>Message</b></label>
                                    <div className="containerM">
                                    </div>
                                    <div className="send">
                                        <form action="#" id="send-container">
                                            <input type="text" name="messageInp" id="messageInp" />
                                            <button className="btnM" type="submit">Send</button>
                                        </form>
                                    </div>

                                    <button type="button" className="btnM cancel" onClick={()=>{document.getElementById("myForm").style.display = "none";}}>Close</button>
                                </div>
                            </div>
                        </>
                        )
}
                        export default Apointments;