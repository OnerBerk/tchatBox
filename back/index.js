const express = require("express");
const bodyparser = require("body-parser");
const app = express();
const cors = require("cors");
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));

const server = require('http').createServer(app);
const options ={cors:true, origin:["*:*"]};

const io = require('socket.io')(server, options);


app.get("/", (req, res) => {
    res.send({projet: "socket io , React js"}).status(200)
});

server.listen(PORT, () => {
    console.log(`App running on port ${PORT}.`)
});


io.on('connection', (socket) => {
    console.log(socket.id)

    socket.on('join-room', (data) => {
        socket.join(data)
        console.log("User joint room "+ data)
    })

    socket.on('sendMessage', (data)=>{
        console.log(data)
        socket.to(data.room).emit("received-message", data.content);
    })

    socket.on('disconnect', () => {
        console.log("User disconnected")
    })

})


