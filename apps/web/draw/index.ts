import axios from "axios";
import { HTTP_BACKEND } from "../config";

interface Shape {
  type: "rect";
  x: number;
  y: number;
  height: number;
  width: number;
}

export default async function InitDraw(canvas: HTMLCanvasElement, roomId: string) {

  const existingShapes: Shape[] = await getExistingShapes(roomId);

  const ctx = canvas?.getContext("2d");

  if (!ctx) return;

  ctx.strokeStyle = "white";

  let clicked = false;
  let startX = 0;
  let startY = 0;

  canvas.addEventListener("mousedown", (e: MouseEvent) => {
    clicked = true;
    const rect = canvas.getBoundingClientRect();
    startX = e.clientX - rect.left;
    startY = e.clientY - rect.top;
  });

  canvas.addEventListener("mousemove", (e: MouseEvent) => {

    if (!clicked) return;
    
    const rect = canvas.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;
    
    clearCanvas(ctx, canvas, existingShapes);
    ctx.strokeRect(startX, startY, currentX-startX , currentY-startY);
  });

  canvas.addEventListener("mouseup", (e: MouseEvent) => {
    clicked = false;
    const rect = canvas.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;

    existingShapes.push({ 
      type: "rect", 
      x: startX, 
      y: startY, 
      width : currentX - startX, 
      height : currentY - startY
    });
    clearCanvas(ctx, canvas, existingShapes);
  });

}

function clearCanvas(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  existingShapes: Shape[]
) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  existingShapes.forEach((shape) => {
    if (shape.type === "rect") {
      ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
    }
  });
}

async function getExistingShapes(roomId:string){
    const response  = await axios.get(`${HTTP_BACKEND}/chat/${roomId}`);
    const messages = response.data.messages;
    return messages;
}
