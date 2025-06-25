"use client"

import { useEffect, useRef, useState } from "react";
import { Game } from "../draw/Game";

export type Tool = "circle" | "rect" | "pencil"

export default function Canvas({roomId, socket}:{roomId : string, socket : WebSocket}){
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [ selectedTool, setSelectedTool ] = useState<Tool>("circle")
    const [game, setGame] = useState<Game>()

    useEffect(()=>{
      game?.setTool(selectedTool);
    },[selectedTool, game]);

  useEffect(()=>{
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gameDraw = new Game(canvas, roomId, socket)
    setGame(gameDraw);

    return()=>{
      gameDraw.destroy();
    }
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