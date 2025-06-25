import { Tool } from "../components/Canvas";
import { getExistingShapes } from "./http-call";

type Shape = {
    type: "rect";
    x: number;
    y: number;
    width: number;
    height: number;
} | {
    type: "circle";
    centerX: number;
    centerY: number;
    radius: number;
} | {
    type: "pencil";
    startX: number;
    startY: number;
    endX: number;
    endY: number;
}

export class Game {

    private canvas: HTMLCanvasElement;
    private existingShapes: Shape[];
    private ctx: CanvasRenderingContext2D;
    private roomId: string;
    private clicked: boolean;
    private startX: number;
    private startY: number;
    private selectedTool: Tool = "circle";

    socket: WebSocket;

    constructor(canvas: HTMLCanvasElement, roomId: string, socket: WebSocket) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d")!;
        this.existingShapes = [];
        this.roomId = roomId;
        this.socket = socket;
        this.clicked = false;
        this.startX = 0;
        this.startY = 0;
        this.init();
        this.initHandlers();
        this.initMouseHandlers();
        this.destroy();
    }

    destroy(){
        this.canvas.removeEventListener("mousedown", this.mouseDownHandler);
        
        this.canvas.removeEventListener( "mouseup", this.mouseUpHandler);
        
        this.canvas.removeEventListener("mousemove", this.mouseMoveHandler);
    }

    setTool(tool: "circle" | "pencil" | "rect") {
        this.selectedTool = tool;
    }

    async init() {
        this.existingShapes = await getExistingShapes(this.roomId);
        this.clearCanvas();
    }

    initHandlers() {
        this.socket.onmessage = (event) => {
            const messages = JSON.parse(event.data);

            const parsedMessage = JSON.parse(messages.message)
            if (parsedMessage.type === "chat") {
                this.existingShapes.push(parsedMessage.shape);
                this.clearCanvas();
            }
        }
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.existingShapes.map((shape) => {
            if (shape.type === "rect") {
                this.ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
            } else if (shape.type === "circle") {
                this.ctx.beginPath();
                this.ctx.arc(shape.centerX, shape.centerY, shape.radius, 0, Math.PI * 2);
                this.ctx.stroke();
                this.ctx.closePath();
            }
        });
    }

    mouseDownHandler = (e: MouseEvent) => {
        this.clicked = true;
        this.startX = e.clientX;
        this.startY = e.clientY;
    }

    mouseUpHandler = (e: MouseEvent) => {
        this.clicked = false;
        const rect = this.canvas.getBoundingClientRect();
        const currentX = e.clientX - rect.left;
        const currentY = e.clientY - rect.top;
        const height = currentY - this.startY;
        const width = currentX - this.startX;

        //@ts-ignore
        const selectedShape = window.selectedShape;
        let shape: Shape | null = null;
        if (selectedShape === "rect") {
            shape = {
                type: "rect",
                x: this.startX,
                y: this.startY,
                width,
                height
            }

        } else if (selectedShape === "circle") {
            const radius = Math.max(height, width) / 2;
            shape = {
                type: "circle",
                radius,
                centerX: this.startX + radius,
                centerY: this.startY + radius
            }
        }

        if (!shape) {
            return;
        }
        this.existingShapes.push(shape);

        this.socket.send(JSON.stringify({
            type: "chat",
            message: JSON.stringify({
                shape
            }),
            roomId : this.roomId
        }))
    };

    mouseMoveHandler(e:MouseEvent){
if (!this.clicked) return;
    
    const rect = this.canvas.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;
    const height = currentY - this.startY;
    const width = currentX - this.startX;
    this.clearCanvas();
    //@ts-ignore
    const selectedShape = window.selectedShape;
    if( selectedShape === "rect"){
    this.ctx.strokeRect(this.startX, this.startY, height, width); 
    }else if( selectedShape === "circle"){
      const radius = Math.max(width, height) / 2;
                const centerX = this.startX + radius;
                const centerY = this.startY + radius;
                this.ctx.beginPath();
                this.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
                this.ctx.stroke();
                this.ctx.closePath(); 
    }};

    initMouseHandlers(){
        this.canvas.addEventListener("mousedown", this.mouseDownHandler);
        
        this.canvas.addEventListener("mouseup", this.mouseUpHandler);
        
        this.canvas.addEventListener("mousemove", this.mouseMoveHandler);
    }
}