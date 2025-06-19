    "use client"
    import { useEffect, useState } from "react"
    import { WS_URL } from "../config"
    import { Canvas } from "./"

    export default function RoomCanvas({roomId}:{roomId:string}){

        const [ socket, setSocket] = useState<WebSocket>()

        useEffect(()=>{
            try{
            // const token = localStorage.getItem("token");
            const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1hbmlzaEBrdW1hcmRha2pzMzIiLCJpZCI6Ijc5ZmExMzZjLWQ4YjUtNDg2Yy05YzJiLWQxZTI4YzE1ODg2ZCIsIm5hbWUiOiJtYXNkZmRmIiwiaWF0IjoxNzUwMzQ0Nzc2fQ.B8EUkQwlxJvCj0-3-VU3Y6oaXioSboN_pigpdRjsL4g`);
                
            ws.onopen=()=>{
                setSocket(ws);
                const data = JSON.stringify({
                    type : "join-room",
                    roomId
                })
                ws.send(data)
            }
            ws.onerror=(error)=>{
                console.log("Error : "+ error);
            }
            if(ws.readyState !== WebSocket.OPEN){
                console.log("connection is lost");
                return;
            }
            
            }catch(error){
                console.log("error is : " + error);
            }
        },[roomId])   
        if(!socket){
            return(
                <div>
                    <p>connecting to server...</p>
                </div>
            )
        }
        return (
            <div>
                <Canvas roomId={roomId} socket={socket}/>
            </div>
        )
    }