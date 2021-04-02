import React, {useState, useEffect} from "react"
import io from "socket.io-client"
import "../style/form.css"

let socket;
const CONNECTION_PORT = "http://localhost:5000/"

const Form = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [room, setRoom] = useState("");
    const [user, setUser] = useState("");

    const [message, setMessage] = useState("");
    const [messageList, setMessageLists] = useState([]);

    const connectToRoom = () => {
        setLoggedIn(true)
        socket.emit("join-room", room)
    }
    const disconnectedToRoom = () => {
        setLoggedIn(false)
    }

    const sendMessages = async () => {
        const messageContent = {
            room: room,
            content: {
                author: user,
                message: message
            }
        }
        await socket.emit("sendMessage", messageContent)
        setMessageLists([...messageList, messageContent.content])
        setMessage("")
    }


    useEffect(() => {
        socket = io(CONNECTION_PORT)
    }, [CONNECTION_PORT])

    useEffect(() => {
        socket.on("received-message", (data) => {
            setMessageLists([...messageList, data])
        })
    })

    return (
        <div className="mainForm">
            {!loggedIn ? (
                <div className="logIn">
                    <div className="formInput">
                        <input type='text' placeholder="Name..." onChange={(e) => {
                            setUser(e.target.value)
                        }}/>
                        <input type="text" placeholder="Room..." onChange={(e) => {
                            setRoom(e.target.value)
                        }}/>
                    </div>
                    <button onClick={connectToRoom}> Enter chat</button>
                </div>
            ) : (
                <div className="logged">
                    <div className="message">
                        {messageList.map((value, key) => {
                            return (
                                <div key={key} className="eachMessages"
                                     id={value.author === user ? "you" : "other"}
                                >
                                    <p> {value.message}</p><span>{value.author}</span>
                                </div>
                            )
                        })}
                            </div>
                            <div className="LoggedInput">
                            <input
                            type="text"
                            value={message}
                            placeholder="Message..."
                            onChange={(e) => {
                            setMessage(e.target.value)
                        }}
                            />
                            <button  onClick={sendMessages}> Send</button>
                            </div>
                            </div>)}
                            </div>
                            )
                        }
                        export default Form