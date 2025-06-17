"use client"

import { useEffect, useRef, useState } from "react"

export default function Home(){
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(()=>{
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;
    ctx.strokeStyle = "white";

    let clicked = false;
    let startX = 0;
    let startY = 0;
    canvas.addEventListener("mousedown", (e:MouseEvent)=>{
      clicked = true;
      startX = e.clientX;
      startY = e.clientY;
    })

    canvas.addEventListener("mouseup",(e:MouseEvent)=>{
      clicked = false;
    })

    canvas.addEventListener("mousemove", (e:MouseEvent)=>{
      if(!clicked) return;

      let height = e.clientX - startX;
      let width = e.clientY - startY;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeRect(startX, startY, height, width )
    })
    
  }, [canvasRef]);

  return (
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
