import { getExistingShapes } from "./http-call";

type Shape = {
  type: "rect";
  x: number;
  y: number;
  height: number;
  width: number;
} | {
  type : "circle";
  centerX : number;
  centerY : number;
  radius : number; 
}

export default async function InitDraw(canvas: HTMLCanvasElement, roomId: string, socket : WebSocket) {

  const existingShapes: Shape[] = await getExistingShapes(roomId);

  const ctx = canvas?.getContext("2d");

  if (!ctx) return;

  socket.onmessage=(event)=>{
    const data = JSON.parse(event.data);
    if(data.type === "chat"){
      const shapes = JSON.parse(data.message)
      existingShapes.push(shapes.shape)
      //@ts-ignore
      clearCanvas(existingShapes, canvas, ctx )
    }
  }
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
    const height = currentY - startY;
    const width = currentX - startX;
    clearCanvas(ctx, canvas, existingShapes);
    //@ts-ignore
    const selectedShape = window.selectedShape;
    if( selectedShape === "rect"){
    ctx.strokeRect(startX, startY, height, width); 
    }else if( selectedShape === "circle"){
      const radius = Math.max(width, height) / 2;
                const centerX = startX + radius;
                const centerY = startY + radius;
                ctx.beginPath();
                ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
                ctx.stroke();
                ctx.closePath(); 
    }
  });

  canvas.addEventListener("mouseup", (e: MouseEvent) => {
    clicked = false;
    const rect = canvas.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;
    const height = currentY - startY;
    const width = currentX - startX;

    //@ts-ignore
    const selectedShape = window.selectedShape;
    let shape : Shape | null  = null;
    if( selectedShape === "rect"){
        shape = {
      type: "rect", 
      x: startX, 
      y: startY, 
      width, 
      height
        }
    
    }else if( selectedShape === "circle"){
      const radius = Math.max(height, width)/2;
        shape = {
                  type : "circle",
        radius,
        centerX : startX + radius,
        centerY : startY + radius
        }
    }
    
    if(!shape){
      return;
    }
    existingShapes.push(shape);

    socket.send(JSON.stringify({
      type : "chat",
      message : JSON.stringify({
        shape
      }),
      roomId
    }))
  });


}

function clearCanvas(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  existingShapes: Shape[]
) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  existingShapes.map((shape) => {
    if (shape.type === "rect") {
      ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
    }  else if (shape.type === "circle") {
            ctx.beginPath();
            ctx.arc(shape.centerX, shape.centerY, shape.radius, 0, Math.PI * 2);
            ctx.stroke();
            ctx.closePath();                
        }
  }); 
}


