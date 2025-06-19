import { useEffect, useRef } from "react";
import InitDraw from "../draw";

export default function Canvas({roomId, socket}:{roomId : string, socket : WebSocket}){
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(()=>{
    const canvas = canvasRef.current;
    if (!canvas) return;
    InitDraw(canvas, roomId, socket); 
    
  }, [canvasRef]);

  return(
    <div className="bg-black h-screen w-screen">
      <div className="text-white font-bold">
        Excalidraw
      </div>
      <div>
        <canvas ref={canvasRef} width={1240} height={520} style={{border:'1px solid white'}}></canvas>
      </div>
    </div>
  )
}