import WebSocket, { WebSocketServer } from 'ws';
import jwt from "jsonwebtoken";
import { JwtSecret } from "@repo/backend-common/config";
import { prismaClient } from "@repo/db/client"

const wss = new WebSocketServer({ port: 8080 });

interface User {
  ws: WebSocket,
  rooms: string[],
  userId: string
}

const users: User[] = [];
wss.on('connection', function connection(ws, request) {
  ws.on('error', console.error);
  const url = request.url;
  if (!url) {
    console.log("url not found");
    return;
  }
  const params = new URLSearchParams(url.split("?")[1]);
  const token = params.get("token")
  if (!token) {
    console.log("token not found");
    return;
  }
  const validate = jwt.verify(token, JwtSecret);

  if (typeof validate === "string") {
    return;
  }
  if (!validate || !validate.id) {
    console.log("token is not validate");
    return;
  }
  const userId = validate.id;
  
  if (userId === null) {
    ws.close();
    console.log("connection close");
    return;
  }
  users.push({
    userId,
    rooms: [],
    ws
  })

  ws.on('message', async function message(data) {
    let parsedData;
    if (typeof data !== "string") {
      parsedData = JSON.parse(data.toString());
    } else {
      parsedData = JSON.parse(data);
    }

    if (parsedData.type === "join-room") {
      const user = users.find(x => x.ws === ws)
      if (!user) {
        console.log("user can not join room");
        return;
      }
      user.rooms.push(parsedData.roomId);
      console.log("user joined room");

    }

    if (parsedData.type === "leave-room") {
      const user = users.find(x => x.ws === ws);
      if (!user) {
        console.log("user not found in leave room");
        return;
      }
      user.rooms = user.rooms.filter(x => x === parsedData.room);
      console.log("user leave the room");

    }

    if (parsedData.type === "chat") {
      const message = parsedData.message;
      const roomId = parsedData.roomId;
      
      try {
        const chat =  await prismaClient.chat.create({
        data: {
          roomId: Number(roomId),
          message,
          userId
        }
      });
        if(!chat){
          console.log("chat not created");
          return;
        }

       users.forEach(user => {
        if (user.rooms.includes(roomId)) {
          user.ws.send(JSON.stringify({
            type: "chat",
            message: message,
            roomId
          }))
        }
      })
      } catch (error: any) {
        console.log(error);
      }
    }
  })
});