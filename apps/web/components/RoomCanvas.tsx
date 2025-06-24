    "use client"
    
    import { useEffect, useState } from "react"
    import { WS_URL } from "../config"
    import { Canvas } from "./"

    export default function RoomCanvas({roomId}:{roomId:string}){

        const [ socket, setSocket] = useState<WebSocket>()

        useEffect(()=>{
            try{
            const token = localStorage.getItem("token");
            const ws = new WebSocket(`${WS_URL}?token=${token}`);
                
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