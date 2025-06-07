import WebSocket, { WebSocketServer } from 'ws';
import jwt from "jsonwebtoken"
import { JwtSecret } from "@repo/backend-common/config";

const wss = new WebSocketServer({ port: 8080 });

interface User {
  ws : WebSocket,
  rooms : string[],
  userId : string
}

const users:User[] = [];
wss.on('connection', function connection(ws, request) {
  ws.on('error', console.error);
  const url = request.url;
  if(!url){
    console.log("url not found");
    return;
  }
  const params = new URLSearchParams(url.split("?")[1]);
  const token = params.get("token")
  if(!token){
    console.log("token not found");
    return;
  }
  const validate = jwt.verify(token, JwtSecret);

  if( typeof validate === "string"){
    return ;
  }
  if(!validate || !validate.userId){
    console.log("token is not validate");
    return ;
  }
  const userId = validate.userId ;

  if(userId === null){
    ws.close();1
    return;
  }
   users.push({
    userId,
    rooms : [],
    ws
   })

  ws.on('message', function message(data) {
    console.log('received: ', data);
  });

  ws.send('pong');
});