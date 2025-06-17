import { useEffect, useRef } from "react";
import InitDraw from ".";

const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(()=>{
    const canvas = canvasRef.current;
    if (!canvas) return;
    InitDraw(canvas); 
    
  }, [canvasRef]);
